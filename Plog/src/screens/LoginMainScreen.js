import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ImageBackground, Pressable } from 'react-native'
import {
    responsiveWidth,
    responsiveHeight,
    responsiveFontSize,
  } from 'react-native-responsive-dimensions';
import {
    login,
} from '@react-native-seoul/kakao-login';
import { useNavigation } from '@react-navigation/native';
import { KakaoLogin } from "../../api/login/loginAPI";
import useStore from '../../store/store';

const LoginMainScreen = () => {
    const navigation = useNavigation();
    const setTokens = useStore((state) => state.setTokens);
    const setUserFromToken = useStore((state) => state.setUserFromToken);

    const signInWithKakao = async () => {
        try {
          const token = await login();

          if (token && token.accessToken) {
            const response = await KakaoLogin(token.accessToken)
            console.log('카카오 응답:', token)
            console.log('서버 응답:', response);

            if (response.data.accessToken && response.data.refreshToken) {
                setTokens(response.data.accessToken, response.data.refreshToken);
                setUserFromToken(response.data.accessToken);

                navigation.navigate('Survey');
            }
          }
        } catch (err) {
            console.error('login err', err);
        }
    };


    return (
        <View style={styles.loginView}>
            <View style={styles.header}>
                <Text style={styles.headerText}>나를 위한 플로깅은</Text>
                <Text style={styles.headerText}>
                    <Text style={styles.highlightedText}>플로그</Text>
                    와 함께
                </Text>
                <Text style={styles.bottomText}>플로깅은 조깅하면서 쓰레기를 줍는 행동을 말해요</Text>
            </View>
            <View style={styles.login}>
                <ImageBackground
                    source={require('../../assets/images/TextBalloon.png')}
                    style={styles.balloon}
                    resizeMode="contain">
                    <View style={styles.balloonTextContainer}>
                        <Text style={styles.balloonText}>오늘은 집 주변을 산책하며 쓰레기도 줍고</Text>
                        <Text style={styles.balloonText}>나만의 플로깅 코스를 저장하고 추천받는 건 어떨까요?</Text>
                    </View>
                </ImageBackground>
                <Image 
                    source={require('../../assets/icons/img_login.png')}
                    style={styles.loginImg}
                />
                <Pressable
                    style={styles.kakao}
                    onPress={() => {
                        signInWithKakao();
                    }}
                >
                    <Image 
                        source={require('../../assets/icons/kakao.png')} 
                        style={styles.kakaoImg}/>
                    <Text style={styles.kakaoText}>Kakao로 계속하기</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    loginView: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'center',
    },
    header: {
        width: responsiveWidth(80),
        height: responsiveHeight(10),
        top: responsiveHeight(19.5),
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: responsiveFontSize(3.5),
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#0F1012',
    },
    bottomText: {
        color: '#66666D',
        fontSize: responsiveFontSize(1.3),
        fontWeight: '500',
        marginTop: responsiveHeight(1.2),
    },
    highlightedText: {
        color: '#1ECD90',
    },
    balloon: {
        top: responsiveHeight(28),
        width: responsiveWidth(90),
        height: responsiveHeight(20),
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: responsiveHeight(2),
    },
    balloonTextContainer: {
        paddingHorizontal: responsiveWidth(5),
        position: 'relative',
        top: responsiveHeight(-1.5),
    },
    balloonText: {
        fontSize: responsiveFontSize(1.5),
        fontWeight: '500',
        color: '#0F1012',
        textAlign: 'center',
        lineHeight: responsiveHeight(2.5),
    },
    loginImg: {
        width: responsiveWidth(60),
        height: responsiveHeight(20),
        marginTop: responsiveHeight(25)
    },
    login: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    kakao: {
        width: responsiveWidth(85),
        height: responsiveHeight(8),
        backgroundColor: '#FEE500',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    kakaoImg: {
        width: 25,
        height: 20,
        marginRight: 5,
    },
    kakaoText: {
        fontSize: responsiveFontSize(2),
        fontWeight: 'bold',
        color: '#1C2028',
    },
});

export default LoginMainScreen;