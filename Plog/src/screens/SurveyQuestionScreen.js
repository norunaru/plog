import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const SurveyQuestionScreen = () => {
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 1,
      question: "선호하는 플로깅 시간대가 \n언제인가요?",
      options: ["30분 미만", "30분 이상 1시간 미만", "1시간 이상"],
    },
    {
      id: 2,
      question: "1플로깅할 때 \n중요한 요소는 무엇인가요?",
      options: ["청결한 환경", "안전한 경로", "경치"],
    },
    {
      id: 3,
      question: "2플로깅 코스에서 \n선호하는 난이도는?",
      options: ["쉬움", "보통", "어려움"],
    },
    {
      id: 4,
      question: "3플로깅 코스에서 \n선호하는 난이도는?",
      options: ["쉬움", "보통", "어려움"],
    },
    {
      id: 5,
      question: "4플로깅 코스에서 \n선호하는 난이도는?",
      options: ["쉬움", "보통", "어려움"],
    },
    {
      id: 6,
      question: "5플로깅 코스에서 \n선호하는 난이도는?",
      options: ["쉬움", "보통", "어려움"],
    },
    {
      id: 7,
      question: "6플로깅 코스에서 \n선호하는 난이도는?",
      options: ["쉬움", "보통", "어려움"],
    },
    {
      id: 8,
      question: "7플로깅 코스에서 \n선호하는 난이도는?",
      options: ["쉬움", "보통", "어려움"],
    },
    {
      id: 9,
      question: "8플로깅 코스에서 \n선호하는 난이도는?",
      options: ["쉬움", "보통", "어려움"],
    },
  ];

  const totalSteps = questions.length;

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextStep = () => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [step]: selectedOption,
    }));

    if (step < totalSteps) {
      setStep(step + 1);
      setSelectedOption(null);
    } else {
      Alert.alert("완료")
    }
  };

  const progressPercentage = (step / totalSteps) * 100;

  return (
    <View style={styles.container}>
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
    marginVertical: responsiveHeight(0.8),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedOptionBtn: {
    backgroundColor: '#E7F7EF',
    borderColor: '#1ECD90',
    borderWidth: 1,
  },
  optionText: {
    fontSize: responsiveFontSize(2),
    color: '#202025',
    fontWeight: '400',
  },
  selectedOptionText: {
    fontSize: responsiveFontSize(2),
    color: '#202025',
    fontWeight: '400',
  },
  unselectedOptionText: {
    fontSize: responsiveFontSize(2),
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