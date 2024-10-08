import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {login} from '@react-native-seoul/kakao-login';
import {useNavigation} from '@react-navigation/native';
import {KakaoLogin} from '../API/login/loginAPI';
import useStore from '../../store/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginMainScreen = () => {
  const navigation = useNavigation();
  const setTokens = useStore((state) => state.setTokens);
  const setUserFromToken = useStore((state) => state.setUserFromToken);
  const setIsFirst = useStore((state) => state.setIsFirst);
  const [errorMessage, setErrorMessage] = useState('');

  const signInWithKakao = async () => {
    try {
      setErrorMessage(''); // 시도할 때마다 에러 메시지 초기화
      const token = await login();

      if (token && token.accessToken) {
        console.log('카카오에서 받은 토큰:', token.accessToken);

        // 서버에 로그인 요청 보내기
        const response = await KakaoLogin(token.accessToken);
        console.log('서버 응답:', response);

        // 서버 응답에서 data 안의 accessToken과 refreshToken을 사용
        if (
          response.data &&
          response.data.accessToken &&
          response.data.refreshToken
        ) {
          // 토큰 및 사용자 정보 설정
          await setTokens(
            response.data.accessToken,
            response.data.refreshToken
          );
          await setUserFromToken(response.data.accessToken);

          // 서버에서 받은 isFirstLogin 값을 상태와 AsyncStorage에 저장
          const isFirstLogin = response.data.isFirstLogin === 1; // 1이면 true
          await setIsFirst(isFirstLogin);
          await AsyncStorage.setItem('isFirst', isFirstLogin ? 'true' : 'false');

          if (isFirstLogin) {
            navigation.navigate('Survey');
          } else {
            navigation.navigate('Tabs');
          }
      } else {
        setErrorMessage('서버로부터 유효한 토큰을 받지 못했습니다.');
        }
      } else {
        setErrorMessage('카카오 로그인에 실패했습니다.');
      }
    } catch (err) {
      console.error('로그인 에러:', err);

      // 에러 응답이 있는 경우 처리
      if (err.response) {
        // 서버에서 반환된 에러 처리 (예: 404, 500 등)
        setErrorMessage(
          `서버 에러: ${err.response.status} - ${
            err.response.data.message || '에러 메시지 없음'
          }`,
        );
      } else if (err.request) {
        // 요청이 전송되었으나 응답을 받지 못한 경우
        setErrorMessage('서버와의 통신에 실패했습니다. 네트워크를 확인하세요.');
      } else {
        // 기타 오류
        setErrorMessage(`로그인 에러: ${err.message}`);
      }
    }
  };

  return (
    <View style={styles.loginView}>
      <View style={styles.header}>
        <Text style={styles.headerText}>나를 위한 플로깅은</Text>
        <Text style={styles.headerText}>
          <Text style={styles.highlightedText}>플로그</Text>와 함께
        </Text>
        <Text style={styles.bottomText}>
          플로깅은 조깅하면서 쓰레기를 줍는 행동을 말해요
        </Text>
      </View>
      <View style={styles.login}>
        <ImageBackground
          source={require('../../assets/images/TextBalloon.png')}
          style={styles.balloon}
          resizeMode="contain">
          <View style={styles.balloonTextContainer}>
            <Text style={styles.balloonText}>
              오늘은 집 주변을 산책하며 쓰레기도 줍고
            </Text>
            <Text style={styles.balloonText}>
              나만의 플로깅 코스를 저장하고 추천받는 건 어떨까요?
            </Text>
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
          }}>
          <Image
            source={require('../../assets/icons/kakao.png')}
            style={styles.kakaoImg}
          />
          <Text style={styles.kakaoText}>Kakao로 계속하기</Text>
        </Pressable>

        {/* 에러 메시지 표시 부분 */}
        {errorMessage ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginView: {
    flex: 1,
    backgroundColor: '#fff',
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
    marginTop: responsiveHeight(25),
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
    flexDirection: 'row',
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
