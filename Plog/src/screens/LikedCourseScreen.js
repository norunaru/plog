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

  useEffect(() => {
    const getLikedTrails = async () => {
      const response = await getLikedCourses(token);
      console.log(response);
      setLikedCourses(response.likeTrailList);
      setLikedCnt(response.totalLikeCount);
    };

    getLikedTrails();
  }, [likedCourses]);

  const likeFn = async id => {
    likeCourse(id);
    getLikedTrails();
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
              key={i}
              id={course.trail.id}
              imageURL={course.trail.image}
              likeCheck={course.likeCheck}
              area={course.trail.area}
              name={course.trail.name}
              likeFn={likeFn}
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
