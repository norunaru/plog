import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, Platform, Alert } from 'react-native';
import CourseBottomSheet from "../components/CourseBottomSheet";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geolocation from "react-native-geolocation-service";
import { request, PERMISSIONS } from 'react-native-permissions';

const RecommendScreen = () => {
    const [currentPosition, setCurrentPosition] = useState(null); // 현재 위치 저장

    const locations = [
        {
            latitude: 36.35095911742538,
            longitude: 127.29764060849232,
            title: "A코스",
            description: "우온",
        },
        {
            latitude: 36.35471684260257,
            longitude: 127.30130916149847,
            title: "B코스",
            description: "한밭대학교",
        },
        {
            latitude: 36.36672523869309,
            longitude: 127.32361858454087,
            title: "C코스",
            description: "대전 월드컵 경기장",
        },
        {
            latitude: 36.35926584826277,
            longitude: 127.34375684889231,
            title: "D코스",
            description: "유성온천 메인 스트리트",
        },
        {
            latitude: 36.35772515869218,
            longitude: 127.37653923828758,
            title: "E코스",
            description: "둔산 메인 스트리트",
        },
    ];

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
                        setCurrentPosition({
                            latitude,
                            longitude,
                            latitudeDelta: 0.07, // 초기 확대 수준 설정
                            longitudeDelta: 0.07,
                        });
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
            {currentPosition && (
                <MapView 
                    provider={PROVIDER_GOOGLE}
                    style={styles.mapImg}
                    initialRegion={currentPosition}
                    showsUserLocation={true} // 현재 위치에 블루 도트 표시
                >
                    {locations.map((location, index) => (
                        <Marker
                            key={index}
                            coordinate={{
                                latitude: location.latitude,
                                longitude: location.longitude,
                            }}
                            title={location.title}
                            description={location.description}
                        >
                            <Image
                                source={require('../../assets/images/spot.png')} 
                                style={styles.marker} 
                            />
                        </Marker>
                    ))}
                </MapView>
            )}
            <CourseBottomSheet />
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
    }
});

export default RecommendScreen;