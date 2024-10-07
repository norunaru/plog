import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import MyPageScreen from './src/screens/MyPageScreen';
import DetailScreen from './src/screens/DetailScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import RecommendScreen from './src/screens/RecommendScreen';
import CourseDetailScreen from './src/screens/CourseDetailScreen';
import CustomCourseRecScreen from './src/screens/CustomCourseRecScreen';
import PloggingScreen from './src/screens/PloggingScreen';
import LoginMainScreen from './src/screens/LoginMainScreen';
import SurveyScreen from './src/screens/SurveyScreen';
import SurveyQuestionScreen from './src/screens/SurveyQuestionScreen';
import PloggingRecordScreen from './src/screens/PloggingRecordScreen';
import PloggingRecordDetailScreen from './src/screens/PloggingRecordDetailScreen';
import WritingScreen from './src/screens/WritingScreen';
import LoginScreen from './src/screens/LoginScreen';
import ViewReviewScreen from './src/screens/ViewReviewScreen';
import ManageFriendScreen from './src/screens/ManageFriendScreen';
import SurveyFinishScreen from './src/components/SurveyFinishScreen';
import SurveyResultScreen from './src/components/SurveyResultScreen';
import DeleteFriendScreen from './src/screens/DeleteFriendScreen';
import ModifyInfoScreen from './src/screens/ModifyInfoScreen';

import {Image} from 'react-native';
import homeBlack from './assets/icons/homeBlack.png';
import homeGray from './assets/icons/homeGray.png';
import communityBlack from './assets/icons/communityBlack.png';
import communityGray from './assets/icons/communityGray.png';
import MyBlack from './assets/icons/myBlack.png';
import MyGray from './assets/icons/myGray.png';

import useStore from './store/store';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient();

// Tab Navigator와 Stack Navigator 생성
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Tab Navigator 정의
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let iconSource;

          // 각 탭에 맞는 이미지 경로 설정
          if (route.name === 'Home') {
            iconSource = focused ? homeBlack : homeGray;
          } else if (route.name === 'MyPage') {
            iconSource = focused ? MyBlack : MyGray;
          } else if (route.name === 'Community') {
            iconSource = focused ? communityBlack : communityGray;
          }

          // Image 컴포넌트를 사용하여 커스텀 이미지 렌더링
          return (
            <Image
              source={iconSource}
              style={{width: 38, height: 41}} // 이미지 크기 조정
              resizeMode="contain" // 이미지의 크기가 변해도 비율 유지
            />
          );
        },
        tabBarShowLabel: false, // 탭 레이블 숨기기
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
    </Tab.Navigator>
  );
}

function SurveyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Survey"
        component={SurveyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Question"
        component={SurveyQuestionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SurveyFinish"
        component={SurveyFinishScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SurveyResult"
        component={SurveyResultScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginMain"
        component={LoginMainScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// 인증된 사용자용 Stack Navigator
function AuthenticatedStack() {
  return (
    <Stack.Navigator>
      {/* 탭 네비게이터 사용되는 스크린 */}
      <Stack.Screen
        name="Tabs"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LoginMain"
        component={LoginMainScreen}
        options={{ headerShown: false }}
      />
      {/* 스택 네비게이터에만 존재하는 스크린 */}
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen
        name="CustomCourseRec"
        component={CustomCourseRecScreen}
        options={{
          headerTitleAlign: 'center',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CourseDetail"
        component={CourseDetailScreen}
        options={{
          headerTitleAlign: 'center',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Plogging"
        component={PloggingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PloggingRecord"
        component={PloggingRecordScreen}
        options={{
          headerTitleAlign: 'center',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PloggingRecordDetail"
        component={PloggingRecordDetailScreen}
        options={{
          headerTitleAlign: 'center',
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Writing"
        component={WritingScreen}
        options={{
          title: '일지 작성',
          headerTitleAlign: 'center',
          headerBackVisible: false,
        }}
      />
      <Stack.Screen
        name="Recommend"
        component={RecommendScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Review" component={ViewReviewScreen} />
      <Stack.Screen
        name="ManageFriend"
        component={ManageFriendScreen}
      />
      <Stack.Screen
        name="DeleteFriend"
        component={DeleteFriendScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ModifyInfo"
        component={ModifyInfoScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Survey"
        component={SurveyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Question"
        component={SurveyQuestionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SurveyFinish"
        component={SurveyFinishScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SurveyResult"
        component={SurveyResultScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// 인증되지 않은 사용자용 Stack Navigator
function UnauthenticatedStack() {
  return (
    <Stack.Navigator initialRouteName="LoginMain">
      <Stack.Screen
        name="LoginMain"
        component={LoginMainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Survey"
        component={SurveyScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Question"
        component={SurveyQuestionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SurveyFinish"
        component={SurveyFinishScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SurveyResult"
        component={SurveyResultScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const setTokens = useStore((state) => state.setTokens);
  const accessToken = useStore((state) => state.accessToken);
  const setUserFromToken = useStore((state) => state.setUserFromToken);
  const setIsFirst = useStore((state) => state.setIsFirst);
  const isFirst = useStore((state) => state.isFirst);

  useEffect(() => {
    const initializeApp  = async () => {
      try {
        const storedAccessToken = await AsyncStorage.getItem('accessToken');
        const storedRefreshToken = await AsyncStorage.getItem('refreshToken');
        const storedIsFirst = await AsyncStorage.getItem('isFirst');

        console.log("불러온 isFirst 값:", storedIsFirst);

        if (storedAccessToken && storedRefreshToken) {
          await setTokens(storedAccessToken, storedRefreshToken);
          await setUserFromToken(storedAccessToken);
        }

        if (storedIsFirst !== null) {
          setIsFirst(storedIsFirst === 'true');
        } else {
          // storedIsFirst가 없는 경우 기본값을 설정
          setIsFirst(true);
        }
      } catch (e) {
        console.error('앱 초기화 오류:', e);
      } finally {
        setLoading(false);
      }
    };

    initializeApp();
  }, []);

  if (loading) {
    // 토큰 로딩 중일 때 로딩 인디케이터 표시
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#1ECD90" />
      </View>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        {accessToken ? (
          isFirst ? (
            <SurveyStack />  // isFirst가 true이면 선호도 조사 화면으로 이동
          ) : (
            <AuthenticatedStack />  // isFirst가 false이면 바로 홈 화면으로 이동
          )
        ) : (
          <UnauthenticatedStack />  // 토큰이 없을 때는 로그인 화면
        )}
      </NavigationContainer>
    </QueryClientProvider>
  );
}