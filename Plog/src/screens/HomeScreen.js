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
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import TopBar from '../components/TopBar';
import Weather from '../components/Weather';
import running from '../../assets/images/running.png';
import locationCourse from '../../assets/icons/locationCourse.png';
import music from '../../assets/icons/ic_music.png';

export default function HomeScreen({navigation}) {
  return (
    <SafeAreaView style={styles.safeArea}>
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
      <Button
        title="LoginMain"
        onPress={() => navigation.navigate('LoginMain')}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    padding: responsiveWidth(5),
    paddingTop: responsiveHeight(10),
  },
  Wrapper: {
    width: '100%',
    marginBottom: responsiveHeight(1),
  },
  BottomWrapper: {
    width: '100%',
    marginTop: responsiveHeight(1),
    flexDirection: 'row',
  },
  GreenBox: {
    flex: 1,
    marginRight: responsiveWidth(2),
    borderRadius: 16,
    padding: responsiveWidth(4),
    height: responsiveHeight(25),
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
    height: responsiveHeight(12),
    backgroundColor: 'white',
    borderRadius: 16,
    paddingHorizontal: responsiveWidth(3),
    paddingVertical: responsiveHeight(1.3),
  },
  bg: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: responsiveWidth(23),
    height: responsiveHeight(17),
  },
  heading: {
    fontSize: responsiveFontSize(2.4),
    fontWeight: 'bold', // 텍스트 굵기
    color: 'black', // 텍스트 색상
    marginBottom: responsiveHeight(1),
  },
  heading2: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: 'bold', // 텍스트 굵기
    color: 'black', // 텍스트 색상
    marginTop: responsiveHeight(4),
    marginLeft: responsiveWidth(0.5),
  },
  icon: {
    width: 29,
    height: 29,
    position: 'absolute',
    marginLeft: responsiveWidth(2.5),
    marginTop: responsiveHeight(1.5),
  },
});
