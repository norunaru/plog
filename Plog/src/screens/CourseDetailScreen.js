import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';


const CourseDetailScreen = () => {
  const [isLiked, setIsLiked] = useState(false);

  const tags = [
    { id: 1, name: '도심' },
    { id: 2, name: '태그2' },
    { id: 3, name: '태그3' },
    { id: 4, name: '태그4' },
  ];

  const courses = [
    { id: 1, name: 'A코스', distance: '3km', time: '2시간 ~ 2시간 30분' },
  ];

  const course = courses[0];

  return (
    <View style={styles.container}>
      <Image 
        source={require('../../assets/images/mapmap.png')}
        style={styles.courseMap}
      />

      <Text style={styles.title}>{course.name}입니다</Text>

      <View style={styles.tagBox}>
        {tags.map(tag => (
          <View key={tag.id} style={styles.tag}>
            <Text style={styles.text}>{tag.name}</Text>
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
          <Text style={styles.infoValue}>{course.distance}</Text>
        </View>
        <View style={styles.infoItem}>
          <Image
            source={require('../../assets/icons/ic_time.png')}
            style={styles.infoIcon}
          />
          <Text style={styles.infoText}>예상시간</Text>
          <Text style={styles.infoValue}>{course.time}</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
          <Image 
            source={
              isLiked
                ? require('../../assets/icons/likeColor.png')
                : require('../../assets/icons/likeGray.png')
            }
            style={styles.like}
          />
        </TouchableOpacity>
        <View style={styles.start}>
          <Text style={styles.startText}>플로깅 시작</Text>
        </View>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  courseMap: {
    width: '100%',
    height: responsiveHeight(40),
  },
  title: {
    fontSize: responsiveFontSize(1.8),
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
    fontSize: responsiveFontSize(1.2),
    fontWeight: '500',
  },
  content: {
    marginHorizontal: 20,
    marginVertical: 20,
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
    fontSize: responsiveFontSize(1.5),
    color: '#0F1012',
    marginRight: 4,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: responsiveFontSize(1.3),
    color: '#3F3F47',
    fontWeight: '400',
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
    width: 44,
    height: 44,
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
    fontSize: responsiveFontSize(1.6),
    fontWeight: 'bold',
  },
});

export default CourseDetailScreen;