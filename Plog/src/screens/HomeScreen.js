import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  Alert,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import TopBar from '../components/TopBar';
import Weather from '../components/Weather';
import running from '../../assets/images/running.png';
import locationCourse from '../../assets/icons/locationCourse.png';
import music from '../../assets/icons/ic_music.png';
import rest from '../../assets/icons/ic_rest.png';
import {getAttractions} from '../API/attraction/attractionAPI';
import useStore from '../../store/store';
import Geolocation from 'react-native-geolocation-service';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export default function HomeScreen({navigation}) {
  const token = useStore(state => state.accessToken);
  const setUserLocation = useStore(state => state.setUserLocation); // Get the setUserLocation function from the store
  const [attractions, setAttractions] = useState({});
  const [errorMsg, setErrorMsg] = useState(null);

  // 위치 권한 요청 함수 추가
  const requestLocationPermission = async () => {
    const result = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
    );

    if (result === RESULTS.GRANTED) {
      // 권한이 허용된 경우에만 위치 정보를 요청
      Geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords;
          console.log('현재 위치:', {latitude, longitude}); // 위도, 경도 출력
          setUserLocation(latitude, longitude); // Store lat, lng in the app state
        },
        error => {
          console.log(error);
          setErrorMsg('위치 정보를 가져오는 데 실패했습니다.');
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
    } else {
      // 권한이 거부된 경우
      setErrorMsg('위치 권한이 필요합니다. 설정에서 위치 권한을 허용해주세요.');
      Alert.alert(
        '위치 권한이 필요합니다',
        '플로깅 코스 추천을 위해 위치 권한이 필요합니다. 설정에서 위치 권한을 허용해주세요.',
        [{text: '확인'}],
      );
    }
  };

  useEffect(() => {
    const getAttractionsData = async () => {
      const response = await getAttractions(token);
      setAttractions(response);
      console.log(response);
    };
    getAttractionsData();
  }, [token]);

  useEffect(() => {
    requestLocationPermission(); // 앱이 실행될 때 권한을 요청하고 위치 정보를 가져옴
  }, []);

  // useEffect(() => {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       const {latitude, longitude} = position.coords;
  //       console.log('현재 위치:', {latitude, longitude}); // 위도, 경도 출력
  //       setUserLocation(latitude, longitude); // Store lat, lng in the app state
  //     },
  //     error => {
  //       console.log(error);
  //       setErrorMsg('위치 정보를 가져오는 데 실패했습니다.');
  //       setLoading(false);
  //     },
  //     {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
  //   );
  // }, [setUserLocation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TopBar />
      <View style={styles.Wrapper}>
        <Weather />
        <View style={styles.BottomWrapper}>
          <TouchableOpacity
            style={styles.GreenBox}
            onPress={() => navigation.navigate('CustomCourseRec')}>
            <Text style={styles.heading}>
              맞춤형{'\n'}플로깅 코스{'\n'}추천받기
            </Text>
            <Image source={running} style={styles.bg} />
          </TouchableOpacity>
          <View style={styles.RightColumn}>
            <TouchableOpacity
              style={styles.SmallBox}
              onPress={() => navigation.navigate('Recommend')}>
              <Image style={styles.icon} source={locationCourse} />
              <Text style={styles.heading2}>
                내 위치 기반{'\n'}플로깅 코스 확인하기
              </Text>
            </TouchableOpacity>
            <Pressable onPress={() => navigation.navigate('Bench')}>
              <View style={styles.SmallBox}>
                <Image style={styles.icon} source={rest} />
                <Text style={styles.heading2}>
                  근처 벤치에서{'\n'}쉬어가기{' '}
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </View>
      <Text style={styles.heading}>플로깅하기 좋은 관광지</Text>

      {attractions?.image && (
        <ImageBackground
          source={{uri: attractions.image}}
          style={styles.attractionCard}
          imageStyle={{borderRadius: 16}}
          resizeMode="cover">
          <View style={styles.overlay} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{attractions.address}</Text>
          </View>
          <View style={{padding: 16}}>
            <Text style={styles.type}>{attractions.type}</Text>
            <Text style={styles.attractionName}>{attractions.name}</Text>
          </View>
        </ImageBackground>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: responsiveWidth(4),
    paddingTop: responsiveHeight(10),
  },
  Wrapper: {
    width: '100%',
    marginBottom: responsiveHeight(1),
  },
  BottomWrapper: {
    width: '100%',
    marginTop: responsiveHeight(1),
    flexDirection: 'row',
  },
  GreenBox: {
    flex: 1,
    marginRight: responsiveWidth(2),
    borderRadius: 16,
    padding: responsiveWidth(4),
    height: responsiveHeight(25),
    backgroundColor: '#E7F7EF',
    borderWidth: 1,
    borderColor: '#1ECD90',
    position: 'relative',
  },
  RightColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  SmallBox: {
    width: '100%',
    height: responsiveHeight(12),
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1.3),
  },
  bg: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: responsiveWidth(23),
    height: responsiveHeight(17),
  },
  heading: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold', // 텍스트 굵기
    color: 'black', // 텍스트 색상
    marginBottom: responsiveHeight(1.5),
    marginTop: responsiveHeight(1.5),
  },
  heading2: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: 'bold', // 텍스트 굵기
    color: 'black', // 텍스트 색상
    marginTop: responsiveHeight(4.5),
    marginLeft: responsiveWidth(1.5),
  },
  icon: {
    width: 29,
    height: 29,
    position: 'absolute',
    marginLeft: responsiveWidth(2.5),
    marginTop: responsiveHeight(1.5),
  },
  attractionCard: {
    width: '100%',
    position: 'relative',

    borderRadius: 16,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 4,
    marginBottom: 60,
    marginTop: 16,
    marginLeft: 16,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: responsiveFontSize(1.5),
    color: 'white',
    fontWeight: '500',
  },
  type: {
    fontSize: responsiveFontSize(1.7),
    color: 'white',
    marginBottom: 2,
    fontWeight: '500',
  },
  attractionName: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: 'bold',
    color: 'white',
  },
  overlay: {
    width: '100%',
    ...StyleSheet.absoluteFillObject, // 전체 영역을 덮는 오버레이
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // 검정색 반투명으로 밝기를 50% 조정
    borderRadius: 16, // 이미지와 동일한 모서리 둥글기
  },
});
