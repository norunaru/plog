import RecommendHeader from '../components/headers/RecommendHeader';
import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ActivityIndicator, ScrollView} from 'react-native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import useStore from '../../store/store';
import {getLikedCourses} from '../API/activity/activityAPI';
import CustomCourseRecCard from '../components/CustomCourseRecCard';
import {likeCourse, unLikeCourse} from '../API/plogging/likeAPI';

export default function LikedCourseScreen({navigation}) {
  const [likedCourses, setLikedCourses] = useState([]);
  const [likedCnt, setLikedCnt] = useState(0);
  const token = useStore(state => state.accessToken);

  // 좋아요 목록을 가져오는 함수
  const getLikedTrails = async () => {
    const response = await getLikedCourses(token);
    console.log(response);
    setLikedCourses(response.likeTrailList);
    setLikedCnt(response.totalLikeCount);
  };

  // 페이지가 처음 로드될 때 좋아요 목록을 가져옴
  useEffect(() => {
    getLikedTrails();
  }, []); // 빈 배열을 사용하여 페이지가 마운트될 때만 호출

  // 좋아요/취소 시 목록을 갱신하는 함수
  const handleLikeToggle = async (courseId, isLiked) => {
    if (isLiked) {
      await unLikeCourse(courseId);
    } else {
      await likeCourse(courseId);
    }
    // 좋아요/취소 후 목록을 다시 가져옴
    await getLikedTrails();
  };

  return (
    <View style={styles.mapView}>
      <RecommendHeader
        navigation={navigation}
        headerText={'찜한 플로깅 코스'}
        style={styles.header}
      />
      <ScrollView>
        {likedCourses.map((course, i) => {
          return (
            <CustomCourseRecCard
              navigation={navigation}
              key={i}
              id={course.trail.id}
              imageURL={course.trail.image}
              likeCheck={course.likeCheck}
              area={course.trail.area}
              name={course.trail.name}
              // 좋아요/취소 이벤트 핸들러 추가
              onLikeToggle={() =>
                handleLikeToggle(course.trail.id, course.likeCheck)
              }
            />
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mapView: {
    flex: 1,
  },
  header: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '500',
    color: '#202025',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
