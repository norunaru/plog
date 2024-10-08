import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  Pressable,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import PloggingHeader from '../components/headers/PloggingHeader';

import calendar from '../../assets/icons/ic_calendar.png';
import location from '../../assets/icons/location.png';
import photoAdd from '../../assets/icons/photoAdd.png';
import distance from '../../assets/icons/distance.png';
import time from '../../assets/icons/ic_time.png';
import calorie from '../../assets/icons/ic_calorie.png';
import greenStar from '../../assets/images/greenStar.png';
import grayStar from '../../assets/images/grayStar.png';

const WritingUpdateScreen = ({ navigation, activityId }) => {
  const [rating, setRating] = useState(0);
  const [memo, setMemo] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [title, setTitle] = useState('');
  const [activityData, setActivityData] = useState({});

  // 이 화면 열리면, API 호출
  // 데이터 저장 후 화면에 표시 => 칸에 채워두기
  useEffect(() => {
    const fetchData = async () => {
      // 여기서 API 호출 가능
      setActivityData({
        id: 1,
        title: '제목 예시',
        memo: '리뷰 예시',
        score: 4,
        images: [],
      });
    };
    console.log(activityData)
    fetchData();
  }, []);

  // activityData 업데이트에 따라 필드 초기값 설정
  useEffect(() => {
    if (activityData) {
      setTitle(activityData.title || '');
      setMemo(activityData.memo || '');
      setRating(activityData.score || 0);
      setSelectedImages(activityData.images || []);
    }
  }, [activityData]);

  // 저장하기 누르면, API 호출

  
  // 별 클릭 시 호출되는 함수
  const handleStarPress = (index) => {
    setRating(index); // 클릭한 별의 인덱스(1~5)를 상태에 저장
  };

  // 이미지 선택 핸들러
  const handleSelectImages = () => {
    launchImageLibrary(
      {
        mediaType: 'photo', // 사진만 선택 가능
        selectionLimit: 3, // 최대 3개 선택 가능
      },
      (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          // 선택된 이미지를 상태에 저장
          const selectedUris = response.assets.map((asset) => asset.uri);
          setSelectedImages(selectedUris);
        }
      }
    );
  };

  return (
    <View behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <PloggingHeader navigation={navigation} headerText={'일지 수정'} />
      <ScrollView style={{ padding: 20, backgroundColor: 'white', height: '100%' }}>
        {/* 제목 입력 */}
        <TextInput
          style={styles.textInput}
          value={title} // 제목을 상태값으로 표시
          onChangeText={text => setTitle(text)} // 제목 변경 시 상태 업데이트
          multiline={true}
          maxLength={120}
          textAlignVertical="top"
        />
        
        {/* 날짜와 위치 */}
        <View style={{ flexDirection: 'row', marginVertical: 16 }}>
          <View style={{ flexDirection: 'row', marginRight: 12 }}>
            <Image style={styles.miniIcon} source={calendar} />
            <Text>2024.9.30</Text>
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Image style={styles.miniIcon} source={location} />
            <Text>잠실 한강 공원</Text>
          </View>
        </View>

        {/* 지도, 정보 박스 */}
        <View>
          <Image source={require('../../assets/images/mapmap.png')} style={styles.map} />
          <View style={styles.detail}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={distance} style={styles.icon} />
              <Text style={styles.detailBold}>총 거리</Text>
              <Text style={styles.detailThin}>3km</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={time} style={styles.icon} />
              <Text style={styles.detailBold}>총 시간</Text>
              <Text style={styles.detailThin}>2시간 15분</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={calorie} style={styles.icon} />
              <Text style={styles.detailBold}>소모 칼로리</Text>
              <Text style={styles.detailThin}>150kcal</Text>
            </View>
          </View>
        </View>

        {/* 평점 */}
        <View style={{ marginTop: 20, marginLeft: 8 }}>
          <Text style={styles.boldText}>이 코스 어땠나요?</Text>
          <View style={styles.starWrap}>
            <View style={styles.starRow}>
              {Array.from({ length: 5 }, (_, index) => (
                <TouchableOpacity key={index} onPress={() => handleStarPress(index + 1)}>
                  <Image source={index < rating ? greenStar : grayStar} style={styles.starIcon} />
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.scoreText}>{rating}점</Text>
          </View>
        </View>

        {/* 메모 */}
        <KeyboardAvoidingView style={styles.memoContainer}>
          <TextInput
            placeholder="메모를 작성하세요"
            style={styles.memo}
            multiline={true}
            scrollEnabled={true} // 내부 스크롤 가능하게 설정
            maxLength={255} // 최대 글자 수 제한
            onChangeText={(text) => setMemo(text)} // 메모 변경 시 상태 업데이트
            value={memo}
            textAlignVertical="top"
          />
          {/* 글자수 카운터 표시 */}
          <Text style={styles.charCounter}>{memo.length}/255</Text>
        </KeyboardAvoidingView>

        {/* 선택된 이미지 표시 */}
        <View style={{ flexDirection: 'row', marginBottom: 24 }}>
          {selectedImages.map((imageUri, index) => (
            <Image key={index} source={{ uri: imageUri }} style={styles.photo} />
          ))}
        </View>

        {/* 사진 선택 버튼 */}
        <Pressable onPress={handleSelectImages}>
          <Image source={photoAdd} style={styles.icon} />
        </Pressable>

        {/* 저장 버튼 */}
        <View style={styles.btnWrap}>
          <TouchableOpacity onPress={() => navigation.navigate('Tabs')}>
            <View style={styles.greenBtn}>
              <Text style={styles.btnText}>저장하기</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default WritingUpdateScreen;

const styles = StyleSheet.create({
  textInput: {
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    padding: 8,
    fontSize: 18,
  },
  miniIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  icon: {
    width: 26,
    height: 26,
    marginRight: 8,
  },
  map: {
    backgroundColor: '#DFE4E7',
    width: '100%',
    height: 265,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
  },
  detail: {
    height: 142,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderWidth: 1,
    borderColor: '#D9D9D9',
    padding: 20,
    justifyContent: 'space-between',
  },
  detailBold: {
    fontSize: 15,
    marginRight: 8,
    color: 'black',
  },
  detailThin: {
    fontSize: 13,
  },
  memoContainer: {
    position: 'relative',
    paddingBottom: 15,
  },
  memo: {
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    height: 80,
    maxHeight: 265,
    padding: 8,
    fontSize: 15,
    marginVertical: 14,
  },
  charCounter: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    fontSize: 12,
    color: '#8A8A8A',
  },
  greenBtn: {
    width: '100%',
    height: 52,
    backgroundColor: '#1ECD90',
    marginRight: 8,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: 'black',
  },
  starWrap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 28,
    height: 28,
    marginRight: 4,
  },
  scoreText: {
    marginLeft: 4,
    fontSize: 15,
    color: '#202025',
  },
  btnWrap: {
    width: '100%',
    marginTop: 29,
    marginBottom: 40,
  },
  photo: {
    backgroundColor: 'gray',
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 8,
  },
});
