import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import MyPageScreen from './src/screens/MyPageScreen';
import DetailScreen from './src/screens/DetailScreen';
import CommunityScreen from './src/screens/CommunityScreen';
import RecommendScreen from './src/screens/RecommendScreen';
import CourseDetailScreen from './src/screens/CourseDetailScreen';
import CustomCourseRecScreen from './src/screens/CustomCourseRecScreen';
import PloggingScreen from './src/screens/PloggingScreen';
import {Image} from 'react-native';

import homeBlack from './assets/icons/homeBlack.png';
import homeGray from './assets/icons/homeGray.png';
import communityBlack from './assets/icons/communityBlack.png';
import communityGray from './assets/icons/communityGray.png';
import MyBlack from './assets/icons/myBlack.png';
import MyGray from './assets/icons/myGray.png';
import WritingScreen from './src/screens/WritingScreen';
import LoginScreen from './src/screens/LoginScreen';
import ViewReviewScreen from './src/screens/ViewReviewScreen';

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
        <Stack.Screen
          name="CustomCourseRec"
          component={CustomCourseRecScreen}
          options={{
            title: 'OO님에게 추천드려요',
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="CourseDetail"
          component={CourseDetailScreen}
          options={{
            title: '코스 상세정보',
            headerTitleAlign: 'center',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Plogging"
          component={PloggingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Writing" component={WritingScreen} />
        <Stack.Screen
          name="Recommend"
          component={RecommendScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Review" component={ViewReviewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
// import React, {useState} from 'react';
// import {
//   login,
//   logout,
//   getProfile as getKakaoProfile,
//   shippingAddresses as getKakaoShippingAddresses,
//   unlink,
// } from '@react-native-seoul/kakao-login';
// import LoginScreen from './src/screens/LoginScreen';

// const App = () => {
//   const [result, setResult] = useState('');

//   const signInWithKakao = async () => {
//     try {
//       const token = await login();
//       console.log('카카오 로그인 토큰: ', token);
//       setResult(JSON.stringify(token));
//     } catch (err) {
//       console.error('login err', err);
//     }
//   };

//   const signOutWithKakao = async () => {
//     try {
//       const message = await logout();

//       setResult(message);
//     } catch (err) {
//       console.error('signOut error', err);
//     }
//   };

//   const getProfile = async () => {
//     try {
//       const profile = await getKakaoProfile();

//       setResult(JSON.stringify(profile));
//     } catch (err) {
//       console.error('signOut error', err);
//     }
//   };

//   const getShippingAddresses = async () => {
//     try {
//       const shippingAddresses = await getKakaoShippingAddresses();

//       setResult(JSON.stringify(shippingAddresses));
//     } catch (err) {
//       console.error('signOut error', err);
//     }
//   };

//   const unlinkKakao = async () => {
//     try {
//       const message = await unlink();

//       setResult(message);
//     } catch (err) {
//       console.error('signOut error', err);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.resultContainer}>
//         <ScrollView>
//           <Text>{result}</Text>
//           <View style={{height: 100}} />
//         </ScrollView>
//       </View>
//       <Pressable
//         style={styles.button}
//         onPress={() => {
//           signInWithKakao();
//         }}>
//         <Text style={styles.text}>카카오 로그인</Text>
//       </Pressable>
//       <Pressable style={styles.button} onPress={() => getProfile()}>
//         <Text style={styles.text}>프로필 조회</Text>
//       </Pressable>
//       <Pressable style={styles.button} onPress={() => getShippingAddresses()}>
//         <Text style={styles.text}>배송주소록 조회</Text>
//       </Pressable>
//       <Pressable style={styles.button} onPress={() => unlinkKakao()}>
//         <Text style={styles.text}>링크 해제</Text>
//       </Pressable>
//       <Pressable style={styles.button} onPress={() => signOutWithKakao()}>
//         <Text style={styles.text}>카카오 로그아웃</Text>
//       </Pressable>
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     height: '100%',
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     paddingBottom: 100,
//   },
//   resultContainer: {
//     flexDirection: 'column',
//     width: '100%',
//     padding: 24,
//   },
//   button: {
//     backgroundColor: '#FEE500',
//     borderRadius: 40,
//     borderWidth: 1,
//     width: 250,
//     height: 40,
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     marginTop: 10,
//   },
//   text: {
//     textAlign: 'center',
//   },
// });
