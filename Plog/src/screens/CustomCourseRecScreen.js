import React, {useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet, TouchableOpacity} from 'react-native';
import CustomCourseRecCard from '../components/CustomCourseRecCard';
import PloggingHeader from '../components/headers/PloggingHeader';
import useStore from '../../store/store';
import {getRecommendedCourses} from '../API/activity/activityAPI';
import {likeCourse, unLikeCourse} from '../API/plogging/likeAPI';
import {useFocusEffect} from '@react-navigation/native';

const CustomCourseRecScreen = ({navigation}) => {
  const nickName = useStore(state => state.nickname);
  const token = useStore(state => state.accessToken);

  const [courses, setCourses] = useState([]);

  const getData = async () => {
    const response = await getRecommendedCourses(token);
    console.log('추천 코스 리스트 : ', response);
    setCourses(response);
  };

  useEffect(() => {
    getData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, []),
  );

  const handleLikeToggle = async (courseId, isLiked) => {
    if (isLiked) {
      await unLikeCourse(courseId);
    } else {
      await likeCourse(courseId);
    }

    await getData();
  };

  return (
    <View
      style={{
        marginBottom: 50,
      }}>
      <PloggingHeader
        navigation={navigation}
        headerText={`${nickName}님에게 추천드려요`}
      />

      <ScrollView>
        <ScrollView>
          {courses.map((course, index) => {
            return (
              // 여기에 return 문을 추가해야 합니다.
              <TouchableOpacity key={index}>
                <CustomCourseRecCard
                  id={course.id}
                  name={course.title}
                  likeCheck={course.like}
                  area={course.area}
                  time={course.time}
                  navigation={navigation}
                  imageURL={course.imageUri}
                  onLikeToggle={() => {
                    handleLikeToggle(course.id, course.like);
                  }}
                />
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CustomCourseRecScreen;
