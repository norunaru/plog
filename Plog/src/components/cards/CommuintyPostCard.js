import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import location from '../../../assets/icons/location.png';

export default function CommunityPostCard({
  name,
  profile,
  expLevel,
  courseName,
  plogTimes,
  memo,
  images, // 이미지 객체 배열이 props로 넘어옴
  image, // 단일 이미지 url
  title,
}) {
  // images 배열에서 savedUrl만 추출하고, 마지막에 image를 추가
  const imageUrls = images.map(img => img.savedUrl);
  const updatedImages = [...imageUrls, image];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    console.log(image);
    console.log(updatedImages); // 수정된 이미지 배열 확인
  }, []);

  // 이미지 배열에서 선택된 인덱스에 해당하는 이미지로 변경
  const handleImageChange = () => {
    setSelectedImageIndex(prevIndex =>
      prevIndex === updatedImages.length - 1 ? 0 : prevIndex + 1,
    );
  };

  return (
    <View style={styles.wrap}>
      <View style={styles.header}>
        <Image style={styles.profileImg} source={{uri: profile}} />
        <View style={styles.infoWrap}>
          <View style={[styles.userInfo, {alignItems: 'center'}]}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.userData}>
              {parseInt(expLevel / 100) + 1}레벨,
              {plogTimes}번의 플로깅
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            {/* <Image source={location} style={styles.pin} /> */}
            <Text style={styles.location}>대전광역시 유성구</Text>
          </View>
        </View>
      </View>
      <View style={styles.imgsWrap}>
        <TouchableOpacity onPress={handleImageChange}>
          <Image
            source={{uri: updatedImages[selectedImageIndex]}} // 선택된 이미지 보여주기
            style={styles.postImg}
            resizeMode="cover"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.memoWrap}>
        <Text style={styles.postTitle}>{title}</Text>
        <Text style={styles.memoText}>{memo}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    width: '100%',
    padding: 16,
    marginRight: 8,
    marginBottom: 12,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1,
  },
  profileImg: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 8,
    backgroundColor: 'black',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'black',
    marginRight: 3,
  },
  levelBadge: {
    paddingHorizontal: 4,
    paddingVertical: 1,
    backgroundColor: '#BAF0D7',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 12,
    color: '#00A68A',
    marginBottom: 4,
  },
  infoWrap: {
    justifyContent: 'center',
    textAlign: 'center',
  },
  userInfo: {
    flexDirection: 'row',
    marginBottom: 4,
    textAlign: 'center',
  },
  userData: {
    fontSize: 10,
    color: 'black',
    marginLeft: 2,
    marginBottom: 4,
  },
  pin: {
    width: 11,
    height: 12,
    marginRight: 4,
  },
  location: {
    fontSize: 10,
    color: '#787878',
  },
  header: {
    flexDirection: 'row',
  },
  postImg: {
    width: '100%',
    height: 256,
    backgroundColor: 'black',
  },
  imgsWrap: {
    marginTop: 9,
    marginBottom: 14,
  },
  memoWrap: {},
  memoText: {
    fontSize: 14,
    color: 'black',
  },
  noImageWrap: {
    width: '100%',
    height: 256,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noImageText: {
    fontSize: 16,
    color: '#787878',
  },
  postTitle: {
    fontSize: 16,
    color: 'black',
    marginBottom: 4,
    fontWeight: 'bold',
  },
});
