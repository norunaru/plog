import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import CustomCourseRecCard from '../components/CustomCourseRecCard';
import PloggingHeader from '../components/headers/PloggingHeader';

const CustomCourseRecScreen = ({ navigation }) => {
  const recommendedCourses = [1, 2, 3];

  const handleCourseDetailPress = (courseId) => {
    navigation.navigate('CourseDetail', { courseId });
  };

  return (
    <View>
      <PloggingHeader navigation={navigation} headerText={'최승빈님에게 추천드려요'} />
      
      <ScrollView>
        {recommendedCourses.map((courseId) => (
          <TouchableOpacity
            key={courseId}
            onPress={() => handleCourseDetailPress(courseId)}
          >
            <CustomCourseRecCard />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default CustomCourseRecScreen;
