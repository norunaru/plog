import React from "react";
import { View, Text, StyleSheet, Image } from 'react-native'
import {
    responsiveWidth,
    responsiveHeight,
    responsiveFontSize,
  } from 'react-native-responsive-dimensions';

import { useNavigation } from '@react-navigation/native';

const SurveyScreen = () => {

    return (
        <View style={styles.surveyView}>
            <View style={styles.header}>
                <Text style={styles.headerText}>플로깅을 하기 전,</Text>
                <Text style={styles.headerText}>
                    <Text style={styles.highlightedText}>선호도 조사</Text>
                    를 하는 건 어때요?
                </Text>
            </View>
            <View style={styles.contentBox}>
                <View style={styles.checkBox}>
                    <Image 
                        source={require('../../assets/icons/ic_check.png')}
                        style={styles.checkImg}
                    />
                    <Text style={styles.checkText}>
                        빅데이터 시스템을 통해{'\n'}
                        힐링하며 할 수 있는 플로깅 코스를 제안해드려요.
                    </Text>
                </View>
                <View style={styles.checkBox}>
                    <Image 
                        source={require('../../assets/icons/ic_check.png')}
                        style={styles.checkImg}
                    />
                    <Text style={styles.checkText}>
                        휴지통과 사용자의 별점 취향기반으로{'\n'}
                        플로깅코스를 추천해드려요.
                    </Text>
                </View>
                <View style={styles.checkBox}>
                    <Image 
                        source={require('../../assets/icons/ic_check.png')}
                        style={styles.checkImg}
                    />
                    <Text style={styles.checkText}>
                        선호도 조사를 통해{'\n'}
                        더욱 개인화된 서비스를 즐길 수 있어요.
                    </Text>
                </View>
            </View>
            <View style={styles.btnBox}>
                <View style={styles.nextBtn}>
                    <Text style={styles.nextText}>다음에 할게요</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    surveyView: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
    },
    header: {
        width: responsiveWidth(80),
        height: responsiveHeight(10),
        top: responsiveHeight(15.8),
        textAlign: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: responsiveFontSize(3),
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#0F1012',
        lineHeight: responsiveHeight(5)
    },
    highlightedText: {
        color: '#1ECD90',
    },
    contentBox: {
        backgroundColor: '#F7F7F7',
        borderRadius: 16,
        width: responsiveWidth(80),
        height: responsiveHeight(25),
        marginTop: responsiveHeight(27),
        flexDirection: 'column',
        justifyContent: 'space-around',
    },
    checkBox: {
        flexDirection: 'row',
        marginLeft: responsiveWidth(3),
        alignItems: 'center',
    },
    checkImg: {
        width: 35,
        height: 35,
        marginRight: 10,
    },
    checkText: {
        fontSize: responsiveFontSize(1.4),
        fontWeight: '500',
        color: '#0F1012',
        lineHeight: responsiveHeight(2.2),
    },
    btnBox: {
        flexDirection: 'row',
    },
    nextBtn: {
        borderRadius: 30,
        borderWidth: 1,
        borderColor: '#1ECD90',
    },
    nextText: {
        color: '#1ECD90',
        fontSize: responsiveFontSize(1.6),
        fontWeight: 'bold',
    }
});

export default SurveyScreen;