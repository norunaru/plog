import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';
import SurveyResultHeader from "./headers/SurveyResultHeader";

const SurveyResultScreen = ({ route, navigation }) => {
  const { answers } = route.params; // 설문 조사 결과를 params로 받아옴

  const handleBackPress = () => {
      navigation.goBack(); // 첫 번째 질문에서 뒤로가면 이전 화면으로
  };

  return (
    <View style={styles.container}>
      <SurveyResultHeader 
        onBackPress={handleBackPress}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>입력하신 정보가 올바른지 {'\n'}확인해 주세요</Text>
        <Text style={styles.titleSub}>수정을 원하시면 뒤로가기를 눌러주세요</Text>
      </View>
    <View style={styles.answersContainer}>
        <Text style={styles.name}>최승빈님</Text>
        <View style={styles.contentContainer}>
            <View style={styles.subContainer}>
                <Text style={styles.sub}>선호 시간</Text>
                <Text style={styles.sub}>활동 시간</Text>
                <Text style={styles.sub}>선호 장소</Text>
                <Text style={styles.sub}>동행 선택</Text>
                <Text style={styles.sub}>주거 지역</Text>
            </View>
            <View style={styles.answerContainer}>
                <Text style={styles.content}>{answers[1]}</Text>
                <Text style={styles.content}>{answers[2]}</Text>
                <Text style={styles.content}>{answers[3]}</Text>
                <Text style={styles.content}>{answers[4]}</Text>
                <Text style={styles.content}>{answers[5]}</Text>
            </View>
        </View>
    </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("SurveyFinish")}
        style={styles.checkBtn}
      >
        <Text style={styles.checkText}>확인했어요</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleContainer: {
    marginTop: responsiveHeight(2.5),
    marginLeft: responsiveWidth(5),
  },
  title: {
    marginTop: responsiveHeight(4),
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: responsiveFontSize(2.8),
    color: '#202025',
    fontWeight: 'bold',
  },
  titleSub: {
    fontSize: responsiveFontSize(1.8),
    color: '#66666D',
    fontWeight: '400',
    marginTop: responsiveHeight(1),
  },
  answersContainer: {
    backgroundColor: '#F7F7F7',
    borderRadius: 16,
    width: responsiveWidth(90),
    height: responsiveHeight(26),
    position: 'absolute',
    alignSelf: 'center',
    marginTop: responsiveHeight(32),
    justifyContent: 'center',
  },
  name: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: 'bold',
    color: '#202025',
    marginLeft: responsiveWidth(6),
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: responsiveHeight(2),
  },
  subContainer: {
    flexDirection: 'column',
    marginLeft: responsiveWidth(6),
  },
  answerContainer: {
    flexDirection: 'column',
    marginLeft: responsiveWidth(4),
  },
  sub: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '400',
    color: '#9B9BA3',
    marginRight: responsiveWidth(3),
    lineHeight: responsiveHeight(3.5),
  },
  content: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '400',
    color: '#202025',
    lineHeight: responsiveHeight(3.5),
  },
  checkBtn: {
    position: 'absolute',
    bottom: responsiveHeight(4),
    width: '90%',
    alignSelf: 'center',
    borderRadius: 30,
    paddingVertical: responsiveHeight(2),
    alignItems: 'center',
    backgroundColor: '#1ECD90',
  },
  checkText: {
    color: '#FFFFFF',
    fontSize: responsiveFontSize(2),
    fontWeight: 'bold',
  }
});

export default SurveyResultScreen;