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
import { useNavigation } from '@react-navigation/native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const CourseBottomSheet = ({ locations, selectedCourse, resetSelectedCourse }) => {
  const [expanded, setExpanded] = useState(false);
  const animation = useRef(new Animated.Value(130)).current;
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();

  const toggleSheet = () => {
    if (expanded) {
      // 바텀 시트 닫기
      Animated.timing(animation, {
        toValue: 130,
        duration: 300,
        useNativeDriver: false,
      }).start(() => {
        setExpanded(false);
        scrollViewRef.current?.scrollTo({ y: 0, animated: false });
      });
    } else {
      // 바텀 시트 열기
      resetSelectedCourse();
      setExpanded(true);
      Animated.timing(animation, {
        toValue: SCREEN_HEIGHT * 0.5,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleCourseDetailPress = (courseId) => {
    navigation.navigate('CourseDetail', { courseId });
  };

  const convertTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
  
    if (hours > 0) {
      return `${hours}시간 ${remainingMinutes}분`;
    } else {
      return `${remainingMinutes}분`;
    }
  };

  const formatArea = (meters) => {
    const km = meters / 100;
    const roundedKm = Math.round(km * 10) / 10; // 소수점 첫째 자리까지 반올림
    return `${roundedKm}km`;
  };

  return (
    <Animated.View style={[styles.container, { height: animation }]}>
      <TouchableOpacity onPress={toggleSheet}>
        <View style={styles.dragHandle} />
      </TouchableOpacity>
      <ScrollView
        ref={scrollViewRef}
        style={styles.courseList}
        scrollEnabled={expanded}
        showsVerticalScrollIndicator={false}
      >
        {selectedCourse && !expanded ? (
          // 마커를 눌렀을 때 선택된 코스만 보여줌
          <TouchableOpacity onPress={() => handleCourseDetailPress(selectedCourse.id)}>
            <View key={selectedCourse.id} style={styles.courseItem}>
              <Text style={styles.courseName}>{selectedCourse.title}</Text>
              <View style={styles.content}>
                <View style={styles.infoItem}>
                  <Image
                    source={require('../../assets/icons/distance.png')}
                    style={styles.infoIcon}
                  />
                  <Text style={styles.infoText}>활동거리</Text>
                  <Text style={styles.infoValue}>{formatArea(selectedCourse.area)}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Image
                    source={require('../../assets/icons/ic_time.png')}
                    style={styles.infoIcon}
                  />
                  <Text style={styles.infoText}>예상시간</Text>
                  <Text style={styles.infoValue}>{convertTime(selectedCourse.time)}</Text>
                </View>
              </View>
              <View style={styles.separator} />
            </View>
          </TouchableOpacity>
        ) : (
          // 바텀 시트를 열면 모든 코스를 보여줌
          locations.map((location) => (
            <TouchableOpacity
              key={location.id}
              style={styles.courseItem}
              onPress={() => handleCourseDetailPress(location.id)}
            >
              <Text style={styles.courseName}>{location.title}</Text>
              <View style={styles.content}>
                <View style={styles.infoItem}>
                  <Image
                    source={require('../../assets/icons/distance.png')}
                    style={styles.infoIcon}
                  />
                  <Text style={styles.infoText}>활동거리</Text>
                  <Text style={styles.infoValue}>{formatArea(location.area)}</Text>
                </View>
                <View style={styles.infoItem}>
                  <Image
                    source={require('../../assets/icons/ic_time.png')}
                    style={styles.infoIcon}
                  />
                  <Text style={styles.infoText}>예상시간</Text>
                  <Text style={styles.infoValue}>{convertTime(location.time)}</Text>
                </View>
              </View>
              <View style={styles.separator} />
            </TouchableOpacity>
          ))
        )}
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
    marginTop: responsiveHeight(0.2),
  },
  separator: {
    height: 1,
    backgroundColor: '#9B9BA3',
    marginVertical: 10,
  },
});

export default CourseBottomSheet;
