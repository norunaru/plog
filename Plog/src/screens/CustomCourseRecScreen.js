import React, {useEffect, useState} from 'react';
import {ScrollView, View, Image, Text, StyleSheet, TouchableOpacity, ActivityIndicator} from 'react-native';
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
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const response = await getRecommendedCourses(token);
    console.log('추천 코스 리스트 : ', response);
    setCourses(response);
    setLoading(false)
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

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#1ECD90" />
      </View>
    );
  }

  return (
    <View
      style={{
        // marginBottom: 50,
        flex: 1,
        backgroundColor: '#fff'
      }}>
      <PloggingHeader
        navigation={navigation}
        headerText={`${nickName}님에게 추천드려요`}
      />

      <ScrollView>
        <ScrollView>
          {courses.length === 0 ? (
            // courses 배열이 비어있을 때 표시할 뷰
            <View style={styles.noCourse}>
              <Image 
                source={require('../../assets/icons/img_login.png')}
                style={styles.noCourseImg}/>
              <Text style={styles.noText}>현재 추천할 코스가 없습니다. {'\n'}코스가 업데이트될 때까지 기다려주세요.</Text>
            </View>
          ) : (
            // courses 배열에 데이터가 있을 때 표시할 뷰
            courses.map((course, index) => (
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
            ))
          )}
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  noCourse: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 190,
  },
  noCourseImg: {
    width: 300,
    height: 220,
    marginBottom: 30,
  },
  noText: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',      // 텍스트 중앙 정렬
    lineHeight: 30,           // 줄 간 간격 설정
    flexWrap: 'wrap', 
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

export default CustomCourseRecScreen;
