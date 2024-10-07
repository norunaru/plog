import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView, // ImageBackground 추가
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
import {getAttractions} from '../API/attraction/attractionAPI';
import useStore from '../../store/store';

export default function HomeScreen({navigation}) {
  const token = useStore(state => state.accessToken);
  const [attractions, setAttractions] = useState({});

  useEffect(() => {
    const getAttractionsData = async () => {
      const response = await getAttractions(token);
      setAttractions(response);
      console.log(response);
    };
    getAttractionsData();
  }, []);

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
      <Text style={styles.heading}>플로깅하기 좋은 관광지</Text>

      {/* attractions.image가 존재하는 경우 배경 이미지로 설정 */}
      {attractions.image && (
        <ImageBackground
          source={{uri: attractions.image}}
          style={styles.attractionCard}
          imageStyle={{borderRadius: 16}} // 이미지의 모서리를 둥글게 만듦
          resizeMode="cover">
          <View style={styles.overlay} />
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{attractions.address}</Text>
          </View>
          <View>
            <Text style={styles.type}>{attractions.type}</Text>
            <Text style={styles.attractionName}>{attractions.name}</Text>
          </View>
        </ImageBackground>
      )}

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
    fontSize: responsiveFontSize(1.8), // h1 스타일과 유사한 폰트 크기
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
  attractionCard: {
    width: '100%',
    position: 'relative',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 16,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 4,
    marginBottom: 60,
    alignSelf: 'flex-start',
  },
  badgeText: {
    fontSize: 11,
    color: 'white',
  },
  type: {
    fontSize: 13,
    color: 'white',
    marginBottom: 2,
  },
  attractionName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject, // 전체 영역을 덮는 오버레이
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 검정색 반투명으로 밝기를 50% 조정
    borderRadius: 16, // 이미지와 동일한 모서리 둥글기
  },
});
