import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions, Button } from 'react-native';
import heartImage from '../../assets/icons/likeColor.png';

const { width } = Dimensions.get('window');

const CustomCourseRecDetailScreen = () => {
  return (
    <View style={styles.wrap}>
      {/* 지도 이미지 */}
      <Image
        source={{ uri: 'https://via.placeholder.com/300' }} // 임시 이미지 URL
        style={styles.mapImage}
      />
      <View style={styles.infoContainer}>
        <Text style={styles.courseTitle} numberOfLines={1}>
          A코스입니다
        </Text>

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
        <View style={styles.bottomBox}>
          <Image source={heartImage} style={styles.heartImg} />
          <Button
            title="플로깅 시작"
            onPress={() => navigation.navigate('Detail')}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: '#FFFFFF',
    height: '100%',
  },
  mapImage: {
    width: '100%',
    height: 330,
    marginBottom: 10,
  },
  infoContainer: {
    height: '66%',
    padding: 20,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 13,
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
    bottomBox: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      bottom: 100,

    }
});

export default CustomCourseRecDetailScreen;
