import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import ChevronLeft from '../../assets/calendar/left.png';
import ChevronRight from '../../assets/calendar/right.png';
import notebookIcon from '../../assets/icons/ic_notebook.png'
import locationIcon from '../../assets/icons/ic_location.png'
import detailIcon from '../../assets/icons/ic_enter.png'
import mapImg from '../../assets/images/mapmap.png'

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
      image: mapImg,
    },
    {
      id: '2',
      date: '2024-10-03',
      title: '조용한 아침 산책 조용한 아침 산책 조용한 아침 산책 조용한 아침 산책 조용한 아침 산책 조용한 아침 산책 ',
      location: '남산 둘레길',
      image: mapImg,
    },
    {
      id: '3',
      date: '2024-09-30',
      title: '이 산책로 너무 마음에 든다',
      location: '잠실 한강 공원',
      image: mapImg,
    },
    {
      id: '4',
      date: '2024-10-01',
      title: '조용한 아침 산책',
      location: '남산 둘레길',
      image: mapImg,
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

  return (
    <View style={styles.container}>
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
          textMonthFontSize: 18,
          textMonthFontWeight: 'bold',
          textDayHeaderColor: '#9B9BA3',
          textDayHeaderFontWeight: 'bold',
          textDayFontWeight: 'semiBold',
          textDayFontSize: 15,
          textDayHeaderFontSize: 15,
          textSectionTitleColor: 'black',
        }}
      />
      <View style={styles.separator} />    
      <View style={styles.contentBox}>
        <Image source={notebookIcon} style={styles.imageBox} />
        <View style={styles.textBox}>
          <Text style={styles.selectedDateText}>{formatDate(selectedDate)}</Text>
          <Text style={styles.ploggingText}>의 플로깅</Text>
        </View>
      </View>
      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
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
                  </View>
                </View>
                <Image source={detailIcon} style={styles.detailIcon} />
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
  separator: {
    position: 'absolute',
    top: 330, 
    height: 4,
    width: '150%',
    backgroundColor: '#ECECEC',
    marginVertical: 16,
    elevation: 1,
  },  
  contentBox: {
    flexDirection: 'column',
    marginTop: 30,
    marginBottom: 20,
  },
  imageBox: {
    position: 'absolute',
    top: 2,
    left: 8,
    width: 34,
    height: 34,
  },
  textBox: {
    flexDirection: 'row',
  },
  selectedDateText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 50,
    marginTop: 4,
  },
  ploggingText: {
    fontSize: 18,
    color: 'black',
    marginTop: 4,
  },
  recordItem: {
    flexDirection: 'column',
    marginBottom: 10,
    borderRadius: 16,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    paddingBottom: 16,
  },
  image: {
    width: '100%',
    height: 160,
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
    height: 26,
    width: 26,
  },
  title: {
    width: 310,
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  locationContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  locationImage: {
    height: 22,
    width: 22,
  },
  location: {
    fontSize: 14,
    color: 'gray',
    marginLeft: 6,
  },
});

export default PloggingRecordScreen;
