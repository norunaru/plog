import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import PloggingDetailHeader from '../components/headers/PloggingDetailHeader';
import locationIcon from '../../assets/icons/ic_location.png';
import distanceIcon from '../../assets/icons/distance.png';
import timeIcon from '../../assets/icons/ic_time.png';
import calorieIcon from '../../assets/icons/ic_calorie.png';
import calendarIcon from '../../assets/icons/ic_calendar.png';
import starIcon from '../../assets/icons/ic_star.png';

const PloggingRecordDetailScreen = ({navigation}) => {
  const course = {
    title: '제목 어쩌구',
    date: '2024.09.20',
    location: '잠실 한강 공원',
    star: 4,
    distance: '3km',
    time: '2시간 15분 (10:19 - 11:42)',
    calorie: '150kcal',
    memo: '메모 어쩌구저쩌구 메모 어쩌구저쩌구 메모 어쩌구저쩌구 메모 어쩌구저쩌구',
    image: require('../../assets/images/mapmap.png'),
  };

  const onShare = async () => {
    try {
      await Share.share({
        message: `내 플로깅 기록: ${course.title} (${course.location}, ${course.date}). 총 거리: ${course.distance}, 총 시간: ${course.time}, 소모 칼로리: ${course.calorie}.`,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <PloggingDetailHeader
        navigation={navigation}
        headerText={'나의 플로깅 기록'}
      />

      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{course.title}</Text>
        <View style={styles.locationContainer}>
          <Image source={calendarIcon} style={styles.smallIcon} />
          <Text style={styles.date}>{course.date}</Text>
          <Image source={locationIcon} style={styles.smallIcon} />
          <Text style={styles.location}>{course.location}</Text>
          <Image source={starIcon} style={styles.smallIcon} />
          <Text style={styles.star}>평점 {course.star}</Text>
        </View>

        <View style={styles.recordItem}>
          <Image source={course.image} style={styles.mapImage} />
          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Image source={distanceIcon} style={styles.infoIcon} />
              <Text style={styles.infoText}>총 거리</Text>
              <Text style={styles.infoValue}>{course.distance}</Text>
            </View>
            <View style={styles.infoItem}>
              <Image source={timeIcon} style={styles.infoIcon} />
              <Text style={styles.infoText}>총 시간</Text>
              <Text style={styles.infoValue}>{course.time}</Text>
            </View>
            <View style={styles.infoItem}>
              <Image source={calorieIcon} style={styles.infoIcon} />
              <Text style={styles.infoText}>소모 칼로리</Text>
              <Text style={styles.infoValue}>{course.calorie}</Text>
            </View>
          </View>
        </View>

        <Text style={styles.memo}>{course.memo}</Text>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/image2001.png')}
            style={styles.image}
          />
          <Image
            source={require('../../assets/images/image2001.png')}
            style={styles.image}
          />
          <Image
            source={require('../../assets/images/image2001.png')}
            style={styles.image}
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.whiteBtn} onPress={onShare}>
            <Text style={styles.shareText}>공유하기</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.greenBtn}
            onPress={() => navigation.navigate('Plogging')}>
            <Text style={styles.againText}>이 코스 한번 더 하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bodyContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: '#0F1012',
    marginVertical: 20,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  date: {
    fontSize: responsiveFontSize(1.6),
    color: '#3F3F47',
    marginRight: 6,
  },
  smallIcon: {
    width: responsiveWidth(4.2),
    height: responsiveHeight(1.8),
    marginHorizontal: 5,
  },
  location: {
    fontSize: responsiveFontSize(1.6),
    color: '#3F3F47',
    marginRight: 6,
  },
  star: {
    fontSize: responsiveFontSize(1.6),
    color: '#3F3F47',
  },
  recordItem: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 20,
  },
  mapImage: {
    width: '100%',
    height: responsiveHeight(31),
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  infoContainer: {
    marginVertical: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  infoIcon: {
    width: responsiveWidth(5.6),
    height: responsiveHeight(2.8),
    marginRight: 8,
  },
  imageContainer: {
    flexDirection: 'row',
    width: responsiveWidth(10.6),
    marginVertical: 20,
    marginHorizontal: 10,
  },
  image: {
    width: 110,
    height: 110,
    marginRight: 8,
    borderRadius: 12,
  },
  infoText: {
    fontSize: responsiveFontSize(1.7),
    color: '#0F1012',
    fontWeight: '500',
    marginRight: 8,
  },
  infoValue: {
    fontSize: responsiveFontSize(1.7),
    color: '#3F3F47',
  },
  memo: {
    fontSize: responsiveFontSize(1.7),
    color: '#0F1012',
    paddingHorizontal: 10,
    fontWeight: 'semibold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 40,
    left: 20,
    width: '100%',
  },
  whiteBtn: {
    width: 122,
    height: responsiveHeight(6.3),
    backgroundColor: 'white',
    borderColor: '#1ECD90',
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareText: {
    color: '#1ECD90',
    fontSize: responsiveFontSize(1.9),
    fontWeight: 'bold',
  },
  greenBtn: {
    flex: 1,
    height: responsiveHeight(6.3),
    backgroundColor: '#1ECD90',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  againText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(1.9),
    fontWeight: 'bold',
  },
});

export default PloggingRecordDetailScreen;
