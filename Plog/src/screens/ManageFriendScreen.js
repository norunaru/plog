import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';
import RecommendHeader from '../components/headers/RecommendHeader';
import ic_search from '../../assets/icons/ic_search.png';
import FriendManageCard from '../components/cards/FriendManageCard';
import nothing from '../../assets/images/nothing.png';
import {
  addFriend,
  getFriendsList,
  searchWithEmail,
} from '../API/friend/friendAPI';
import useStore from '../../store/store';
import {useFocusEffect} from '@react-navigation/native';

const ManageFriendScreen = ({navigation}) => {
  const [typedText, setTypedText] = useState('');
  const [friends, setFriends] = useState([]); // 배열로 변경
  const [isNoticeOn, setIsNoticeOn] = useState(false);
  const [friendsList, setFriendsList] = useState([]);
  const [friendsCnt, setFriendsCnt] = useState(0);

  const token = useStore(state => state.accessToken);
  useEffect(() => {
    if (typedText == '') setFriends([]);
  }, [typedText]);

  const searchFriend = async () => {
    const response = await searchWithEmail(token, typedText);
    if (response && response.length > 0) {
      setFriends(response); // 배열을 상태로 설정
    } else {
      setFriends([]); // 친구가 없을 경우 빈 배열
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchFriendsList(); // 화면에 포커스될 때 친구 목록을 다시 불러옴
    }, []),
  );

  const fetchFriendsList = async () => {
    const response = await getFriendsList(token);
    setFriendsCnt(response.friendCount);

    if (response && response.friendList) {
      const friendArray = Object.values(response.friendList);
      setFriendsList(friendArray);
    }
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
    fetchFriendsList();
  }, []);

  return (
    <View style={styles.container}>
      <RecommendHeader navigation={navigation} headerText={'팔로잉'} />
      <View style={styles.wrap}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.inputBox}
            placeholder="카카오 이메일을 입력하세요"
            onChangeText={text => setTypedText(text)}
            onSubmitEditing={searchFriend} // 입력을 완료하면 자동으로 검색
            autoCapitalize="none"
            value={typedText}
          />
          <Pressable onPress={searchFriend}>
            <Image source={ic_search} style={styles.searchIcon} />
          </Pressable>
        </View>

        {typedText === '' && (
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
                  팔로잉 목록
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
                  level={parseInt(friend.friend.expLevel / 100) + 1}
                  ploggingCnt={friend.ploggingCnt}
                  email={friend.friend.email}
                  profileURL={friend.friend.profileImageUrl}
                  resizeMode="cover"
                />
              ))}
            </ScrollView>
          </View>
        )}

        {typedText !== '' && friends.length === 0 && (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={nothing} style={{marginTop: 332}} />
            <Text>친구를 찾을 수 없습니다.</Text>
          </View>
        )}

        {friends.length > 0 && typedText !== '' && (
          <View
            style={{
              width: '100%',
              padding: 24,
              borderRadius: 12,
              backgroundColor: '#F7F7F7',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* 배열의 첫 번째 친구만 표시 */}
            <View style={{alignItems: 'center'}}>
              <Image
                source={{uri: friends[0].profileImageUrl}} // 첫 번째 원소의 이미지 URL
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 25,
                  marginBottom: 8,
                }}
              />
              <Text
                style={{
                  marginBottom: 12,
                  fontWeight: 'bold',
                  fontSize: 18,
                  color: 'black',
                }}>
                {friends[0].nickName} {/* 첫 번째 원소의 닉네임 */}
              </Text>
              <Pressable
                onPress={async () => {
                  await addFriend(token, friends[0].id); // 첫 번째 원소의 id를 사용하여 친구 추가
                  setIsNoticeOn(true);
                  setTypedText('');
                  setFriends([]); // 검색 결과 초기화
                  await fetchFriendsList(); // 친구 추가 후 목록 갱신
                }}
                style={{
                  borderRadius: 30,
                  height: 52,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#1ECD90',
                  width: 287,
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
          </View>
        )}
      </View>

      {isNoticeOn && (
        <View style={styles.noticeBox}>
          <Text style={{fontSize: 13, color: 'white'}}>
            친구가 추가되었어요
          </Text>
        </View>
      )}
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
