import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import RecommendHeader from '../components/headers/RecommendHeader';

const CourseDetailScreen = ({route, navigation}) => {
  const [isLiked, setIsLiked] = useState(false);

  const tags = [
    {id: 1, name: '도심'},
    {id: 2, name: '태그2'},
    {id: 3, name: '태그3'},
    {id: 4, name: '태그4'},
  ];

  const courses = [
    {id: 1, name: 'A코스', distance: '3km', time: '2시간 ~ 2시간 30분'},
  ];

  const course = courses[0];

  // 추후 아이디로 api 요청
  const {courseId} = route.params;

  return (
    <View style={styles.container}>
      <RecommendHeader navigation={navigation} headerText={'코스 상세정보'} />
      <Image
        source={require('../../assets/images/mapmap.png')}
        style={styles.courseMap}
      />

      <Text style={styles.title}>{courseId}입니다</Text>

      <View style={styles.tagBox}>
        {tags.map(tag => (
          <View key={tag.id} style={styles.tag}>
            <Text style={styles.text}>{tag.name}</Text>
          </View>
        ))}
      </View>

      <View style={styles.content}>
        <View style={styles.infoItem}>
          <Image
            source={require('../../assets/icons/distance.png')}
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>활동거리</Text>
          <Text style={styles.infoValue}>{course.distance}</Text>
        </View>
        <View style={styles.infoItem}>
          <Image
            source={require('../../assets/icons/ic_time.png')}
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>예상시간</Text>
          <Text style={styles.infoValue}>{course.time}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
          <Image
            source={
              isLiked
                ? require('../../assets/icons/likeColor.png')
                : require('../../assets/icons/likeGray.png')
            }
            style={styles.like}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.start}
          onPress={() => navigation.navigate('Plogging')}>
          <Text style={styles.startText}>플로깅 시작</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  courseMap: {
    width: '100%',
    height: responsiveHeight(40), // 반응형 높이
  },
  title: {
    fontSize: responsiveFontSize(2.5), // 반응형 텍스트 크기
    color: '#0F1012',
    fontWeight: 'bold',
    marginTop: responsiveHeight(2), // 반응형 마진
    marginBottom: responsiveHeight(1), // 반응형 마진
    marginHorizontal: responsiveWidth(5), // 반응형 가로 마진
  },
  tagBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: responsiveWidth(5), // 반응형 가로 마진
    marginTop: responsiveHeight(1), // 반응형 세로 마진
  },
  tag: {
    backgroundColor: '#E7F7EF',
    marginRight: responsiveWidth(2), // 반응형 마진
    marginBottom: responsiveHeight(1), // 반응형 마진
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(3), // 반응형 패딩
    height: responsiveHeight(3.5), // 반응형 높이
  },
  text: {
    color: '#017978',
    fontSize: responsiveFontSize(1.8), // 반응형 텍스트 크기
    fontWeight: '500',
  },
  content: {
    marginHorizontal: responsiveWidth(5), // 반응형 가로 마진
    marginVertical: responsiveHeight(2), // 반응형 세로 마진
  },
  infoItem: {
    height: responsiveHeight(8), // 반응형 높이
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: responsiveHeight(1.5), // 반응형 세로 마진
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#D9D9D9',
    paddingLeft: responsiveWidth(4), // 반응형 패딩
  },
  infoIcon: {
    width: responsiveWidth(7), // 반응형 아이콘 크기
    height: responsiveWidth(7), // 반응형 아이콘 크기
    marginRight: responsiveWidth(2), // 반응형 마진
  },
  infoText: {
    fontSize: responsiveFontSize(2), // 반응형 텍스트 크기
    color: '#0F1012',
    marginRight: responsiveWidth(1), // 반응형 마진
    fontWeight: '500',
  },
  infoValue: {
    fontSize: responsiveFontSize(1.8), // 반응형 텍스트 크기
    color: '#3F3F47',
    fontWeight: '400',
    marginLeft: responsiveWidth(1), // 반응형 마진
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: responsiveWidth(8), // 반응형 패딩
    position: 'absolute',
    bottom: responsiveHeight(5), // 반응형 위치
    width: '100%',
  },
  like: {
    width: responsiveWidth(12), // 반응형 아이콘 크기
    height: responsiveWidth(12), // 반응형 아이콘 크기
  },
  start: {
    flex: 1,
    height: responsiveHeight(7), // 반응형 높이
    backgroundColor: '#1ECD90',
    borderRadius: responsiveWidth(10), // 반응형 둥근 모서리
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: responsiveWidth(5), // 반응형 마진
  },
  startText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(2.2), // 반응형 텍스트 크기
    fontWeight: 'bold',
  },
});

export default CourseDetailScreen;
