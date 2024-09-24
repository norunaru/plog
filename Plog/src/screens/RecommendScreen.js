import React from "react";
import { View, StyleSheet, Image } from 'react-native';
import CourseBottomSheet from "../components/CourseBottomSheet";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

const RecommendScreen = () => {
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

    return (
        <View style={styles.mapView}>
            <MapView 
                provider={PROVIDER_GOOGLE}
                style={styles.mapImg}
                // initialRegion={{
                //     latitude: 36.35471684260257,
                //     longitude: 127.30130916149847,
                //     latitudeDelta: 0.07,
                //     longitudeDelta: 0.07,
                // }}
                showsUserLocation={true} // 현재 위치를 보여줍니다
                followsUserLocation={true} // 사용자의 움직임을 추적합니다
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