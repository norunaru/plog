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
import RedModal from '../components/RedModal';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const ModifyInfoScreen = ({navigation}) => {
  const [isModalOpen, setisModalOpen] = useState(false);
  const [isNoticeOn, setIsNoticeOn] = useState(false);
  const [isRedModalOpen, setIsRedModalOpen] = useState(false);

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
      {isRedModalOpen && (
        <RedModal
          boldText={'정말 탈퇴하시겠어요?'}
          subText={'탈퇴 시, 정보가 모두 삭제되며 복구가 불가능해요'}
          whiteBtnText={'취소'}
          redBtnText={'탈퇴하기'}
          onClose={() => setIsRedModalOpen(false)}
          // 로그아웃 로직 추가 필요
          redBtnFn={() => navigation.navigate('LoginMain')}
        />
      )}
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
            <Text style={[styles.nickname, {marginLeft: responsiveWidth(7)}]}>
              플로그짱1
            </Text>
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
        </View>
      </View>
      {isNoticeOn ? (
        <View style={styles.noticeBox}>
          <Text style={{fontSize: responsiveFontSize(1.8), color: 'white'}}>
            닉네임이 수정되었어요
          </Text>
        </View>
      ) : null}

      <Pressable
        style={styles.withdrawalButton}
        onPress={() => setIsRedModalOpen(true)}>
        <Text
          style={{
            color: '#9B9BA3',
            fontSize: responsiveFontSize(1.4),
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
    fontSize: responsiveFontSize(2.75), // 반응형 텍스트 크기
    fontWeight: 'bold',
    color: 'black',
  },
  profilePic: {
    width: responsiveWidth(25), // 반응형 너비
    height: responsiveWidth(25), // 반응형 높이
    borderRadius: responsiveWidth(6), // 반응형 둥근 모서리
    marginBottom: responsiveHeight(2),
  },
  wrap: {
    padding: responsiveWidth(5),
    paddingTop: responsiveHeight(2),
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(3),
  },
  boldText: {
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
    color: 'black',
  },
  grayText: {
    fontSize: responsiveFontSize(2),
    color: '#3F3F47',
  },
  noticeBox: {
    position: 'absolute',
    bottom: responsiveHeight(5), // 반응형으로 하단에서 5% 위
    alignSelf: 'center',
    paddingVertical: responsiveHeight(2),
    paddingHorizontal: responsiveWidth(10),
    width: responsiveWidth(80),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 30,
  },
  withdrawalButton: {
    position: 'absolute',
    right: responsiveWidth(5), // 반응형으로 오른쪽에서 5% 위치
    bottom: responsiveHeight(5), // 반응형으로 하단에서 5% 위치
  },
});

export default ModifyInfoScreen;
