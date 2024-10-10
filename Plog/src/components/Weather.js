import React, {useEffect, useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import axios from 'axios';
import Geolocation from 'react-native-geolocation-service';
import {WEATHER_API_KEY, FINEDUST_API_KEY} from '@env';
import sunnyIcon from '../../assets/weathers/sunny.png'; // 맑음
import manyCloudsIcon from '../../assets/weathers/cloudy.png'; // 구름 많음
import cloudyIcon from '../../assets/weathers/clouds.png'; // 흐림
import rainyIcon from '../../assets/weathers/rainy.png'; // 비
import snowyIcon from '../../assets/weathers/snowy.png'; // 눈

// Lambert 좌표 변환 함수
const latLonToGrid = (lon, lat) => {
  const map = {
    Re: 6371.00877, // 지구 반경 (km)
    grid: 5.0, // 격자 간격 (km)
    slat1: 30.0, // 표준 위도 1
    slat2: 60.0, // 표준 위도 2
    olon: 126.0, // 기준 경도
    olat: 38.0, // 기준 위도
    xo: 43, // 기준점 X 좌표 (격자)
    yo: 136, // 기준점 Y 좌표 (격자)
  };

  const PI = Math.asin(1.0) * 2.0;
  const DEGRAD = PI / 180.0;

  let re = map.Re / map.grid;
  let slat1 = map.slat1 * DEGRAD;
  let slat2 = map.slat2 * DEGRAD;
  let olon = map.olon * DEGRAD;
  let olat = map.olat * DEGRAD;

  let sn =
    Math.tan(PI * 0.25 + slat2 * 0.5) / Math.tan(PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  let sf = Math.tan(PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
  let ro = Math.tan(PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);

  let ra = Math.tan(PI * 0.25 + lat * DEGRAD * 0.5);
  ra = (re * sf) / Math.pow(ra, sn);
  let theta = lon * DEGRAD - olon;
  if (theta > PI) theta -= 2.0 * PI;
  if (theta < -PI) theta += 2.0 * PI;
  theta *= sn;
  let x = ra * Math.sin(theta) + map.xo;
  let y = ro - ra * Math.cos(theta) + map.yo;

  return {x: Math.floor(x + 1.5), y: Math.floor(y + 1.5)};
};

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [pm10, setPm10] = useState(null);
  const [pm10Grade, setPm10Grade] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchData = async (nx, ny) => {
      try {
        const base_date = getCurrentDate();
        const base_time = getBaseTime();

        // API 호출 병렬화
        const weatherPromise = axios.get(
          'http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst',
          {
            params: {
              serviceKey: WEATHER_API_KEY,
              numOfRows: 60,
              pageNo: 1,
              dataType: 'JSON',
              base_date,
              base_time,
              nx,
              ny,
            },
          },
        );

        const dustPromise = axios.get(
          'http://apis.data.go.kr/B552584/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty',
          {
            params: {
              serviceKey: FINEDUST_API_KEY,
              numOfRows: 2,
              pageNo: 1,
              stationName: '종로구',
              dataTerm: 'DAILY',
              ver: '1.3',
              returnType: 'json',
            },
          },
        );

        const [weatherResponse, dustResponse] = await Promise.all([
          weatherPromise,
          dustPromise,
        ]);

        // 날씨 데이터 처리
        if (weatherResponse.data?.response?.body?.items) {
          const items = weatherResponse.data.response.body.items.item;
          const temperature = items.find(
            item => item.category === 'T1H',
          )?.fcstValue;
          const skyCondition = getSkyCondition(items);
          const humidity = items.find(
            item => item.category === 'REH',
          )?.fcstValue;

          setWeather({
            temperature,
            skyCondition,
            humidity,
          });
        } else {
          throw new Error('날씨 데이터 구조가 예상과 다릅니다.');
        }

        // 미세먼지 데이터 처리
        if (dustResponse.data.response.body.items.length > 0) {
          const pm10Value = dustResponse.data.response.body.items[0].pm10Value;
          const pm10GradeValue =
            dustResponse.data.response.body.items[0].pm10Grade;
          setPm10(pm10Value);
          setPm10Grade(pm10GradeValue);
        }

        setLoading(false);
      } catch (error) {
        console.log('Error:', error.response?.data || error.message);
        setErrorMsg(
          '정보를 가져오는 데 실패했습니다: ' +
            (error.response?.data?.message || error.message),
        );
        setLoading(false);
      }
    };

    const requestLocationPermission = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            setErrorMsg('위치 권한이 필요합니다.');
            return;
          }
        }

        Geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            const {x: nx, y: ny} = latLonToGrid(longitude, latitude); // 위경도 -> 격자 좌표 변환
            fetchData(nx, ny); // 날씨 및 미세먼지 데이터 요청
          },
          error => {
            console.log(error);
            setErrorMsg('위치 정보를 가져오는 데 실패했습니다.');
            setLoading(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      } catch (error) {
        setErrorMsg('위치 권한 요청 중 문제가 발생했습니다.');
      }
    };

    requestLocationPermission();
  }, []);

  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);
    return `${year}${month}${day}`;
  };

  const getBaseTime = () => {
    const now = new Date();
    const hour = now.getHours();
    let baseTime;

    if (now.getMinutes() < 45) {
      baseTime = `${('0' + (hour - 1)).slice(-2)}30`;
    } else {
      baseTime = `${('0' + hour).slice(-2)}30`;
    }

    return baseTime;
  };

  const getSkyCondition = items => {
    const ptyItem = items.find(item => item.category === 'PTY');
    const skyItem = items.find(item => item.category === 'SKY');

    if (ptyItem) {
      const ptyValue = ptyItem.fcstValue;
      if ([1, 5, 6].includes(parseInt(ptyValue))) {
        return '비';
      } else if ([2, 3, 7].includes(parseInt(ptyValue))) {
        return '눈';
      }
    }

    switch (skyItem?.fcstValue) {
      case '1':
        return '맑음';
      case '3':
        return '구름 많음';
      case '4':
        return '흐림';
      default:
        return '정보 없음';
    }
  };

  const getWeatherIcon = skyCondition => {
    switch (skyCondition) {
      case '맑음':
        return sunnyIcon;
      case '구름 많음':
        return manyCloudsIcon;
      case '흐림':
        return cloudyIcon;
      case '비':
        return rainyIcon;
      case '눈':
        return snowyIcon;
      default:
        return null;
    }
  };

  const getPm10GradeText = grade => {
    switch (grade) {
      case '1':
        return '좋음';
      case '2':
        return '보통';
      case '3':
        return '나쁨';
      case '4':
        return '매우 나쁨';
      default:
        return '정보 없음';
    }
  };

  if (loading) {
    return (
      <View
        style={{
          width: '100%',
          height: 177,
          paddingVertical: 12,
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <View
          style={{
            position: 'absolute',
            height: 21,
            left: 23,
            top: 16,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontWeight: 'bold',
              color: '#0F1012',
              lineHeight: 15 * 1.4,
            }}>
            대기환경
          </Text>
        </View>
        <ActivityIndicator size="large" color="#1ECD90" />
      </View>
    );
  }

  if (errorMsg) {
    return (
      <View style={styles.errorContainer}>
        <Text>{errorMsg}</Text>
      </View>
    );
  }

  const weatherIcon = cloudyIcon;

  const toFahrenheit = celsius => (celsius * 9) / 5 + 32;

  return (
    <View style={styles.box}>
      <View style={styles.fontBox}>
        <Text style={styles.font}>대기환경</Text>
      </View>
      <View style={styles.weatherBox}>
        {weatherIcon && <Image source={weatherIcon} style={styles.imageBox} />}
        <View style={styles.contentBox}>
          <View
            style={[
              styles.title,
              // {
              //   width:
              //     weather.skyCondition === '구름 많음'
              //       ? 85
              //       : weather.skyCondition === '맑음' ||
              //         weather.skyCondition === '흐림'
              //       ? 60
              //       : 45,
              // },
              {
                width: 60,
              },
            ]}>
            <Text style={styles.titleFont}>{'흐림'}</Text>
          </View>
          <View style={styles.content}>
            <Text style={[styles.contentFont, styles.space]}>
              현재 기온 <Text style={styles.gray}> | </Text> {23.4}℃
            </Text>
            <Text style={[styles.contentFont, styles.space]}>
              현재 습도 <Text style={styles.gray}> | </Text> 49%
            </Text>
            <Text style={styles.contentFont}>
              미세 먼지 <Text style={styles.gray}> | </Text>{' '}
              <Text
                style={[
                  pm10 !== null
                    ? getPm10GradeText(pm10Grade) === '좋음'
                      ? styles.blue
                      : getPm10GradeText(pm10Grade) === '보통'
                      ? styles.orange
                      : getPm10GradeText(pm10Grade) === '나쁨'
                      ? styles.red
                      : getPm10GradeText(pm10Grade) === '매우 나쁨'
                      ? styles.red
                      : styles.default
                    : styles.default,
                ]}>
                {pm10 !== null ? getPm10GradeText(pm10Grade) : '정보 없음'}
              </Text>{' '}
              <Text>{pm10 !== null ? `(${pm10}㎍/m³)` : '정보 없음'}</Text>
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: 177,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },
  fontBox: {
    position: 'absolute',
    height: 21,
    left: 23,
    top: 16,
  },
  font: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0F1012',
    lineHeight: 15 * 1.4,
  },
  weatherBox: {
    position: 'absolute',
    left: 20,
    top: 49,
    width: 268,
    height: 104,
  },
  imageBox: {
    position: 'absolute',
    top: 2,
    left: responsiveWidth(3),
    width: 100,
    height: 100,
  },
  contentBox: {
    position: 'absolute',
    left: responsiveWidth(40),
    width: 148,
    height: 104,
    paddingVertical: 8,
  },
  title: {
    position: 'absolute',
    top: -7,
    left: -3,
    height: 30,
    backgroundColor: '#1ECD90',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleFont: {
    fontSize: 13,
    fontWeight: 'semibold',
    color: '#FFFFFF',
    lineHeight: 13 * 1.4,
  },
  content: {
    position: 'absolute',
    width: 170,
    height: 70,
    top: 32,
  },
  contentFont: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    color: '#202025',
  },
  gray: {
    color: '#66666D',
  },
  orange: {
    color: '#FFA600',
    fontWeight: 'bold',
  },
  blue: {
    color: '#4879FF',
    fontWeight: 'bold',
  },
  red: {
    color: '#FF5168',
    fontWeight: 'bold',
  },
  space: {
    marginBottom: 7,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Weather;
