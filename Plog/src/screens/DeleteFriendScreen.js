import React, {useState} from 'react';
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
import yonghoon from '../../assets/images/용훈.jpg';
import RedModal from '../components/RedModal.js';

const DeleteFriendScreen = ({navigation}) => {
  const [typedText, setTypedText] = useState('');
  const [friend, setFriend] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [targetToDelete, setTargetToDelete] = useState(0);

  // 더미 데이터 배열 생성
  const dummyFriends = [
    {name: '이재준', level: 6, ploggingCnt: 10, id: 1},
    {name: '김용훈', level: 8, ploggingCnt: 15, id: 2},
    {name: '최가원', level: 5, ploggingCnt: 12, id: 3},
    {name: '박지수', level: 4, ploggingCnt: 8, id: 4},
    {name: '정민수', level: 7, ploggingCnt: 20, id: 5},
    {name: '이상호', level: 3, ploggingCnt: 5, id: 6},
  ];

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
            // 삭제 처리 로직 추가
            setIsModalOpen(false); // 삭제 완료 후 모달 닫힘
          }}
          onClose={() => setIsModalOpen(false)} // 배경 클릭 시 모달 닫힘
        />
      ) : null}
      <RecommendHeader navigation={navigation} headerText={''} />
      <View style={styles.wrap}>
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
                  {dummyFriends.length}
                </Text>
              </View>
            </View>

            <ScrollView>
              {dummyFriends.map((friend, index) => (
                <FriendManageCard
                  key={index}
                  name={friend.name}
                  level={friend.level}
                  ploggingCnt={friend.ploggingCnt}
                  deleteOn={true}
                  deleteFn={() => {
                    setIsModalOpen(true);
                    setTargetToDelete(friend.id);
                  }}
                />
              ))}
            </ScrollView>
          </View>
        )}
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

export default DeleteFriendScreen;
