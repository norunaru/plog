import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';
import RecommendHeader from '../components/headers/RecommendHeader';
import ic_search from '../../assets/icons/ic_search.png';
import FriendManageCard from '../components/cards/FriendManageCard';

const ManageFriendScreen = ({navigation}) => {
  // 더미 데이터 배열 생성
  const dummyFriends = [
    {name: '이재준', level: 6, ploggingCnt: 10},
    {name: '김용훈', level: 8, ploggingCnt: 15},
    {name: '최가원', level: 5, ploggingCnt: 12},
    {name: '박지수', level: 4, ploggingCnt: 8},
    {name: '정민수', level: 7, ploggingCnt: 20},
    {name: '이상호', level: 3, ploggingCnt: 5},
  ];

  return (
    <View style={styles.container}>
      <RecommendHeader navigation={navigation} headerText={'친구관리'} />
      <View style={styles.wrap}>
        {/* Wrap the TextInput and Image */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputBox}
            placeholder="친구의 카카오 이메일을 입력하세요"
          />
          <Pressable>
            <Image source={ic_search} style={styles.searchIcon} />
          </Pressable>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20,
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                color: 'black',
                fontSize: 16,
                fontWeight: 'bold',
                marginRight: 4,
              }}>
              친구 목록
            </Text>
            {/* 친구 목록의 개수를 더미 데이터 배열 길이로 설정 */}
            <Text style={{color: '#1ECD90', fontSize: 18, fontWeight: 'bold'}}>
              {dummyFriends.length}
            </Text>
          </View>
          <Text style={{color: '#4879FF'}}>수정</Text>
        </View>

        {/* ScrollView로 친구 리스트 스크롤 가능하게 변경 */}
        <ScrollView>
          {dummyFriends.map((friend, index) => (
            <FriendManageCard
              key={index}
              name={friend.name}
              level={friend.level}
              ploggingCnt={friend.ploggingCnt}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrap: {
    padding: 20,
    paddingTop: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    paddingLeft: 16,
    paddingRight: 8,
    marginBottom: 20,
  },
  inputBox: {
    flex: 1,
    color: '#9B9BA3',
    fontSize: 15,
    paddingVertical: 12,
  },
  searchIcon: {
    width: 24,
    height: 24,
  },
});

export default ManageFriendScreen;
