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
import defaultProfile from '../../assets/images/profile_default.png';
import pencil from '../../assets/images/btn_edit.png';
import NicknameModal from '../components/NicknameModal';

const ModifyInfoScreen = ({navigation}) => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isNoticeOn, setIsNoticeOn] = useState(false);

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
      <RecommendHeader navigation={navigation} headerText={'내 정보'} />
      {isModalOpen ? (
        <NicknameModal
          name={'플로그짱1'}
          onClose={() => setisModalOpen(false)}
          confirmFn={() => {
            setisModalOpen(false);
            setIsNoticeOn(true);
          }}
        />
      ) : null}
      <View style={styles.wrap}>
        <View
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image source={defaultProfile} style={styles.profilePic} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[styles.nickname, {marginLeft: 28}]}>플로그짱1</Text>
            <Pressable
              onPress={() => {
                setisModalOpen(true);
              }}>
              <Image source={pencil} />
            </Pressable>
          </View>
        </View>
        <View>
          <View style={styles.row}>
            <Text style={styles.boldText}>성명</Text>
            <Text style={styles.grayText}>김플로</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.boldText}>이메일</Text>
            <Text style={styles.grayText}>abc@naver.com</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.boldText}>전화번호</Text>
            <Text style={styles.grayText}>010-0000-0000</Text>
          </View>
        </View>
      </View>
      {isNoticeOn ? (
        <View style={styles.noticeBox}>
          <Text style={{fontSize: 13, color: 'white'}}>
            닉네임이 수정되었어요
          </Text>
        </View>
      ) : null}

      <Pressable style={styles.withdrawalButton}>
        <Text
          style={{
            color: '#9B9BA3',
            fontSize: 11,
          }}>
          회원탈퇴
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  nickname: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 8,
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  grayText: {
    fontSize: 16,
    color: '#3F3F47',
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
  withdrawalButton: {
    position: 'absolute',
    right: 20, // 화면 우측에서 20px 위치
    bottom: 30, // 화면 하단에서 30px 위에 위치
  },
});

export default ModifyInfoScreen;
