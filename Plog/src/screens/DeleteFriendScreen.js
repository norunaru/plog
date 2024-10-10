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
import PloggingHeader from '../components/headers/PloggingHeader';
import ic_search from '../../assets/icons/ic_search.png';
import FriendManageCard from '../components/cards/FriendManageCard';
import nothing from '../../assets/images/nothing.png';
import RedModal from '../components/RedModal.js';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import useStore from '../../store/store';
import {getFriendsList, deleteFriend} from '../API/friend/friendAPI';

const DeleteFriendScreen = ({navigation}) => {
  const [typedText, setTypedText] = useState('');
  const [friend, setFriend] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetToDelete, setTargetToDelete] = useState(0);
  const [isNoticeOn, setIsNoticeOn] = useState(false);
  const [friendsCnt, setFriendsCnt] = useState(0);
  const [friendsList, setFriendsList] = useState([]);

  const token = useStore(state => state.accessToken);

  const deleteMember = async (token, friendId) => {
    try {
      await deleteFriend(token, friendId);
      setIsNoticeOn(true);
      fetchFriendsList(); // 삭제 후 친구 목록 새로 고침
    } catch (error) {
      console.log('친구 삭제 중 오류 발생: ', error);
    }
  };

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

  useEffect(() => {
    fetchFriendsList();
  }, []);

  useEffect(() => {
    if (isNoticeOn) {
      const timer = setTimeout(() => {
        setIsNoticeOn(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isNoticeOn]);

  return (
    <View style={styles.container}>
      {isModalOpen ? (
        <RedModal
          boldText={'친구를 삭제하시겠어요?'}
          subText={
            '삭제 시, 해당 친구가 목록에서 삭제되며 차단 여부는 상대방이 알 수 없어요'
          }
          whiteBtnText={'취소'}
          redBtnText={'삭제하기'}
          whiteBtnFn={() => setIsModalOpen(false)} // 취소 버튼 클릭 시 모달 닫힘
          redBtnFn={() => {
            deleteMember(token, targetToDelete); // 삭제 로직 수행
            setIsModalOpen(false); // 삭제 완료 후 모달 닫힘
          }}
          onClose={() => setIsModalOpen(false)} // 배경 클릭 시 모달 닫힘
        />
      ) : null}
      <PloggingHeader navigation={navigation} headerText={'팔로잉 삭제'} />
      <View style={styles.wrap}>
        {typedText == '' && Object.keys(friend).length == 0 && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: responsiveHeight(2),
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: responsiveFontSize(2),
                    fontWeight: 'bold',
                    marginRight: responsiveWidth(1),
                  }}>
                  팔로잉 목록
                </Text>
                <Text
                  style={{
                    color: '#1ECD90',
                    fontSize: responsiveFontSize(2.2),
                    fontWeight: 'bold',
                  }}>
                  {friendsCnt}
                </Text>
              </View>
            </View>

            <ScrollView>
              {friendsList.map((friend, index) => (
                <FriendManageCard
                  key={index}
                  deleteOn={true}
                  name={friend.friend.nickname}
                  level={parseInt(friend.friend.expLevel / 100) + 1}
                  ploggingCnt={friend.ploggingCnt}
                  email={friend.friend.email}
                  profileURL={friend.friend.profileImageUrl}
                  resizeMode="cover"
                  deleteFn={() => {
                    setIsModalOpen(true);
                    setTargetToDelete(friend.friend.id);
                  }}
                />
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      {isNoticeOn ? (
        <View style={styles.noticeBox}>
          <Text style={{fontSize: responsiveFontSize(1.8), color: 'white'}}>
            친구가 삭제되었어요
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
    padding: responsiveWidth(5),
    paddingTop: responsiveHeight(2),
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    borderRadius: 8,
    paddingLeft: responsiveWidth(4),
    paddingRight: responsiveWidth(2),
    marginBottom: responsiveHeight(2),
  },
  inputBox: {
    flex: 1,
    color: '#9B9BA3',
    fontSize: responsiveFontSize(1.8),
    paddingVertical: responsiveHeight(1.5),
  },
  searchIcon: {
    width: responsiveWidth(6),
    height: responsiveWidth(6),
  },
  noticeBox: {
    position: 'absolute',
    bottom: responsiveHeight(5), // 화면 하단에서 반응형 위치
    alignSelf: 'center', // 가로 중앙에 배치
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(10),
    width: responsiveWidth(80),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 30,
  },
});

export default DeleteFriendScreen;
