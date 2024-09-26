import React, { useState } from "react";
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import likeGray from '../../assets/icons/likeGray.png';
import likeColor from '../../assets/icons/likeColor.png';


const { width } = Dimensions.get('window');
const titleText = 'A코스입니다';
const MAX_LENGTH = 23;
const displayTitleText = titleText.length > MAX_LENGTH
    ? titleText.substring(0, MAX_LENGTH) + '...'
    : titleText;

const CustomCourseRecCard = () => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <View style={styles.courseCard}>
      {/* 지도 이미지 */}
      <Image 
        source={require('../../assets/images/mapmap.png')}
        style={styles.mapImage}
      />

      {/* 코스 정보 */}
      <View style={styles.courseInfo}>
        <View style={styles.titleContainer}>
            <Text style={styles.courseTitle} numberOfLines={1}>
                  {displayTitleText}
            </Text>
            {/* 하트 이미지 */}
            <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
              <Image 
                source={
                  isLiked
                    ? likeColor
                    : likeGray
                }
                style={styles.heartImg}
              />
            </TouchableOpacity>
        </View>


          <View style={styles.infoBox}>
            <View style={styles.infoLabelContainer}>
                <Text style={styles.infoLabel}>활동 거리</Text>
            </View>
            <Text style={styles.infoValue}>3km</Text>
          </View>
          <View style={styles.infoBox}>
            <View style={styles.infoLabelContainer}>
                <Text style={styles.infoLabel}>예상 시간</Text>
            </View>
            <Text style={styles.infoValue}>2시간 ~ 2시간 30분</Text>
          </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  courseCard: {
    backgroundColor: '#FFFFFF',
    marginBottom: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    width: width,
    height: 450,
    alignSelf: 'center',
    position: 'relative',
  },
  mapImage: {
    width: '100%',
    height: 300,
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
    fontSize: 18,
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
      paddingVertical: 1, // 위아래 여백
      paddingHorizontal: 13, // 좌우 여백
      borderRadius: 15, // 모서리를 둥글게
      justifyContent: 'center', // 수직 중앙 정렬
      alignItems: 'center', // 수평 중앙 정렬
      marginBottom: 5,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: '#00A68A',
    paddingVertical: 2 ,
    paddingHorizontal: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#66666D',
    paddingHorizontal: 8,
  },
    heartImg: {
      width: 36, // 너비 설정
      height: 33,
      resizeMode: 'contain', // 비율을 유지하면서 이미지 축소
      marginLeft: 10,
    },
});

export default CustomCourseRecCard;
