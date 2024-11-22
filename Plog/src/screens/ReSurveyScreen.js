import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import {
    responsiveWidth,
    responsiveHeight,
    responsiveFontSize,
  } from 'react-native-responsive-dimensions';

const ReSurveyScreen = ({navigation}) => {

    return (
        <View style={styles.surveyView}>
            <View style={styles.title}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>플로깅을 하기 전,</Text>
                    <Text style={styles.headerText}>
                        <Text style={styles.highlightedText}>선호도 조사</Text>
                        를 해보세요!
                    </Text>
                </View>
                <View style={styles.contentBox}>
                    <View style={styles.textBox}>
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
                                사용자의 위치와 별점 취향기반으로{'\n'}
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
                </View>
            </View>
            <View style={styles.footer}>
                {/* <Pressable 
                    style={styles.nextBtn}
                    onPress={() => navigation.reset({
                        index: 0,
                        routes: [{ name: 'Tabs' }],
                      })}
                >
                    <Text style={styles.nextText}>
                        다음에 할게요
                    </Text>
                </Pressable> */}
                <Pressable 
                    style={styles.preferBtn}
                    onPress={() => navigation.navigate('Question', { from: 'ReSurvey' })}>
                    <Text style={styles.preferText}>
                        선호도 조사 다시하기
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    surveyView: {
        flex: 1,
        backgroundColor: "#fff",
    },
    title: {
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
        fontSize: responsiveFontSize(3.5),
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
        height: responsiveHeight(22),
        marginTop: responsiveHeight(25),
        justifyContent: 'center',
        alignItems: 'center',
    },
    textBox: {
        width: responsiveWidth(70),
        height: responsiveHeight(18),
        justifyContent: 'space-between',
    },
    checkBox: {
        flexDirection: 'row',
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
        color: '#3F3F47',
        lineHeight: responsiveHeight(2.2),
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        paddingHorizontal: responsiveWidth(10),
        bottom: responsiveHeight(6),
        width: '100%',
    },
    // nextBtn: {
    //     borderRadius: 30,
    //     borderWidth: 1,
    //     borderColor: '#1ECD90',
    //     width: responsiveWidth(35),
    //     height: responsiveHeight(7),
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     marginRight: responsiveWidth(3),
    // },
    // nextText: {
    //     color: '#1ECD90',
    //     fontSize: responsiveFontSize(1.8),
    //     fontWeight: 'bold',
    // },
    preferBtn: {
        width: responsiveWidth(80),
        height: responsiveHeight(7),
        borderRadius: 30,
        backgroundColor: '#1ECD90',
        alignItems: 'center',
        justifyContent: 'center',
    },
    preferText: {
        color: '#fff',
        fontSize: responsiveFontSize(2.3),
        fontWeight: 'bold',
    },
});

export default ReSurveyScreen;