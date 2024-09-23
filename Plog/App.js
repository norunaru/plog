import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import MyPageScreen from './src/screens/MyPageScreen';
import DetailScreen from './src/screens/DetailScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import RecommendScreen from './src/screens/RecommendScreen';
import Icon from 'react-native-vector-icons/Ionicons';

// Tab Navigator와 Stack Navigator 생성
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Tab Navigator 정의
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'MyPage') {
            iconName = 'person';
          } else if (route.name === 'Community') {
            iconName = 'chatbubbles';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="MyPage" component={MyPageScreen} />
      <Tab.Screen name="Community" component={CommunityScreen} />
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
        <Stack.Screen name="Recommend" component={RecommendScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
