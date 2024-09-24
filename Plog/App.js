import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import MyPageScreen from './src/screens/MyPageScreen';
import DetailScreen from './src/screens/DetailScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {Image} from 'react-native';

import homeBlack from './assets/icons/homeBlack.png';
import homeGray from './assets/icons/homeGray.png';
import communityBlack from './assets/icons/communityBlack.png';
import communityGray from './assets/icons/communityGray.png';
import MyBlack from './assets/icons/myBlack.png';
import MyGray from './assets/icons/myGray.png';
import WritingScreen from './src/screens/WritingScreen';

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

// Root Stack Navigator 정의 (Tab Navigator와 Stack Navigator 결합)
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* 탭 네비게이터 사용되는 스크린 */}
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{headerShown: false}} // 탭 네비게이터 상단에 헤더 표시 안 함
        />
        {/* 스택 네비게이터에만 존재하는 스크린 */}
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Writing" component={WritingScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
