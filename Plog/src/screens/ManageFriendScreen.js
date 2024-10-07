import React, {useEffect, useState} from 'react';
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
import nothing from '../../assets/images/nothing.png';
import yonghoon from '../../assets/images/yonghoon.jpg';
import {getFriendsList, searchWithEmail} from '../API/friend/friendAPI';
import useStore from '../../store/store';

const ManageFriendScreen = ({navigation}) => {
  const [typedText, setTypedText] = useState('');
  const [friend, setFriend] = useState({});
  const [isNoticeOn, setIsNoticeOn] = useState(true);
  const [friendsList, setFriendsList] = useState([]);
  const [friendsCnt, setFriendsCnt] = useState(0);

  const token = useStore(state => state.accessToken);

  const searchFriend = async () => {
    const response = await searchWithEmail(token, typedText);
    setFriend(response);
  };

  useEffect(() => {
    if (isNoticeOn) {
      const timer = setTimeout(() => {
        setIsNoticeOn(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isNoticeOn]);

  useEffect(() => {
    const fetchFriendsList = async () => {
      const response = await getFriendsList(token);
      setFriendsCnt(response.friendCount);

      // console.log('친구 리스트 응답 : ', response);
      if (response && response.friendList) {
        const friendArray = Object.values(response.friendList);
        // console.log('변환된 친구 리스트 : ', friendArray); // 배열로 변환된 데이터 확인
        setFriendsList(friendArray);
      }
    };
    fetchFriendsList();
  }, []);

  return (
    <View style={styles.container}>
      <RecommendHeader navigation={navigation} headerText={'친구관리'} />
      <View style={styles.wrap}>
        {/* Wrap the TextInput and Image */}
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputBox}
            placeholder="친구의 카카오 이메일을 입력하세요"
            onChangeText={text => setTypedText(text)}
          />
          <Pressable onPress={searchFriend}>
            <Image source={ic_search} style={styles.searchIcon} />
          </Pressable>
        </View>

        {typedText == '' && Object.keys(friend).length == 0 && (
          <View>
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
                <Text
                  style={{color: '#1ECD90', fontSize: 18, fontWeight: 'bold'}}>
                  {friendsCnt}
                </Text>
              </View>
              <Pressable onPress={() => navigation.navigate('DeleteFriend')}>
                <Text style={{color: '#4879FF'}}>수정</Text>
              </Pressable>
            </View>

            <ScrollView>
              {friendsList.map((friend, index) => (
                <FriendManageCard
                  key={index}
                  name={friend.friend.nickname}
                  level={parseInt(friend.friend.exp / 100) + 1}
                  ploggingCnt={friend.ploggingCnt}
                  email={friend.friend.email}
                  profileURL={friend.friend.profileImageUrl}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
          </View>
        )}

        {typedText !== '' && Object.keys(friend).length === 0 && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={nothing} style={{marginTop: 332}} />
          </View>
        )}

        {friend && Object.keys(friend).length !== 0 && typedText !== '' && (
          <View
            style={{
              width: '100%',
              padding: 24,
              borderRadius: 12,
              backgroundColor: '#F7F7F7',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={yonghoon}
              style={{width: 90, height: 90, borderRadius: 25, marginBottom: 8}}
            />
            <Text
              style={{
                marginBottom: 12,
                fontWeight: 'bold',
                fontSize: 18,
                color: 'black',
              }}>
              용훈쿼카
            </Text>
            <Pressable
              onPress={() => {
                setIsNoticeOn(true);
                setTypedText('');
              }}
              style={{
                borderRadius: 30,
                height: 52,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#1ECD90',
                width: '100%',
              }}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: 16,
                  color: 'white',
                }}>
                친구 추가
              </Text>
            </Pressable>
          </View>
        )}
      </View>

      {isNoticeOn ? (
        <View style={styles.noticeBox}>
          <Text style={{fontSize: 13, color: 'white'}}>
            친구가 추가되었어요
          </Text>
        </View>
      ) : null}
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
  noticeBox: {
    position: 'absolute',
    bottom: 30, // 화면 하단에서 30px 위에 위치
    alignSelf: 'center', // 가로 중앙에 배치
    paddingVertical: 16,
    paddingHorizontal: 30,
    width: 291,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 30,
  },
});

export default ManageFriendScreen;
