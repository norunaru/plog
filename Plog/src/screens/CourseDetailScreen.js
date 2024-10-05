import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import RecommendHeader from '../components/headers/RecommendHeader';
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


  if (!courseData) {
    return (
      <View style={styles.loaderContainer}>
        <Text>로딩 중...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <RecommendHeader navigation={navigation} headerText={'코스 상세정보'} />
      <Image
        source={require('../../assets/images/mapmap.png')}
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
          <Text style={styles.infoValue}>{courseData.time}</Text>
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
  courseMap: {
    width: '100%',
    height: responsiveHeight(40),
  },
  title: {
    fontSize: responsiveFontSize(2.2),
    color: '#0F1012',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  tagBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: 20,
    marginTop: 4,
  },
  tag: {
    backgroundColor: '#E7F7EF',
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 24,
  },
  text: {
    color: '#017978',
    fontSize: responsiveFontSize(1.5),
    fontWeight: '500',
  },
  content: {
    marginHorizontal: 20,
    marginVertical: 14,
  },
  infoItem: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#D9D9D9',
    paddingLeft: 16,
  },
  infoIcon: {
    width: 26,
    height: 26,
    marginRight: 8,
  },
  infoText: {
    fontSize: responsiveFontSize(1.8),
    color: '#0F1012',
    marginRight: 4,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: responsiveFontSize(1.6),
    color: '#3F3F47',
    fontWeight: '400',
    marginLeft: 3,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    position: 'absolute',
    bottom: 40,
    width: '100%',
  },
  like: {
    width: 40,
    height: 40,
  },
  start: {
    flex: 1,
    height: 52,
    backgroundColor: '#1ECD90',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 30,
  },
  startText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(1.9),
    fontWeight: 'bold',
  },
});

export default CourseDetailScreen;
