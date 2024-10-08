import React, {useState} from 'react';
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
import {launchImageLibrary} from 'react-native-image-picker'; // 이미지 선택을 위한 패키지 추가
import { postActivity } from '../API/activity/activityAPI';
import Modal from '../components/Modal';
import useStore from '../../store/store';

import calendar from '../../assets/icons/ic_calendar.png';
import location from '../../assets/icons/location.png';
import photoAdd from '../../assets/icons/photoAdd.png';
import distance from '../../assets/icons/distance.png';
import time from '../../assets/icons/ic_time.png';
import calorie from '../../assets/icons/ic_calorie.png';
import greenStar from '../../assets/images/greenStar.png';
import grayStar from '../../assets/images/grayStar.png';

const WritingScreen = ({navigation}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [titleValue, setTitleValue] = useState('');
  const [memo, setMemo] = useState('');
  const [selectedImages, setSelectedImages] = useState([]); 
  const id = useStore((state) => state.id);
  const accessToken = useStore((state) => state.accessToken);

  const writingSavePress = async () => {
    // 임의 데이터 (id, token 제외)
    const memberId = id;
    const trailId = 1;
    const lat = [37.5172, 37.5175, 37.5178];
    const lon = [127.0473, 127.0476, 127.0480];
    const review = memo;
    const score = parseFloat(rating);
    const title = titleValue;
    const totalTime = parseFloat(160.0);
    const totalDistance = parseFloat(3.0);
    const totalKcal = parseFloat(150.0);
    const locationName = '잠실 한강 공원';
    const token = accessToken;
  
    const imageFiles = selectedImages.map((uri, index) => {
      return {
        uri,
        type: 'image/jpeg',
        name: `image_${index}.jpg`,  // 고유 파일명
      };
    });

    // 일지 기록 post 요청
    try {
      await postActivity({
        memberId,
        trailId,
        lat,
        lon,
        totalTime,
        review,
        score,
        title,
        totalDistance,
        totalKcal,
        locationName,
        images: imageFiles, // 이미지 리스트
        token,
      });
      navigation.navigate('Tabs');
    } catch (error) {
      console.error('저장 실패:', error.response ? error.response.data : error.message);
    }
  };  

  // 별 클릭 시 호출되는 함수
  const handleStarPress = index => {
    setRating(index); // 클릭한 별의 인덱스(1~5)를 상태에 저장
  };

  // 이미지 선택 핸들러
  const handleSelectImages = () => {
    launchImageLibrary(
      {
        mediaType: 'photo', // 사진만 선택 가능
        selectionLimit: 3, // 최대 3개 선택 가능
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorMessage) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else {
          // 선택된 이미지를 상태에 저장
          const selectedUris = response.assets.map(asset => asset.uri);
          setSelectedImages(selectedUris);
        }
      },
    );
  };

  return (
    <ScrollView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      {/* 모달 */}
      {isModalOpen ? (
        <Modal
          onClose={() => setIsModalOpen(false)}
          boldText={'작성을 중단하시겠어요?'}
          subText={
            '지금 나가면 내용이 저장되지 않으며 추후 마이페이지에서 작성이 가능해요'
          }
          whiteBtnFn={() => setIsModalOpen(false)}
          greenBtnFn={() => navigation.navigate('Tabs')}
          greenBtnText={'끝내기'}
          whiteBtnText={'계속하기'}
        />
      ) : null}

      <SafeAreaView
        style={{padding: 20, backgroundColor: 'white', height: '100%'}}
      >
        <TextInput
          style={styles.textInput}
          placeholder="제목을 입력해 주세요"
          placeholderTextColor="#D9D9D9"
          multiline={true}
          maxLength={120}
          textAlignVertical="top"
          onChangeText={text => setTitleValue(text)}
        />
        <View style={{flexDirection: 'row', marginVertical: 16}}>
          <View style={{flexDirection: 'row', marginRight: 12}}>
            <Image style={styles.miniIcon} source={calendar} />
            <Text>2024.9.30</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Image style={styles.miniIcon} source={location} />
            <Text>잠실 한강 공원</Text>
          </View>
        </View>
        {/* 지도, 정보 박스 */}
        <View>
          <Image
            source={require('../../assets/images/mapmap.png')}
            style={styles.map}
          />
          <View style={styles.detail}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={distance} style={styles.icon} />
              <Text style={styles.detailBold}>총 거리</Text>
              <Text style={styles.detailThin}>3km</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={time} style={styles.icon} />
              <Text style={styles.detailBold}>총 시간</Text>
              <Text style={styles.detailThin}>2시간 15분</Text>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={calorie} style={styles.icon} />
              <Text style={styles.detailBold}>소모 칼로리</Text>
              <Text style={styles.detailThin}>150kcal</Text>
            </View>
          </View>
        </View>

        <View style={{marginTop: 20, marginLeft: 8}}>
          <Text style={styles.boldText}>이 코스 어땠나요?</Text>
          {/* starWrap */}
          <View style={styles.starWrap}>
            <View style={styles.starRow}>
              {Array.from({length: 5}, (_, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleStarPress(index + 1)}>
                  <Image
                    source={index < rating ? greenStar : grayStar}
                    style={styles.starIcon}
                  />
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
            onChangeText={text => setMemo(text)}
            value={memo}
            textAlignVertical="top"
          />
          {/* 글자수 카운터 표시 */}
          <Text style={styles.charCounter}>
            {memo.length}/255
          </Text>
        </KeyboardAvoidingView>

        <View style={{flexDirection: 'row', marginBottom: 24}}>
          {/* 선택한 이미지들을 표시 */}
          {selectedImages.map((imageUri, index) => (
            <Image key={index} source={{uri: imageUri}} style={styles.photo} />
          ))}
        </View>

        {/* 사진 선택 버튼 */}
        <Pressable onPress={handleSelectImages}>
          <Image source={photoAdd} style={styles.icon} />
        </Pressable>

        <View style={styles.btnWrap}>
          <TouchableOpacity onPress={() => setIsModalOpen(true)}>
            <View style={styles.whiteBtn}>
              <Text style={styles.btnText}>다음에 작성</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => writingSavePress()}>
            <View style={styles.greenBtn}>
              <Text style={styles.btnText}>저장하기</Text>
            </View>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default WritingScreen;

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
  whiteBtn: {
    width: 122,
    height: 52,
    borderColor: '#1ECD90',
    borderWidth: 1,
    marginRight: 8,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 16,
    fontWeight: 600,
  },
  greenBtn: {
    width: 205,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 29,
  },
  photo: {
    backgroundColor: 'gray',
    width: 70,
    height: 70,
    borderRadius: 12,
    marginRight: 8,
  },
});
