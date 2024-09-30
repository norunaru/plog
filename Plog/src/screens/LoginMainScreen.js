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

const LoginMainScreen = () => {
    const [result, setResult] = useState('');
    const navigation = useNavigation();

    const signInWithKakao = async () => {
        try {
          const token = await login();
          console.log('로그인 성공', token)
          setResult(JSON.stringify(token));

          if (token) {
            navigation.navigate('Survey')
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
            </View>
            <View style={styles.login}>
                <ImageBackground
                    source={require('../../assets/images/TextBalloon.png')}
                    style={styles.balloon}
                    resizeMode="contain">
                    <View style={styles.balloonTextContainer}>
                        <Text style={styles.balloonText}>플로깅은 조깅하면서 쓰레기를 줍는 행동을 말해요.</Text>
                        <Text style={styles.balloonText}>오늘은 집 주변을 산책하며 쓰레기도 줍고</Text>
                        <Text style={styles.balloonText}>플로깅 코스를 저장하고 추천받는 건 어떨까요?</Text>
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
        top: responsiveHeight(15.8),
        textAlign: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: responsiveFontSize(3.5),
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#0F1012',

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
        fontSize: responsiveFontSize(1.8),
        fontWeight: '500',
        color: '#0F1012',
        textAlign: 'center',
        lineHeight: responsiveHeight(2.5),
    },
    loginImg: {
        width: responsiveWidth(55),
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