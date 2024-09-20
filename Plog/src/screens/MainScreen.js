import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TopBar from '../components/TopBar';
import MiddleBox from '../components/MiddleBox';

const MainScreen = () => {
    return (
        <View style={styles.MainBox}>
            <TopBar />
            <MiddleBox />
            <Text>footer</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    MainBox: {
      justifyContent: 'center',
      alignItems: 'center',
    },

    
});

export default MainScreen;