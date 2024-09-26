import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import CustomCourseRecCard from '../components/CustomCourseRecCard'

const CustomCourseRecScreen = ({navigation}) => {
  return (
    <View>
      <ScrollView>
      <TouchableOpacity
          onPress={() => navigation.navigate('CourseDetail')}
      >
        <CustomCourseRecCard />
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => navigation.navigate('CourseDetail')}
      >
        <CustomCourseRecCard />
      </TouchableOpacity>
      <TouchableOpacity
          onPress={() => navigation.navigate('CourseDetail')}
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
