import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import PloggingHeader from '../components/headers/PloggingHeader';
import ChevronLeft from '../../assets/calendar/left.png';
import ChevronRight from '../../assets/calendar/right.png';
import notebookIcon from '../../assets/icons/ic_notebook.png';
import locationIcon from '../../assets/icons/ic_location.png';
import detailIcon from '../../assets/icons/ic_enter.png';
import starIcon from '../../assets/icons/ic_star.png';
import mapImg from '../../assets/images/mapmap.png';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

LocaleConfig.locales['ko'] = {
  monthNames: [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ],
  monthNamesShort: [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ],
  dayNames: ['일', '월', '화', '수', '목', '금', '토'],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘'
};

LocaleConfig.defaultLocale = 'ko';

const PloggingRecordScreen = ({ navigation }) => {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const ploggingData = [
    {
      id: '1',
      date: '2024-10-03',
      title: '이 산책로 너무 마음에 든다',
      location: '잠실 한강 공원',
      image: mapImg,
      star: '4',
    },
    {
      id: '2',
      date: '2024-10-03',
      title: '조용한 아침 산책 조용한 아침 산책 조용한 아침 산책 조용한 아침 산책 조용한 아침 산책 조용한 아침 산책 ',
      location: '남산 둘레길',
      image: mapImg,
      star: '4',
    },
    {
      id: '3',
      date: '2024-09-30',
      title: '이 산책로 너무 마음에 든다',
      location: '잠실 한강 공원',
      image: mapImg,
      star: '2',
    },
    {
      id: '4',
      date: '2024-10-01',
      title: '조용한 아침 산책',
      location: '남산 둘레길',
      image: mapImg,
      star: '4',
    },
  ];

  const filteredData = ploggingData.filter(item => item.date === selectedDate);

  const getMarkedDates = () => {
    const markedDates = {};

    ploggingData.forEach(item => {
      markedDates[item.date] = {
        marked: true,
        dotColor: '#1ECD90',
      };
    });

    markedDates[selectedDate] = {
      selected: true,
      selectedColor: '#1ECD90',
      dotColor: selectedDate === today ? 'white' : '#1ECD90',
    };

    return markedDates;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일`;
  };

  const handleCourseDetailPress = (courseId) => {
    // 코스 디테일 화면으로 이동하면서 courseId를 전달
    navigation.navigate('PloggingRecordDetail', { courseId });
  };

  return (
    <View style={styles.container}>
      <PloggingHeader navigation={navigation} headerText={'나의 플로깅 기록'} />
      <View>
        <Calendar
          onDayPress={(day) => setSelectedDate(day.dateString)}
          markedDates={getMarkedDates()}
          monthFormat={'M월'}
          renderArrow={(direction) =>
            direction === 'left' ? (
              <Image source={ChevronLeft} style={styles.arrowIcon} />
            ) : (
              <Image source={ChevronRight} style={styles.arrowIcon} />
            )
          }
          enableSwipeMonths={true}
          theme={{
            todayTextColor: '#1ECD90',
            monthTextColor: 'black',
            textMonthFontSize: responsiveFontSize(2.1),
            textMonthFontWeight: 'bold',
            textDayHeaderColor: '#9B9BA3',
            textDayHeaderFontWeight: 'bold',
            textDayFontWeight: 'semiBold',
            textDayFontSize: responsiveFontSize(1.7),
            textDayHeaderFontSize: responsiveFontSize(1.7),
            textSectionTitleColor: 'black',
          }}
        />
      </View>
      <View style={styles.separator} />
      <View style={styles.contentBox}>
        <Image source={notebookIcon} style={styles.imageBox} />
        <View style={styles.textBox}>
          <Text style={styles.selectedDateText}>{formatDate(selectedDate)}</Text>
          <Text style={styles.ploggingText}>의 플로깅</Text>
        </View>
      </View>

      {filteredData.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>이 날은 진행한 플로깅이 없습니다.</Text>
        </View>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleCourseDetailPress(item.id)}>
              <View style={styles.recordItem}>
                <Image source={item.image} style={styles.image} />
                <View style={styles.contContainer}>
                  <View style={styles.textContainer}>
                    <Text style={styles.title}>
                      {item.title.length > 23 ? item.title.slice(0, 23) + '...' : item.title}
                    </Text>
                    <View style={styles.locationContainer}>
                      <Image source={locationIcon} style={styles.locationImage} />
                      <Text style={styles.location}>{item.location}</Text>
                      <Image source={starIcon} style={styles.starImage} />
                      <Text style={styles.location}>평점 {item.star}</Text>
                    </View>
                  </View>
                  <Image source={detailIcon} style={styles.detailIcon} />
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  arrowIcon: {
    width: responsiveWidth(1.8),
    height: responsiveHeight(0.9),
    marginHorizontal: responsiveWidth(13.5),
  },
  separator: {
    position: 'absolute',
    top: 368,
    height: 3,
    width: '100%',
    backgroundColor: '#ECECEC',
    marginVertical: 18,
    elevation: 1,
  },
  contentContainer: {
    paddingHorizontal: 20,
  },
  contentBox: {
    flexDirection: 'column',
    marginTop: 34,
    marginBottom: 22,
    paddingHorizontal: 20,
  },
  imageBox: {
    position: 'absolute',
    top: responsiveHeight(0.4),
    left: responsiveWidth(7.6),
    width: responsiveWidth(8.4),
    height: responsiveHeight(3.0),
  },
  textBox: {
    flexDirection: 'row',
  },
  selectedDateText: {
    fontSize: responsiveFontSize(1.9),
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 50,
    marginTop: 4,
  },
  ploggingText: {
    fontSize: responsiveFontSize(1.9),
    color: 'black',
    marginTop: 4,
  },
  noDataContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 60,
  },
  noDataText: {
    fontSize: responsiveFontSize(1.8),
    color: 'gray',
  },
  recordItem: {
    flexDirection: 'column',
    marginBottom: 10,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingBottom: 16,
    marginHorizontal: 20,
  },
  image: {
    width: '100%',
    height: responsiveHeight(20),
    marginBottom: 10,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  contContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 20,
  },
  detailIcon: {
    height: responsiveHeight(2.9),
    width: responsiveWidth(2.6),
  },
  title: {
    width: responsiveWidth(76),
    marginTop: 10,
    fontSize: responsiveFontSize(1.6),
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  locationImage: {
    height: responsiveHeight(2.2),
    width: responsiveWidth(4.2),
  },
  starImage: {
    height: responsiveHeight(2),
    width: responsiveWidth(4.6),
    marginLeft: 14,
  },
  location: {
    fontSize: responsiveFontSize(1.5),
    color: 'gray',
    marginLeft: 6,
  },
});

export default PloggingRecordScreen;
