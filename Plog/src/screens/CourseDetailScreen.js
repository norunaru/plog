import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import DetailHeader from '../components/headers/DetailHeader';
import { detailCourse } from '../API/plogging/detailAPI';
import { likeCourse, unLikeCourse } from '../API/plogging/likeAPI';

const CourseDetailScreen = ({route, navigation}) => {
  const { courseId } = route.params;
  const [isLiked, setIsLiked] = useState(false);
  const [courseData, setCourseData] = useState(null);

  useEffect(() => {
    const CourseDetail = async () => {
      try {
        const response  = await detailCourse(courseId);
        setCourseData(response.data);
        setIsLiked(response.data.like);
      } catch (error) {
        console.error("Error:", error)
      }
    };
    
    CourseDetail();
  }, [courseId]);

  const handleLikePress = async () => {
    try {
      if (isLiked) {
        await unLikeCourse(courseId);
      } else {
        await likeCourse(courseId);
      }
      setIsLiked(!isLiked);
    } catch (error) {
      console.error('like Error:', error);
    }
  };

  const convertTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    if (hours > 0) {
      return `${hours}시간 ${remainingMinutes}분`;
    } else {
      return `${remainingMinutes}분`;
    }
  };


  if (!courseData) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1ECD90" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <DetailHeader 
        navigation={navigation} 
        headerText={'코스 상세정보'} 
        style={styles.header}/>
      <Image
        source={courseData.imageUri ? { uri: courseData.imageUri } : require('../../assets/images/map_default.png')}
        style={styles.courseMap}
      />

      <Text style={styles.title}>{courseData.title}</Text>

      <View style={styles.tagBox}>
        {courseData.tags.split(' ').map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.text}>{tag.replace('#', '')}</Text>
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
          <Text style={styles.infoValue}>{courseData.area}</Text>
        </View>
        <View style={styles.infoItem}>
          <Image
            source={require('../../assets/icons/ic_time.png')}
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>예상시간</Text>
          <Text style={styles.infoValue}>{convertTime(courseData.time)}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleLikePress}>
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
  header: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '500',
    color: '#202025',
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
  loaderContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CourseDetailScreen;
