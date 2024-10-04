import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

const SurveyFinishScreen = ({navigation}) => {

  return (
    <View style={styles.container}>
      <View  style={styles.header}/>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>선호도 조사를 모두 마쳤어요 {'\n'}참여해주셔서 감사해요!</Text>
        <Text style={styles.titleSub}>이제 플로그를 시작해볼까요?</Text>
      </View>

      <Image 
        source={require('../../assets/images/img_onboarding_running.png')}
        style={styles.onbardingImg}
      />

      <TouchableOpacity
        onPress={() => navigation.reset({
            index: 0,
            routes: [{ name: 'Tabs' }],
          })}
        style={styles.checkBtn}
      >
        <Text style={styles.checkText}>플로깅 하러가기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: 60,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleContainer: {
    marginTop: responsiveHeight(3),
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
    fontSize: responsiveFontSize(2.4),
    color: '#00A68A',
    fontWeight: 'bold',
    marginTop: responsiveHeight(3),
  },
  onbardingImg: {
    width: responsiveWidth(59),
    height: responsiveHeight(50),
    marginTop: responsiveHeight(5),
    alignSelf: 'flex-end',
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
  },
});

export default SurveyFinishScreen;