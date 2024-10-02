import React from "react";
import { View, Image, StyleSheet, Pressable } from 'react-native';
import {
    responsiveWidth,
    responsiveHeight,
    responsiveFontSize,
} from 'react-native-responsive-dimensions';

const SurveyQuestionHeader = ({onBackPress, onClosePress}) => {
    return (
        <View style={styles.headerWrap}>
            <View style={styles.header}>
                <Pressable onPress={onBackPress}>
                    <Image 
                        source={require('../../../assets/icons/ic_back.png')}
                        style={styles.backIcon}
                    />
                </Pressable>
                <Pressable onPress={onClosePress}>
                    <Image 
                        source={require('../../../assets/icons/greenClose.png')}
                        style={styles.closeIcon}
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
    closeIcon: {
        width: 24,
        height: 24,
    },
});

export default SurveyQuestionHeader;