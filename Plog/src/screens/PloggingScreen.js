import React, { useState, useEffect, useRef  } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, Platform, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';
import MapView, { PROVIDER_GOOGLE, Polygon, Polyline } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { request, PERMISSIONS } from 'react-native-permissions';
import { detailCourse } from '../API/plogging/detailAPI';
import { getDistance, isPointInPolygon } from 'geolib';

import timerIcon from '../../assets/icons/ic_time.png';
import startIcon from '../../assets/icons/ic_start.png';
import stopIcon from '../../assets/icons/ic_stop.png';
import pauseIcon from '../../assets/icons/ic_pause.png';
import calorieIcon from '../../assets/icons/ic_calorie.png';
import distIcon from '../../assets/icons/distance.png';
import Modal from '../components/Modal';
import InPolygonModal from '../components/modals/InPolygonModal';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const PloggingScreen = ({ navigation, route }) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCountdownComplete, setIsCountdownComplete] = useState(false);
  const [coursePolygon, setCoursePolygon] = useState(null); // 코스 폴리곤 좌표 저장
  const [currentPosition, setCurrentPosition] = useState(null); // 현재 위치 저장
  const [courseName, setCourseName] = useState(null);
  const [isOutOfArea, setIsOutOfArea] = useState(false);
  const [isReadyToStart, setIsReadyToStart] = useState(false);

  const watchId = useRef(null);
  const [pathCoordinates, setPathCoordinates] = useState([]); // 경로를 저장할 배열
  const [totalDistance, setTotalDistance] = useState(0); // 총 이동 거리 (미터 단위)
  const [caloriesBurned, setCaloriesBurned] = useState(0); // 소모 칼로리
  const userWeight = 60; // 사용자의 몸무게 (kg), 필요에 따라 사용자 입력으로 변경 가능

  const { courseId } = route.params; // 선택된 코스의 ID 가져오기

  const isWithinCourseArea = (currentLocation, coursePolygon) => {
    return isPointInPolygon(currentLocation, coursePolygon);
  };

  const handleEndButtonPress = () => {
    setIsModalOpen(true);
    setIsRunning(false); // 타이머와 위치 추적을 멈춤
  };

  const handleContinue = () => {
    setIsModalOpen(false);
    setIsRunning(true); // 타이머와 위치 추적을 다시 시작
  };
  
  // 모달에서 '끝내기' 버튼을 눌렀을 때
  const handleFinish = () => {
    // 여기서 Writing 페이지로 이동하면서 필요한 데이터를 전달
    navigation.navigate('Writing', {
      courseId,
      totalDistance,
      caloriesBurned,
      seconds,
      pathCoordinates,
      courseName,
      endDate: new Date().toISOString(), // Date 객체를 문자열로 변환하여 전달
    });
  };

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (secs) => {
    const minutes = parseInt(secs / 60, 10);
    const seconds = parseInt(secs % 60, 10);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const onCountdownFinish = () => {
    setIsCountdownComplete(true);
    setIsRunning(true);
  };

  // 코스 상세 정보 불러오기 및 현재 위치 가져오기
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const courseData = await detailCourse(courseId); // API 호출
        setCoursePolygon(courseData.data.polygon); // 폴리곤 좌표 저장
        setCourseName(courseData.data.title);

        // 코스 폴리곤을 가져온 후에 현재 위치를 가져옵니다.
        await requestLocationPermission(courseData.data.polygon);
      } catch (error) {
        console.error('코스 정보 가져오기 실패:', error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  // 현재 위치 가져오기 및 위치 권한 요청
  const requestLocationPermission = async (polygon) => {
    const permission = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
        : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
    );

    if (permission === 'granted') {
      Geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const currentPos = {
            latitude,
            longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          };
          setCurrentPosition(currentPos);

          // 폴리곤 내부 확인 수행
          if (polygon) {
            const insidePolygon = isWithinCourseArea(
              { latitude, longitude },
              polygon
            );

            if (!insidePolygon) {
              // 폴리곤 밖이면 모달을 띄움
              setIsOutOfArea(true);
              setIsRunning(false);
            } else {
              setIsOutOfArea(false);
              setIsReadyToStart(true);
            }
          }
        },
        (error) => {
          Alert.alert('Error', '현재 위치를 가져오는 데 실패했습니다.');
          console.error(error);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    } else {
      Alert.alert('Permission Denied', '위치 권한이 필요합니다.');
    }
  };

  // 위치 추적 및 경로 업데이트
  useEffect(() => {
    if (isRunning) {
      // 플로깅이 시작되면 위치 추적 시작
      watchId.current = Geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPosition = { latitude, longitude };
  
          // 현재 위치 업데이트 (지도 이동을 위해)
          setCurrentPosition({
            ...newPosition,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
  
          // 경로 업데이트 및 거리 계산
          setPathCoordinates((prevCoords) => {
            // 이전 위치가 있으면 거리 계산
            if (prevCoords.length > 0) {
              const prevPosition = prevCoords[prevCoords.length - 1];
              const distance = getDistance(prevPosition, newPosition); // 미터 단위 거리 계산
  
              // 총 이동 거리 업데이트
              setTotalDistance((prevDistance) => {
                const newTotalDistance = prevDistance + distance;
  
                // 칼로리 계산 (칼로리 = 거리(km) * 몸무게(kg) * 0.57)
                const distanceInKm = newTotalDistance / 1000;
                const calories = distanceInKm * userWeight * 0.57;
                setCaloriesBurned(calories);
  
                return newTotalDistance;
              });
            }
  
            // 새로운 위치를 경로에 추가
            return [...prevCoords, newPosition];
          });
        },
        (error) => {
          console.error(error);
        },
        {
          enableHighAccuracy: true,
          distanceFilter: 1, // 1미터 이동 시마다 업데이트
          interval: 1000, // 1초마다 위치 확인
          fastestInterval: 500,
        }
      );
    } else {
      // 플로깅이 일시 중지되면 위치 추적 중지
      if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }
    }
  
    // 컴포넌트 언마운트 시 위치 추적 중지
    return () => {
      if (watchId.current !== null) {
        Geolocation.clearWatch(watchId.current);
        watchId.current = null;
      }
    };
  }, [isRunning]);

  if (!coursePolygon || !courseName) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1ECD90" />
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      {/* 위치가 코스 영역 밖에 있을 때 모달 */}
      {isOutOfArea && (
        <InPolygonModal
          onClose={() => {
            setIsOutOfArea(false);
            navigation.goBack();
          }}
          boldText={'플로깅을 시작할 수 없습니다'}
          subText={'현재 위치가 코스 영역 밖에 있습니다.'}
          greenBtnFn={() => {
            setIsOutOfArea(false);
            navigation.goBack();
          }}
          greenBtnText={'확인'}
        />
      )}

      {isModalOpen ? (
        <Modal
          onClose={() => {
            setIsModalOpen(false);
            setIsRunning(true); // 모달 배경을 눌러 닫을 때도 다시 시작
          }}
          boldText={'플로깅을 끝내시겠어요?'}
          subText={'현재 진행한 코스까지만 기록돼요'}
          whiteBtnFn={handleContinue} // '계속하기' 버튼 함수
          greenBtnFn={handleFinish} // '끝내기' 버튼 함수
          greenBtnText={'끝내기'}
          whiteBtnText={'계속하기'}
        />
      ) : null}

      <Text style={styles.topText}>{courseName}에서 플로깅 하고있어요</Text>

      <View style={styles.timerContainer}>
        <Image source={timerIcon} style={{ width: 27, height: 27 }} />
        <Text style={styles.timerText}>{formatTime(seconds)}</Text>
      </View>

      <View style={styles.mapContainer}>
        {currentPosition && (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={currentPosition}
            showsUserLocation={true}
          >
            {coursePolygon && (
              <Polygon
                coordinates={coursePolygon}
                strokeColor="#7BE6B4"
                fillColor="rgba(231, 247, 239, 0.5)"
                strokeWidth={2}
              />
            )}
            {pathCoordinates.length > 0 && (
              <Polyline
                coordinates={pathCoordinates}
                strokeWidth={5}
                strokeColor="#1ECD90"
              />
            )}
          </MapView>
        )}
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.textCont}>
          <Image source={distIcon} style={{ width: 27, height: 27, marginTop: 4 }} />
          <Text style={styles.infoText}>현재 이동 거리</Text>
          <Text style={styles.numText}>{(totalDistance / 1000).toFixed(2)} km</Text>
        </View>
        <View style={styles.textCont}>
          <Image source={calorieIcon} style={{ width: 27, height: 27, marginTop: 4 }} />
          <Text style={styles.infoText}>소모 칼로리</Text>
          <Text style={styles.numText}>{caloriesBurned.toFixed(0)} kcal</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.endButton}
          onPress={handleEndButtonPress}
        >
          <Image source={stopIcon} style={{ width: 21, height: 21, marginTop: 3.5 }} />
          <Text style={styles.endButtonText}>끝내기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor: isRunning ? '#E7F7EF' : '#1ECD90',
              borderWidth: isRunning ? 2 : 0,
            },
          ]}
          onPress={() => setIsRunning(!isRunning)}
        >
          <Image
            source={isRunning ? pauseIcon : startIcon}
            style={{ width: 21, height: 21, marginTop: 4 }}
          />
          <Text
            style={[
              styles.actionButtonText,
              { color: isRunning ? '#00A68A' : '#FFFFFF' },
            ]}
          >
            {isRunning ? '잠시 멈추기' : '이어하기'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {isReadyToStart && !isCountdownComplete && !isOutOfArea && (
        <View style={styles.overlay}>
          <LottieView
            source={require('../../assets/animation/countdown.json')}
            autoPlay
            loop={false}
            onAnimationFinish={onCountdownFinish} // 애니메이션이 끝나면 타이머 시작
            style={styles.lottie}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#DFE4E7',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: 200,
    height: 200,
  },
  topText: {
    color: 'black',
    fontSize: responsiveFontSize(2.2),
    fontWeight: 'bold',
    marginTop: 30,
    textAlign: 'center',
  },
  timerContainer: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    width: responsiveWidth(60),
    height: responsiveHeight(9),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  timerText: {
    fontSize: responsiveFontSize(3.2),
    fontWeight: 'bold',
    color: '#017978',
  },
  mapContainer: {
    flex: 1,
    marginTop: 20,
    width: responsiveWidth(100),
    height: responsiveHeight(100),
    backgroundColor: '#DFE4E7',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: responsiveWidth(90),
    height: responsiveHeight(45),
  },
  infoContainer: {
    width: '90%',
    height: 100,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  textCont: {
    flexDirection: 'row',
    marginVertical: 1.4,
  },
  infoText: {
    fontSize: responsiveFontSize(1.8),
    color: 'black',
    fontWeight: '500',
    paddingVertical: 7,
    marginLeft: 10,
  },
  numText: {
    fontSize: responsiveFontSize(1.7),
    color: '#3F3F47',
    paddingVertical: 7,
    marginLeft: 6,
    marginTop: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    marginTop: responsiveHeight(3),
    marginBottom: responsiveHeight(5),
  },
  endButton: {
    backgroundColor: '#FFFFFF',
    width: responsiveWidth(32),
    height: 70,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  endButtonText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    color: '#9B9BA3',
    marginLeft: 7,
  },
  actionButton: {
    width: responsiveWidth(56),
    height: 70,    
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: '#1ECD90',
  },
  actionButtonText: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold',
    marginLeft: 7,
  },
  loaderContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PloggingScreen;
