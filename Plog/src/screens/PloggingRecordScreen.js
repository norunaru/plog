import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import ChevronLeft from '../../assets/calendar/left.png';
import ChevronRight from '../../assets/calendar/right.png';

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

const PloggingRecordScreen = () => {
  const today = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(today);

  const ploggingData = [
    {
      id: '1',
      date: '2024-10-03',
      title: '이 산책로 너무 마음에 든다',
      location: '잠실 한강 공원',
      image: 'https://example.com/plogging-route-1.png',
    },
    {
      id: '2',
      date: '2024-10-03',
      title: '조용한 아침 산책',
      location: '남산 둘레길',
      image: 'https://example.com/plogging-route-2.png',
    },
    {
      id: '3',
      date: '2024-09-30',
      title: '이 산책로 너무 마음에 든다',
      location: '잠실 한강 공원',
      image: 'https://example.com/plogging-route-1.png',
    },
    {
      id: '4',
      date: '2024-10-01',
      title: '조용한 아침 산책',
      location: '남산 둘레길',
      image: 'https://example.com/plogging-route-2.png',
    },
  ];

  const filteredData = ploggingData.filter(item => item.date === selectedDate);

  const getMarkedDates = () => {
    const markedDates = {};

    ploggingData.forEach(item => {
      markedDates[item.date] = {
        marked: true,
        dotColor: '#1ECD90', // 기본 점 색상
      };
    });

    // 선택된 날짜에 대한 설정
    markedDates[selectedDate] = {
      selected: true,
      selectedColor: '#1ECD90', // 선택된 날짜의 배경색
      dotColor: '#fff', // 선택된 날짜의 점 색상
    };

    return markedDates;
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={(day) => setSelectedDate(day.dateString)}
        markedDates={getMarkedDates()} // 모든 날짜에 대해 기록이 있는 경우 점 표시
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
          todayTextColor: '#1ECD90', // 오늘 날짜의 글자 색을 #1ECD90으로
          monthTextColor: 'black',
          textMonthFontSize: 18,
          textMonthFontWeight: 'bold',
          textDayHeaderColor: '#9B9BA3', // 요일 색상
          textDayHeaderFontWeight: 'bold',
          textDayFontWeight: 'semiBold',
          textDayFontSize: 15,
          textDayHeaderFontSize: 15,
          textSectionTitleColor: 'black',
        }}
      />
      <Text style={styles.selectedDateText}>{selectedDate} 의 플로깅</Text>
      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <View style={styles.recordItem}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.location}>{item.location}</Text>
            </View>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  arrowIcon: {
    width: 8,
    height: 9,
    marginHorizontal: 45,
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  recordItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: 'gray',
  },
});

export default PloggingRecordScreen;
