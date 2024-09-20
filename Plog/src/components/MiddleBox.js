import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');  // 기기 화면 크기

import Weather from './Weather';

const MiddleBox = () => {
    return (
        <View>
            <View style={styles.MiddleTop}>
                <Weather />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    MiddleTop: {
        width: width * 0.9,
        height: height * 0.7,
        padding: 8,
        marginTop: 15,
    },
});

export default MiddleBox;