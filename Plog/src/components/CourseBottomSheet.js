import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const CourseBottomSheet = () => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(responsiveHeight(15))).current;

  const toggleSheet = () => {
    if (expanded) {
      // 바텀 시트 닫기
      Animated.timing(animation, {
        toValue: responsiveHeight(16.5),
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setExpanded(false);
      });
    } else {
      // 바텀 시트 열기
      setExpanded(true);
      Animated.timing(animation, {
        toValue: SCREEN_HEIGHT * 0.5,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const courses = [
    { id: 1, name: 'A코스', distance: '3km', time: '2시간 ~ 2시간 30분' },
    { id: 2, name: 'B코스', distance: '5km', time: '3시간 ~ 3시간 30분' },
    { id: 3, name: 'C코스', distance: '7km', time: '4시간 ~ 4시간 30분' },
    { id: 4, name: 'D코스', distance: '8km', time: '5시간 ~ 5시간 30분' },
    { id: 5, name: 'E코스', distance: '9km', time: '6시간 ~ 6시간 30분' },
    { id: 6, name: 'F코스', distance: '10km', time: '7시간 ~ 7시간 30분' },
    { id: 7, name: 'G코스', distance: '11km', time: '8시간 ~ 8시간 30분' },
    // 추가 코스 데이터...
  ];

  // 표시할 코스들: 확장 여부에 따라 결정
  const displayedCourses = expanded ? courses : courses.slice(0, 1);

  return (
    <Animated.View
      style={[
        styles.container,
        { height: animation },
      ]}
    >
      <TouchableOpacity onPress={toggleSheet}>
        <View style={styles.dragHandle} />
      </TouchableOpacity>
      <ScrollView
        style={styles.courseList}
        scrollEnabled={expanded}
        showsVerticalScrollIndicator={false}
      >
        {displayedCourses.map(course => (
          <View key={course.id} style={styles.courseItem}>
            <Text style={styles.courseName}>{course.name}</Text>
            {/* 코스 상세 정보 */}
            <View style={styles.content}>
              {/* 활동거리 */}
              <View style={styles.infoItem}>
                <Image
                  source={require('../../assets/icons/distance.png')}
                  style={styles.infoIcon}
                />
                <Text style={styles.infoText}>활동거리</Text>
                <Text style={styles.infoValue}>{course.distance}</Text>
              </View>
              {/* 예상시간 */}
              <View style={styles.infoItem}>
                <Image
                  source={require('../../assets/icons/ic_time.png')}
                  style={styles.infoIcon}
                />
                <Text style={styles.infoText}>예상시간</Text>
                <Text style={styles.infoValue}>{course.time}</Text>
              </View>
            </View>
            <View style={styles.separator} />
          </View>
        ))}
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: responsiveHeight(3),
    width: responsiveWidth(80),
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    elevation: 3,
    overflow: 'hidden',
  },
  dragHandle: {
    width: 40,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginVertical: 10,
  },
  courseList: {
    flexGrow: 1,
  },
  courseItem: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  courseName: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: '#0F1012',
    marginBottom: 10,
  },
  content: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
  },
});

export default CourseBottomSheet;
