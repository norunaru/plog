import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import TopBar from '../components/TopBar';
import Weather from '../components/Weather';
import locationCourse from '../../assets/icons/locationCourse.png';
import music from '../../assets/icons/ic_music.png';
import LoginScreen from './LoginScreen';
import running from '../../assets/images/img_home_running.png';
import FriendCard from '../components/cards/FriendCard';
import chevronRight from '../../assets/icons/Union.png';
import {
  login,
  logout,
  getProfile as getKakaoProfile,
  shippingAddresses as getKakaoShippingAddresses,
  unlink,
} from '@react-native-seoul/kakao-login';
import RedModal from '../components/RedModal';
import {getPloggingCnt} from '../API/activity/activityAPI';
import useStore from '../../store/store';
import {getFriendsList} from '../API/friend/friendAPI';
import {useFocusEffect} from '@react-navigation/native';

export default function MyPageScreen({navigation}) {
  const token = useStore(state => state.accessToken);
  const nickName = useStore(state => state.nickname);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ploggingCnt, setPloggingCnt] = useState(111);
  const [friendsList, setFriendsList] = useState([]);
  const lvl = parseInt(useStore(state => state.exp) / 100);
  const clearTokens = useStore(state => state.clearTokens);
  const clearUser = useStore(state => state.clearUser);

  const fetchFriendsList = async () => {
    const response = await getFriendsList(token);
    // console.log('친구 리스트 응답 : ', response);
    if (response && response.friendList) {
      const friendArray = Object.values(response.friendList);
      // console.log('변환된 친구 리스트 : ', friendArray); // 배열로 변환된 데이터 확인
      setFriendsList(friendArray);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchFriendsList(); // 화면에 포커스될 때 친구 목록을 다시 불러옴
    }, []),
  );

  useEffect(() => {
    const fetchPloggingCnt = async () => {
      const response = await getPloggingCnt(token);
      // console.log(response);
      setPloggingCnt(response.totalCount);
    };

    fetchPloggingCnt();
    fetchFriendsList();
  }, []);

  useEffect(() => {
    if (friendsList) {
      // console.log(friendsList);
    }
  }, [friendsList]);

  const signOutWithKakao = async () => {
    try {
      const message = await logout();
      console.log('로그아웃 성공');
    } catch (err) {
      console.error('signOut error', err);
    }
  };

  const handleLogOut = async () => {
    setIsModalOpen(false);
    try {
      // 카카오 로그아웃 처리
      await signOutWithKakao();
      console.log('카카오 로그아웃 성공');
    } catch (err) {
      console.error('카카오 로그아웃 에러:', err);
    }

    // 토큰과 사용자 정보 초기화
    await clearTokens();
    await clearUser();

    navigation.navigate('LoginMain');
  };

  return (
    <View style={{flex: 1}}>
      {isModalOpen && (
        <RedModal
          boldText={'정말 로그아웃 하시겠어요?'}
          whiteBtnText={'취소'}
          subText={''}
          redBtnText={'로그아웃'}
          onClose={() => setIsModalOpen(false)}
          redBtnFn={() => handleLogOut()}
        />
      )}
      <TopBar />
      <ScrollView>
        <View style={styles.whiteWrap}>
          <View style={styles.greenCard}>
            <Image source={running} style={styles.runImg} />
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 28,
              }}>
              <Text style={{fontSize: 22, fontWeight: 'bold', color: 'black'}}>
                {nickName}님
              </Text>
              <View style={styles.levelBadge}>
                <Text style={{fontSize: 11, color: 'white'}}>
                  {lvl + 1}레벨 플로거
                </Text>
              </View>
            </View>
            <Text style={{fontSize: 15, color: 'black'}}>
              지금까지 {'\n'}
              {ploggingCnt}번의 플로깅을 완료했어요
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
              팔로잉 플로거
            </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('ManageFriend');
              }}>
              <Text style={{color: '#4879FF', fontSize: 11}}>친구관리</Text>
            </Pressable>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.friendsWrap}>
              {friendsList.map((friend, i) => {
                return (
                  <FriendCard
                    key={i}
                    level={parseInt(friend.friend.exp / 100) + 1}
                    name={friend.friend.nickname}
                    profile={friend.friend.profileImageUrl}
                  />
                );
              })}
              {/* <FriendCard level={6} name={'재준소'} profile={'jaejun'} />
              <FriendCard level={4} name={'용훈'} profile={'yonghoon'} />
              <FriendCard level={999} name={'가원선장'} profile={'gawon'} /> */}
            </View>
          </ScrollView>
        </View>
        <View style={styles.optionWrap}>
          {/* <Pressable onPress={() => navigation.navigate('ModifyInfo')}>
            <View style={styles.option}>
              <Text style={{fontSize: 15, color: 'black'}}>프로필 수정</Text>
              <Image source={chevronRight} style={{width: 8, height: 14}} />
            </View>
          </Pressable> */}
          <Pressable onPress={() => navigation.navigate('PloggingRecord')}>
            <View style={styles.option}>
              <Text style={{fontSize: 15, color: 'black'}}>
                나의 플로깅 기록
              </Text>
              <Image source={chevronRight} style={{width: 8, height: 14}} />
            </View>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate('LikedCourse');
            }}>
            <View style={styles.option}>
              <Text style={{fontSize: 15, color: 'black'}}>
                찜한 플로깅 코스
              </Text>
              <Image source={chevronRight} style={{width: 8, height: 14}} />
            </View>
          </Pressable>
          {/* <Pressable>
            <View style={styles.option}>
              <Text style={{fontSize: 15, color: 'black'}}>공지사항</Text>
              <Image source={chevronRight} style={{width: 8, height: 14}} />
            </View>
          </Pressable> */}
          <Pressable onPress={() => setIsModalOpen(true)}>
            <View style={styles.option}>
              <Text style={{fontSize: 15, color: 'black'}}>로그아웃</Text>
              <Image source={chevronRight} style={{width: 8, height: 14}} />
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  whiteWrap: {
    marginTop: 60,
    backgroundColor: 'white',
    padding: 20,
    borderTopColor: '#D9D9D9',
    borderTopWidth: 1,
  },
  greenCard: {
    flex: 1,
    padding: 16,
    backgroundColor: '#E7F7EF',
    borderColor: '#7BE6B4',
    borderRadius: 16,
    borderWidth: 1,
    position: 'relative',
    marginBottom: 20,
  },
  levelBadge: {
    backgroundColor: '#1ECD90',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
    justifyContent: 'center',
    alignContent: 'center',
    marginLeft: 8,
    marginTop: 12,
  },
  runImg: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  friendsWrap: {
    flex: 1,
    overflow: 'hidden',
    flexDirection: 'row',
    marginTop: 8,
  },
  optionWrap: {
    padding: 20,
  },
  option: {
    height: 52,
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
});
