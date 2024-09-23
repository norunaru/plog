import React from "react";
import { View, Text, Image, StyleSheet } from 'react-native';
import CourseBottomSheet from "../components/CourseBottomSheet";

const RecommendScreen = () => {
    return (
        <View style={styles.mapView}>
            <Image source={require('../../assets/images/image59.png')} style={styles.mapImg}/>
            <CourseBottomSheet />
        </View>
    );
};

const styles = StyleSheet.create({
    mapView: {
        flex: 1,
    },
    mapImg: {
        width: '100%',
        height: '100%',
    },
});

export default RecommendScreen;