import React, { useState, useEffect, memo, useRef } from "react";
import { View, StyleSheet, Image, Platform, Alert } from 'react-native';
import CourseBottomSheet from "../components/CourseBottomSheet";
import MapView, { PROVIDER_GOOGLE, Marker, Polygon } from 'react-native-maps';
import Geolocation from "react-native-geolocation-service";
import { request, PERMISSIONS } from 'react-native-permissions';
import RecommendHeader from '../components/headers/RecommendHeader';

const RecommendScreen = ({navigation}) => {
  const [currentPosition, setCurrentPosition] = useState(null); // 현재 위치 저장
    const [selectedMarkerId, setSelectedMarkerId] = useState(null); // 선택된 마커 ID 저장
    const [selectedCourse, setSelectedCourse] = useState(null); // 선택된 코스 정보 저장
    const mapRef = useRef(null); // 지도 참조

    const MemoizedMarker = memo(Marker);
    const MemoizedPolygon = memo(Polygon);

    const locations = [
        {   
            id: 1,
            title: "A코스",
            description: "우온",
            distance: "1km",
            time: "1시간",
            polygon: [
                { latitude: 36.35095911742538, longitude: 127.29764060849232 },
                { latitude: 36.34907816763211, longitude: 127.2966308312807 },
                { latitude: 36.34856020267517, longitude: 127.29835558562381 },
                { latitude: 36.348125273713386, longitude: 127.29930083144488 },
                { latitude: 36.34752851862595, longitude: 127.30008948578379 },
                { latitude: 36.34794134794121, longitude: 127.30077061204628 },
                { latitude: 36.34909797783236, longitude: 127.29952735836476 },
                { latitude: 36.35048906542153, longitude: 127.29821811996614 },
            ]
        },
        {
            id: 2,
            title: "B코스",
            description: "한밭대학교",
            distance: "2km",
            time: "1시간 30분",
            polygon: [
                { latitude: 36.35471684260257, longitude: 127.30130916149847 },
                { latitude: 36.350886968434956, longitude: 127.29766261476878 },
                { latitude: 36.350109517364636, longitude: 127.29864000552318 },
                { latitude: 36.34776077764035, longitude: 127.30090359766223 },
                { latitude: 36.34519129305138, longitude: 127.30490398257625 },
                { latitude: 36.3457670172567, longitude: 127.30530725712664 },
                { latitude: 36.346001434968855, longitude: 127.30526361322235 },
                { latitude: 36.34656214896498, longitude: 127.30448601331484 },
                { latitude: 36.34686871661329, longitude: 127.30442036763199 },
                { latitude: 36.34804380329616, longitude: 127.30302129587915 },
                { latitude: 36.34970522333702, longitude: 127.30173546088834 },
                { latitude: 36.350931936751934, longitude: 127.30129457611443 },
                { latitude: 36.35183096720252, longitude: 127.30214472503044 },
                { latitude: 36.35377647524538, longitude: 127.30255331437627 },
            ]
        },
        {
            id: 3,
            title: "C코스",
            description: "대전 월드컵 경기장",
            distance: "2km",
            time: "1시간 20분",
            polygon: [
                { latitude: 36.36672523869309, longitude: 127.32361858454087 },
                { latitude: 36.36671644241099, longitude: 127.32684993176686 },
                { latitude: 36.36390474988262, longitude: 127.32686045740797 },
                { latitude: 36.363864891616494, longitude: 127.32162341159243 },
                { latitude: 36.36411793725778, longitude: 127.32135703692646 },
                { latitude: 36.36600485049976, longitude: 127.32341503456539 },
            ]
        },
        {
            id: 4,
            title: "D코스",
            description: "유성온천 메인 스트리트",
            distance: "1km",
            time: "50분",
            polygon: [
                { latitude: 36.35926584826277, longitude: 127.34375684889231 },
                { latitude: 36.358787418753046, longitude: 127.34715292229114 },
                { latitude: 36.35677915098149, longitude: 127.34668721166497 },
                { latitude: 36.35739354141442, longitude: 127.34301328538511 },
            ]
        },
        {
            id: 5,
            title: "E코스",
            description: "둔산 메인 스트리트",
            distance: "3km",
            time: "2시간 30분",
            polygon: [
                { latitude: 36.35772515869218, longitude: 127.37653923828758 },
                { latitude: 36.35769818421671, longitude: 127.37936902339021 },
                { latitude: 36.352958222139925, longitude: 127.37930146055979 },
                { latitude: 36.35139345106502, longitude: 127.37826894391581 },
                { latitude: 36.35199356579517, longitude: 127.37657847822703 },
                { latitude: 36.353219004400756, longitude: 127.37662894341642 },
            ]
        },
    ];

    // 다각형 중심 계산 함수
    const getPolygonCenter = (coordinates) => {
        const numCoords = coordinates.length;
        let latitudeSum = 0;
        let longitudeSum = 0;

        coordinates.forEach(coord => {
            latitudeSum += coord.latitude;
            longitudeSum += coord.longitude;
        });

        return {
            latitude: latitudeSum / numCoords,
            longitude: longitudeSum / numCoords,
        };
    };

    const handleCourseSelect = (course) => {
        // 선택된 코스의 마커로 이동
        setSelectedCourse(course);
        const polygonCenter = getPolygonCenter(course.polygon);
        mapRef.current.animateToRegion({
            ...polygonCenter,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
        });
        setSelectedMarkerId(course.id);
    };

    const handleMarkerPress = (course) => {
        // 마커가 눌리면 해당 마커 ID를 상태로 저장
        setSelectedMarkerId(course.id);
        setSelectedCourse(course); // 선택된 코스 정보 저장
    };

    const resetSelectedCourse = () => {
        setSelectedCourse(null); // 바텀 시트 열었을 때 선택된 코스 초기화
    };

    useEffect(() => {
        const requestLocationPermission = async () => {
            const permission = await request(
                Platform.OS === 'ios' 
                    ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE 
                    : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
            );
    
            if (permission === 'granted') {
                Geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        const initialPosition = {
                            latitude,
                            longitude,
                            latitudeDelta: 0.07,
                            longitudeDelta: 0.07,
                        };
                        setCurrentPosition(initialPosition);
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
          <RecommendHeader navigation={navigation} headerText={'대전 유성구'} />
            {currentPosition && (
                <MapView 
                    provider={PROVIDER_GOOGLE}
                    style={styles.mapImg}
                    initialRegion={currentPosition}
                    showsUserLocation={true} 
                    onRegionChangeComplete={() => {}} // 필요에 따라 추가 로직 적용 가능
                >
                    {locations.map((location) => {
                        const polygonCenter = getPolygonCenter(location.polygon);
                        return (
                            <React.Fragment key={location.id}>
                                <MemoizedPolygon
                                    coordinates={location.polygon}
                                    strokeColor="#7BE6B4"
                                    fillColor="#E7F7EF"
                                    strokeWidth={2}
                                />
                                <MemoizedMarker
                                    coordinate={polygonCenter}
                                    onPress={() => handleMarkerPress(location)} // 마커 누르면 코스 정보 설정
                                >
                                    <Image
                                        source={
                                            selectedMarkerId === location.id
                                                ? require('../../assets/images/img_spot.png') // 선택된 마커
                                                : require('../../assets/images/spot.png') // 기본 마커
                                        }
                                        style={styles.marker}
                                    />
                                </MemoizedMarker>
                            </React.Fragment>
                        );
                    })}
                </MapView>
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

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
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
});

export default RecommendScreen;
