import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import likeGray from '../../assets/icons/likeGray.png';
import likeColor from '../../assets/icons/likeColor.png';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const {width} = Dimensions.get('window');

const CustomCourseRecCard = ({
  navigation,
  id,
  name,
  area,
  imageURL,
  likeCheck,
  onLikeToggle, // 좋아요/취소 핸들러를 props로 받음
  time,
}) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CourseDetail', {courseId: id})}>
      <View style={styles.courseCard}>
        <Image source={{uri: imageURL}} style={styles.mapImage} />
        <View style={styles.courseInfo}>
          <View style={styles.titleContainer}>
            <Text style={styles.courseTitle} numberOfLines={1}>
              {name}
            </Text>
            <TouchableOpacity onPress={onLikeToggle}>
              <Image
                source={likeCheck ? likeColor : likeGray}
                style={styles.heartImg}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.infoBox}>
            <View style={styles.infoLabelContainer}>
              <Text style={styles.infoLabel}>활동 영역</Text>
            </View>
            <Text style={styles.infoValue}>{area}㎢</Text>
          </View>
          <View style={styles.infoBox}>
            <View style={styles.infoLabelContainer}>
              <Text style={styles.infoLabel}>예상 시간</Text>
            </View>
            <Text style={styles.infoValue}>
              {parseInt(time / 60)}시간 {time % 60}분
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  courseCard: {
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
    width: width,
    height: 450,
    alignSelf: 'center',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: responsiveHeight(32),
    borderRadius: 16,
    marginBottom: 10,
  },
  courseInfo: {
    marginTop: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseTitle: {
    fontSize: responsiveFontSize(2.1),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 13,
    flex: 1,
  },
  infoBox: {
    flexDirection: 'row',
  },
  infoLabelContainer: {
    backgroundColor: '#E7F7EF',
    paddingHorizontal: 13,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoLabel: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '500',
    color: '#00A68A',
    paddingVertical: 2,
    paddingHorizontal: 1,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: responsiveFontSize(1.6),
    color: '#66666D',
    paddingVertical: 1.8,
    paddingHorizontal: 8,
  },
  heartImg: {
    width: responsiveWidth(13),
    height: responsiveHeight(3.6),
    resizeMode: 'contain',
    marginLeft: 10,
  },
});

export default CustomCourseRecCard;
