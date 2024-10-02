import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import CustomCourseRecCard from '../components/CustomCourseRecCard'
import RecommendHeader from '../components/headers/RecommendHeader';

const CustomCourseRecScreen = ({navigation}) => {
  const handleCourseDetailPress = (courseId) => {
    // 코스 디테일 화면으로 이동하면서 courseId를 전달
    navigation.navigate('CourseDetail', { courseId });
  };


  return (
    <View>
      <RecommendHeader navigation={navigation} headerText={'OO님에게 추천드려요'} />
    
      <ScrollView>
      <TouchableOpacity
          onPress={() => handleCourseDetailPress(1)}
      >
        <CustomCourseRecCard />
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => handleCourseDetailPress(2)}
      >
        <CustomCourseRecCard />
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => handleCourseDetailPress(3)}
      >
        <CustomCourseRecCard />
      </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default CustomCourseRecScreen;
