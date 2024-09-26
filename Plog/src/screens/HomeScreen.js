import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import TopBar from '../components/TopBar';
import Weather from '../components/Weather';
import running from '../../assets/images/running.png';
import locationCourse from '../../assets/icons/locationCourse.png';
import music from '../../assets/icons/ic_music.png';
import LoginScreen from './LoginScreen';

export default function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={{flex: 1, padding: 20, paddingTop: 80}}>
      <TopBar />
      <View style={styles.Wrapper}>
        <Weather />
        <View style={styles.BottomWrapper}>
          <TouchableOpacity
            style={styles.GreenBox}
            onPress={() => navigation.navigate('CustomCourseRec')}>
            <Text style={styles.heading}>
              맞춤형{'\n'}플로깅 코스{'\n'}추천받기
            </Text>
            <Image source={running} style={styles.bg} />
          </TouchableOpacity>
          <View style={styles.RightColumn}>
            <TouchableOpacity 
              style={styles.SmallBox}
              onPress={() => navigation.navigate('Recommend')}>
              <Image style={styles.icon} source={locationCourse} />
              <Text style={styles.heading2}>
                내 위치 기반{'\n'}플로깅 코스 확인하기
              </Text>
            </TouchableOpacity>
            <View style={styles.SmallBox}>
              <Image style={styles.icon} source={music} />
              <Text style={styles.heading2}>
                AI가 추천해주는{'\n'}플레이리스트{' '}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.heading}>이런 행사도 열려요</Text>

      <Text>Home Screen</Text>
      <Button
        title="to detail page"
        onPress={() => navigation.navigate('Detail')}
      />
      <Button
        title="일지 작성으로"
        onPress={() => navigation.navigate('Writing', {pathId: 1})} //동적 라우팅, 값 넘긴 뒤 받는 쪽에서 이거로 다른 스크린 보여줌
      />
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <Button title="Review" onPress={() => navigation.navigate('Review')} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  Wrapper: {
    width: '100%',
    marginBottom: 8,
  },
  BottomWrapper: {
    width: '100%',
    marginTop: 8,
    flexDirection: 'row',
  },
  GreenBox: {
    flex: 1,
    marginRight: 8,
    borderRadius: 16,
    padding: 16,
    height: 206,
    backgroundColor: '#E7F7EF',
    borderWidth: 1,
    borderColor: '#1ECD90',
    position: 'relative',
  },
  RightColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  SmallBox: {
    width: '100%',
    height: 99,
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 8,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  bg: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  heading: {
    fontSize: 18, // h1 스타일과 유사한 폰트 크기
    fontWeight: 'bold', // 텍스트 굵기
    color: 'black', // 텍스트 색상
    marginBottom: 10, // 텍스트와 이미지 사이의 간격
  },
  heading2: {
    fontSize: 15, // h1 스타일과 유사한 폰트 크기
    fontWeight: 'bold', // 텍스트 굵기
    color: 'black', // 텍스트 색상
    marginBottom: 10, // 텍스트와 이미지 사이의 간격
  },
  icon: {
    width: 29,
    height: 29,
  },
});
