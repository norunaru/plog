import React from "react";
import { View, Text, Image, StyleSheet } from 'react-native';
import CourseBottomSheet from "../components/CourseBottomSheet";

const RecommendScreen = () => {
    return (
        <View style={styles.mapView}>
            <Image source={require('../../assets/images/image59.png')} style={styles.mapView}/>
            <CourseBottomSheet />
        </View>
    );
};

const styles = StyleSheet.create({
    mapView: {
        flex: 1,
        backgroundColor: 'white',
        width: '100%',
    },
});

export default RecommendScreen;