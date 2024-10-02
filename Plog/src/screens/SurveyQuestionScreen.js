import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import SurveyQuestionHeader from "../components/headers/SurveyQuestionHeader";
import CloseModal from "../components/modals/CloseModal";

const SurveyQuestionScreen = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false)
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      question: "선호하는 플로깅 시간대가 \n언제인가요?",
      options: ["아침", "점심", "저녁"],
    },
    {
      id: 2,
      question: "선호하는 플로깅 적정 활동시간은 \n어느정도 인가요?",
      options: ["30분 미만", "30분 이상 1시간 미만", "1시간 이상"],
    },
    {
      id: 3,
      question: "플로깅 하고 싶은 장소는 \n어떤 곳인가요?",
      options: ["도심", "바다 또는 강", "공원"],
    },
    {
      id: 4,
      question: "다음 중 누구와 함께 플로깅을 \n함께 하고 싶으신가요?",
      options: ["혼자서", "친구 또는 가족과 함께", "새로운 사람들과 함께"],
    },
    {
      id: 5,
      question: "현재 주거하고 있는 지역과 \n선호 환경이 어디인가요?",
      options: ["서울특별시 용산구 청파동"],
    },
  ];
  
  const handleBackPress = () => {
    if (step > 1) {
      setStep(step - 1);
      setSelectedOption(answers[step - 1] || null); // 이전에 선택한 옵션 유지
    } else {
      navigation.goBack(); // 첫 번째 질문에서 뒤로가면 이전 화면으로
    }
  };
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const totalSteps = questions.length;

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextStep = () => {
    if (!selectedOption) return;

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [step]: selectedOption,
    }));

    if (step < totalSteps) {
      setStep(step + 1);
      setSelectedOption(null);
    } else {
      navigation.navigate("SurveyResult", { answers });
    }
  };

  const progressPercentage = (step / totalSteps) * 100;

  return (
    <View style={styles.container}>
        <SurveyQuestionHeader 
          onBackPress={handleBackPress}
          onClosePress={toggleModal}
        />

        <CloseModal 
          isVisible={isModalVisible}
          onClose={toggleModal}
          onExit={() => navigation.navigate('LoginMain')}
        />
        
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progressPercentage}%` }]}/>
        </View>

        <View style={styles.header}>
          <Text style={styles.stepText}>{step} / {totalSteps}</Text>
          <Text style={styles.questionText}>{questions[step -1].question}</Text>
        </View>

        <View style={styles.optionsContainer}>
          {questions[step -1].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionBtn,
                selectedOption === option && styles.selectedOptionBtn
              ]}
              onPress={() => handleOptionSelect(option)}
            >
              <Text style={[
                styles.optionText,
                selectedOption === option
                  ? styles.selectedOptionText
                  : selectedOption === null
                    ? styles.optionText
                    : styles.unselectedOptionText
              ]}>
                {option}
              </Text>
              {selectedOption === option && (
                <Image 
                  source={require('../../assets/icons/ic_select.png')}
                  style={styles.selectIcon}
                />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.nextBtn,
            selectedOption 
              ? styles.activeNextBtn
              : styles.inactiveNextBtn
          ]}
          onPress={handleNextStep}
          disabled={!selectedOption}
        >
          <Text style={styles.nextBtnText}>다음</Text>
        </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  progressBarContainer: {
    width: '100%',
    height: responsiveHeight(1.3),
    backgroundColor: '#F7F7F7',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#1ECD90',
  },
  header: {
    marginTop: responsiveHeight(3),
    marginLeft: responsiveWidth(5),
  },
  stepText: {
    fontSize: responsiveFontSize(2.3),
    color: '#9B9BA3',
    fontWeight: 'bold',
  },
  questionText: {
    fontSize: responsiveFontSize(2.8),
    color: '#202025',
    fontWeight: 'bold',
  },
  optionsContainer: {
    marginTop: responsiveHeight(4),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: responsiveHeight(10),
  },
  optionBtn: {
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    width: responsiveWidth(90),
    paddingVertical: responsiveHeight(2.3),
    paddingHorizontal: responsiveWidth(7),
    marginVertical: responsiveHeight(1.2),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedOptionBtn: {
    backgroundColor: '#E7F7EF',
    borderColor: '#1ECD90',
    borderWidth: 1,
  },
  optionText: {
    fontSize: responsiveFontSize(1.6),
    color: '#202025',
    fontWeight: '400',
  },
  selectedOptionText: {
    fontSize: responsiveFontSize(1.6),
    color: '#202025',
    fontWeight: '400',
  },
  unselectedOptionText: {
    fontSize: responsiveFontSize(1.6),
    color: '#9B9BA3',
    fontWeight: '400',
  },
  selectIcon: {
    width: 24,
    height: 24,
  },
  nextBtn: {
    position: 'absolute',
    bottom: responsiveHeight(4),
    width: '90%',
    alignSelf: 'center',
    borderRadius: 30,
    paddingVertical: responsiveHeight(2),
    alignItems: 'center',
  },
  activeNextBtn: {
      backgroundColor: '#1ECD90',
  },
  inactiveNextBtn: {
      backgroundColor: '#D9D9D9',
  },
  nextBtnText: {
      color: '#fff',
      fontSize: responsiveFontSize(2),
      fontWeight: 'bold',
  },
});

export default SurveyQuestionScreen;