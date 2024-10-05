import React from "react";
import { View, Image, StyleSheet, Pressable } from 'react-native';

const SurveyResultHeader = ({onBackPress}) => {
    return (
        <View style={styles.headerWrap}>
            <View style={styles.header}>
                <Pressable onPress={onBackPress}>
                    <Image 
                        source={require('../../../assets/icons/ic_back.png')}
                        style={styles.backIcon}
                    />
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerWrap: {
        width: '100%',
        height: 60,
        paddingVertical: 6,
        paddingHorizontal: 8,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '95%',
    },
    backIcon: {
        width: 24,
        height: 24,
    },
});

export default SurveyResultHeader;