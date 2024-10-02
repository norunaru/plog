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
import defaultProfile from '../../assets/images/profile_default.png';
import pencil from '../../assets/images/btn_edit.png';
import NicknameModal from '../components/NicknameModal';

const ModifyInfoScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <NicknameModal name={'플로그짱1'} />
      <RecommendHeader navigation={navigation} headerText={'내 정보'} />
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
            <Image source={pencil} />
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
});

export default ModifyInfoScreen;
