import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import { View, StyleSheet, Image, Platform, Alert, ActivityIndicator } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import CourseBottomSheet from "../components/CourseBottomSheet";
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from 'react-native-maps';
import Geolocation from "react-native-geolocation-service";
import { request, PERMISSIONS } from 'react-native-permissions';
import RecommendHeader from '../components/headers/RecommendHeader';
import { locationPlog, getRegionFromKakao } from '../API/plogging/locationAPI';

const selectedMarkerImage = require('../../assets/images/img_spot.png');
const defaultMarkerImage = require('../../assets/images/spot.png');

const MemoizedMarker = memo(Marker, (prevProps, nextProps) => {
  return (
    prevProps.coordinate.latitude === nextProps.coordinate.latitude &&
    prevProps.coordinate.longitude === nextProps.coordinate.longitude &&
    prevProps.isSelected === nextProps.isSelected
  );
});

const MemoizedPolygon = memo(Polygon, (prevProps, nextProps) => {
  return prevProps.coordinates === nextProps.coordinates;
});

const RecommendScreen = ({ navigation }) => {
  const [currentPosition, setCurrentPosition] = useState(null); // 현재 위치 저장
  const [selectedMarkerId, setSelectedMarkerId] = useState(null); // 선택된 마커 ID 저장
  const [selectedCourse, setSelectedCourse] = useState(null); // 선택된 코스 정보 저장
  const [locations, setLocations] = useState([]);
  const [regionName, setRegionName] = useState('');

  const mapRef = useRef(null); // 지도 참조

  const handleCourseSelect = useCallback((course) => {
    // 선택된 코스의 마커로 이동
    setSelectedCourse(course);
    mapRef.current.animateToRegion({
      ...course.polygonCenter,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    setSelectedMarkerId(course.id);
  }, []);

  const handleMarkerPress = useCallback((course) => {
    // 마커가 눌리면 해당 마커 ID를 상태로 저장
    setSelectedMarkerId(course.id);
    setSelectedCourse(course); // 선택된 코스 정보 저장
  }, []);

  const resetSelectedCourse = useCallback(() => {
    setSelectedCourse(null); // 바텀 시트 열었을 때 선택된 코스 초기화
  }, []);

  useEffect(() => {
    const requestLocationPermission = async () => {
      const permission = await request(
        Platform.OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
      );

      if (permission === 'granted') {
        Geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            const initialPosition = {
              latitude,
              longitude,
              latitudeDelta: 0.07,
              longitudeDelta: 0.07,
            };
            console.log("현재 위치");
            console.log(latitude, longitude);
            setCurrentPosition(initialPosition);

            const region = await getRegionFromKakao(latitude, longitude);
            setRegionName(region);

            try {
              const locationData = {
                latitude,
                longitude,
              };

              const recommededCourses = await locationPlog(locationData);
              console.log(recommededCourses);

              if (recommededCourses && recommededCourses.data) {
                // 폴리곤 센터를 미리 계산하고 locations 상태에 저장
                const locationsWithCenters = recommededCourses.data.map((location) => {
                  const polygonCenter = getPolygonCenter(location.polygon);
                  return { ...location, polygonCenter };
                });
                setLocations(locationsWithCenters);
              }
            } catch (error) {
              console.log("위치 가져오기 실패:", error);
            }
          },
          (error) => {
            Alert.alert("Error", "현재 위치를 가져오는 데 실패했습니다.");
            console.error(error);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        Alert.alert("Permission Denied", "위치 권한이 필요합니다.");
      }
    };

    requestLocationPermission();
  }, []);

  return (
    <View style={styles.mapView}>
      <RecommendHeader
        navigation={navigation}
        headerText={regionName || '나의 위치'}
        style={styles.header}
      />
      {currentPosition ? (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.mapImg}
          initialRegion={currentPosition}
          showsUserLocation={true}
        >
          {locations.map((location) => (
            <React.Fragment key={location.id}>
              <MemoizedPolygon
                coordinates={location.polygon}
                strokeColor="#7BE6B4"
                fillColor="rgba(231, 247, 239, 0.5)"
                strokeWidth={2}
              />
              <MemoizedMarker
                coordinate={location.polygonCenter}
                onPress={() => handleMarkerPress(location)}
                isSelected={selectedMarkerId === location.id}
                tracksViewChanges={false}
              >
                <Image
                  source={
                    selectedMarkerId === location.id
                      ? selectedMarkerImage // 선택된 마커
                      : defaultMarkerImage // 기본 마커
                  }
                  style={styles.marker}
                />
              </MemoizedMarker>
            </React.Fragment>
          ))}
        </MapView>
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#1ECD90" />
        </View>
      )}
      <CourseBottomSheet
        locations={locations}
        selectedCourse={selectedCourse} // 선택된 코스 정보를 바텀시트로 전달
        onCourseSelect={handleCourseSelect}
        resetSelectedCourse={resetSelectedCourse} // 바텀 시트가 열릴 때 선택 초기화
      />
    </View>
  );
};

const getPolygonCenter = (coordinates) => {
  // 폴리곤의 중심 계산
  let minX = coordinates[0].latitude;
  let maxX = coordinates[0].latitude;
  let minY = coordinates[0].longitude;
  let maxY = coordinates[0].longitude;

  coordinates.forEach((coord) => {
    minX = Math.min(minX, coord.latitude);
    maxX = Math.max(maxX, coord.latitude);
    minY = Math.min(minY, coord.longitude);
    maxY = Math.max(maxY, coord.longitude);
  });

  return {
    latitude: (minX + maxX) / 2,
    longitude: (minY + maxY) / 2,
  };
};

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
  header: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '500',
    color: '#202025',
  },
  mapImg: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  marker: {
    width: 50,
    height: 50,
  },
  loading: {
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

export default RecommendScreen;
