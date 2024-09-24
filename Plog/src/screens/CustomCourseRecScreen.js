import React from 'react';
import { ScrollView, View, StyleSheet, TouchableOpacity } from 'react-native';
import CustomCourseRecCard from '../components/CustomCourseRecCard'

const CustomCourseRecScreen = ({navigation}) => {
  return (
    <View>
      <ScrollView>
      <TouchableOpacity
          onPress={() => navigation.navigate('CustomCourseRecDetail')}
      >
        <CustomCourseRecCard />
      </TouchableOpacity>
        <CustomCourseRecCard />
        <CustomCourseRecCard />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({

});

export default CustomCourseRecScreen;
