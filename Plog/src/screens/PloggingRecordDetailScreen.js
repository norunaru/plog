import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
  ScrollView
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import PloggingDetailHeader from '../components/headers/PloggingDetailHeader';
import { getActivityData } from '../API/activity/activityAPI';
import { shareActivity } from '../API/community/communityAPI';
import useStore from '../../store/store';

import locationIcon from '../../assets/icons/ic_location.png';
import distanceIcon from '../../assets/icons/distance.png';
import timeIcon from '../../assets/icons/ic_time.png';
import calorieIcon from '../../assets/icons/ic_calorie.png';
import calendarIcon from '../../assets/icons/ic_calendar.png';
import starIcon from '../../assets/icons/ic_star.png';

const PloggingRecordDetailScreen = ({route, navigation}) => {
  const [course, setCourse] = useState([]);
  const [courseId, setCourseId] = useState(null);
  const [createDate, setCreateDate] = useState([]);
  const [isNoticeOn, setIsNoticeOn] = useState(false);
  const accessToken = useStore((state) => state.accessToken);
  const activityId = route.params.activityId;

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const activityData = await getActivityData(activityId, accessToken); // API 호출
        setCourse(activityData);
        setCourseId(activityData.trailId)
        // creationDate가 유효한지 체크
        if (activityData.creationDate) {
          const date = new Date(activityData.creationDate); // 날짜 변환
          if (!isNaN(date.getTime())) { // 유효한 날짜인지 확인
            setCreateDate(date.toISOString().split('T')[0]);
          } else {
            console.error('유효하지 않은 날짜:', activityData.creationDate);
          }
        } else {
          console.error('creationDate가 없습니다.');
        }
      } catch (error) {
        console.error('기록 조회 에러:', error);
      }
    };

    fetchActivityData();
  }, [activityId, accessToken]);

  const handleSharePress = async () => {
    try {
      console.log('Access Token:', accessToken);
      await shareActivity({
        id: activityId,
        token: accessToken,
      }); // API 호출
      setIsNoticeOn(true);

    } catch (error) {
      console.error('일지 공유 에러:', error);
    }
  };
  
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${year}.${month}.${day}`;
  };

  const formatTime = (secs) => {
    const hours = parseInt(secs / 3600, 10);
    const minutes = parseInt((secs % 3600) / 60, 10);
    return `${hours}시간 ${minutes}분`;
  };

  useEffect(() => {
    if (isNoticeOn) {
      const timer = setTimeout(() => {
        setIsNoticeOn(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isNoticeOn]);

  return (
    <View style={styles.container}>
      <PloggingDetailHeader navigation={navigation} headerText={'일지 조회'} activityId={activityId}/>

      <ScrollView style={styles.bodyContainer}>
        <Text style={styles.title}>{course.title}</Text>
        <View style={styles.locationContainer}>
          <Image source={calendarIcon} style={styles.smallIcon} />
          <Text style={styles.date}>{createDate}</Text>
          <Image source={locationIcon} style={styles.smallIcon} />
          <Text style={styles.location}>{course.locationName}</Text>
          <Image source={starIcon} style={styles.smallIcon} />
          <Text style={styles.star}>평점 {course.score}</Text>
        </View>

        <View style={styles.recordItem}>

          {course.image ? (
            <Image source={{ uri: course.image }} style={styles.mapImage} />
          ) : (
            <Image source={require('../../assets/images/map_default.png')} style={styles.mapImage} />
          )}

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Image source={distanceIcon} style={styles.infoIcon} />
              <Text style={styles.infoText}>총 거리</Text>
              <Text style={styles.infoValue}>{course.totalDistance}km</Text>
            </View>
            <View style={styles.infoItem}>
              <Image source={timeIcon} style={styles.infoIcon} />
              <Text style={styles.infoText}>총 시간</Text>
              <Text style={styles.infoValue}>{formatTime(course.totalTime)}</Text>
            </View>
            <View style={styles.infoItem}>
              <Image source={calorieIcon} style={styles.infoIcon} />
              <Text style={styles.infoText}>소모 칼로리</Text>
              <Text style={styles.infoValue}>{course.totalKcal}kcal</Text>
            </View>
          </View>
        </View>

        <Text style={styles.memo}>{course.review}</Text>
        <View style={styles.imageContainer}>
          {/* activityImages map 으로 출력 */}
          {Array.isArray(course.images) && course.images.length > 0 &&
            course.images.filter(image => image).map((image, index) => (
              <Image
                key={index}
                source={{ uri: image }}
                style={styles.image}
              />
            ))
          }

        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.whiteBtn} onPress={handleSharePress}>
          <Text style={styles.shareText}>공유하기</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.greenBtn}
          onPress={() => navigation.navigate('Plogging', { courseId })}>
          <Text style={styles.againText}>이 코스 한번 더 하기</Text>
        </TouchableOpacity>
      </View>
        
      {isNoticeOn ? (
        <View style={styles.noticeBox}>
          <Text style={{fontSize: responsiveFontSize(1.8), color: 'white', paddingBottom: 3}}>
            일지가 커뮤니티에 공유되었어요
          </Text>
        </View>
      ) : null}
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
  },
  smallIcon: {
    width: 20,
    height: 20,
    marginHorizontal: 5,
  },
  location: {
    fontSize: responsiveFontSize(1.6),
    color: '#3F3F47',
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
    height: responsiveHeight(30),
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
    width: 26,
    height: 26,
    marginRight: 8,
  },
  imageContainer: {
    flexDirection: 'row',
    width: 106,
    marginVertical: 20,
    marginHorizontal: 10,
  },
  image: {
    width: 106,
    height: 106,
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginHorizontal: 10,
    width: '90%',
    marginBottom: 40,
  },
  whiteBtn: {
    width: 140,
    height: 65,
    backgroundColor: 'white',
    borderColor: '#1ECD90',
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
  },
  shareText: {
    color: '#1ECD90',
    fontSize: responsiveFontSize(1.9),
    fontWeight: 'bold',
  },
  greenBtn: {
    flex: 1,
    height: 65,
    backgroundColor: '#1ECD90',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15,
    width: '100%',
  },
  againText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(1.9),
    fontWeight: 'bold',
  },
  noticeBox: {
    position: 'absolute',
    bottom: responsiveHeight(7),
    alignSelf: 'center',
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(10),
    width: responsiveWidth(80),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 30,
    zIndex: 100, 
  },
});

export default PloggingRecordDetailScreen;
