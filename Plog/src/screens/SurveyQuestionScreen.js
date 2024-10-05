import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import SurveyQuestionHeader from "../components/headers/SurveyQuestionHeader";
import CloseModal from "../components/modals/CloseModal";
import RegionModal from "../components/modals/RegionModal";
import EnvironmentModal from "../components/modals/EnvironmentModal";

import regionData from '../../assets/data/regionData.json';

const SurveyQuestionScreen = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false)
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});
  const [navigateToResult, setNavigateToResult] = useState(false);

  const [isCityModalVisible, setCityModalVisible] = useState(false);
  const [isCountyModalVisible, setCountyModalVisible] = useState(false);
  const [isTownModalVisible, setTownModalVisible] = useState(false);

  const [csvData, setCsvData] = useState(regionData);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCounty, setSelectedCounty] = useState("");
  const [selectedTown, setSelectedTown] = useState("");

  const [isEnvironmentModalVisible, setEnvironmentModalVisible] = useState(false);
  const [environmentRank, setEnvironmentRank] = useState("");
  const [firstRank, setFirstRank] = useState("");
  const [secondRank, setSecondRank] = useState("");
  const [alreadySelected, setAlreadySelected] = useState(false);

  const environments = ["산", "하천", "바다", "도심", "공원"];

  const handleCitySelect = (city) => {
    setSelectedCity(city);
    setSelectedCounty("");
    setSelectedTown("");
  };

  const handleCountySelect = (county) => {
    setSelectedCounty(county);
    setSelectedTown("");
  };

  const handleTownSelect = (town) => {
    setSelectedTown(town);
  };

  const getCities = () => {
    // 시/도 목록 필터링 (중복 제거)
    return [...new Set(csvData.map(item => item.sd_nm))];
  };

  const getCounties = () => {
    // 선택한 시에 따른 시/군/구 목록 필터링 (중복 제거)
    return [...new Set(csvData.filter(item => item.sd_nm === selectedCity).map(item => item.sgg_nm))];
  };

  const getTowns = () => {
    // 선택한 구에 따른 동/읍/면 목록 필터링
    return csvData.filter(item => item.sgg_nm === selectedCounty).map(item => item.emd_nm);
  };

  const handleEnvironmentSelect = (environment) => {
    if (environmentRank === "1순위") {
      if (environment === firstRank) {
        setAlreadySelected(true);
      } else {
        setFirstRank(environment);
        setSecondRank("");
        setAlreadySelected(false);
        setEnvironmentModalVisible(false);
      }
    } else if (environmentRank === "2순위") {
      if (environment === firstRank) {
        setAlreadySelected(true);
      } else {
        setSecondRank(environment);
        setAlreadySelected(false);
        setEnvironmentModalVisible(false);
      }
    }
  };

  const handleModalClose = () => {
    setEnvironmentModalVisible(false);
    setAlreadySelected(false);
  };

  const handleRankPress = (rank) => {
    setEnvironmentRank(rank);
    setEnvironmentModalVisible(true);
  };

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
      question: "다음 중 누구와 함께 플로깅을 \n함께 하고 싶으신가요?",
      options: ["혼자서", "친구 또는 가족과 함께", "새로운 사람들과 함께"],
    },
    {
      id: 4,
      question: "현재 주거하고 있는 지역과 \n선호 환경이 어디인가요?",
    },
  ];

  useEffect(() => {
    if (navigateToResult) {
      setNavigateToResult(false);
      navigation.navigate("SurveyResult", { answers });
    }
  }, [navigateToResult]);
  
  const handleBackPress = () => {
    if (step > 1) {
      setStep(step - 1);
      setSelectedOption(answers[step - 1] || null);
    } else {
      navigation.goBack();
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
    if (step === 4) {
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        4: {
          city: selectedCity,
          county: selectedCounty,
          town: selectedTown,
          firstEnvironment: firstRank,
          secondEnvironment: secondRank,
        },
      }));
      setNavigateToResult(true);
    } else {
      if (!selectedOption) return;
      setAnswers((prevAnswers) => ({
        ...prevAnswers,
        [step]: selectedOption,
      }));
      setStep(step + 1);
      setSelectedOption(null);
    }
  };

  const isStep4Complete = () => {
    return selectedCity && selectedCounty && selectedTown && firstRank && secondRank;
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

        {step === 4 ? (
          <View>
            <Text style={styles.step4Title}>주거지역</Text>
            <View style={styles.living}>
              <TouchableOpacity 
                style={styles.city }
                onPress={() => setCityModalVisible(true)}>
                <Text style={[styles.cityText, selectedCity && styles.selectedText]}>{selectedCity || "도/시"}</Text>
                <Image 
                  source={require('../../assets/icons/ic_ditection.png')}
                  style={styles.cityIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.city}
                onPress={() => selectedCity && setCountyModalVisible(true)}>
                <Text style={[styles.cityText, selectedCounty && styles.selectedText]}>{selectedCounty || "시/군/구"}</Text>
                <Image 
                  source={require('../../assets/icons/ic_ditection.png')}
                  style={styles.cityIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.city}
                onPress={() => selectedCounty && setTownModalVisible(true)}>
                <Text style={[styles.cityText, selectedTown && styles.selectedText]}>{selectedTown || "동/읍/면"}</Text>
                <Image 
                  source={require('../../assets/icons/ic_ditection.png')}
                  style={styles.cityIcon}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.step4Title}>선호 환경</Text>
            <View style={styles.environment}>
              <TouchableOpacity 
                style={styles.rank}
                onPress={() => handleRankPress("1순위")}>
                <Text style={[styles.rankText, firstRank && styles.selectedText]}>{firstRank || "1순위"}</Text>
                <Image 
                  source={require('../../assets/icons/ic_ditection.png')}
                  style={styles.rankIcon}
                />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.rank}
                onPress={() => handleRankPress("2순위")}
                >
                <Text style={[styles.rankText, secondRank && styles.selectedText]}>{secondRank || "2순위"}</Text>
                <Image 
                  source={require('../../assets/icons/ic_ditection.png')}
                  style={styles.rankIcon}
                />
              </TouchableOpacity>

            </View>

            {/* 모달들 */}
            <EnvironmentModal
              isVisible={isEnvironmentModalVisible}
              onClose={handleModalClose}
              onSelect={handleEnvironmentSelect}
              options={environments}
              selectedValue={firstRank || secondRank}
              displayRank={firstRank}
              alreadySelected={alreadySelected}
            />

            <RegionModal
              isVisible={isCityModalVisible}
              onClose={() => setCityModalVisible(false)}
              onSelect={handleCitySelect}
              options={getCities()}
              selectedValue={selectedCity}
            />

            <RegionModal
              isVisible={isCountyModalVisible}
              onClose={() => setCountyModalVisible(false)}
              onSelect={handleCountySelect}
              options={getCounties()}
              selectedValue={selectedCounty}
            />

            <RegionModal
              isVisible={isTownModalVisible}
              onClose={() => setTownModalVisible(false)}
              onSelect={handleTownSelect}
              options={getTowns()}
              selectedValue={selectedTown}
            />
          </View>

        ) : (
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
        )}

        <TouchableOpacity
          style={[
            styles.nextBtn,
            (step === 4 ? isStep4Complete() : selectedOption) 
              ? styles.activeNextBtn 
              : styles.inactiveNextBtn
          ]}
          onPress={handleNextStep}
          disabled={!(step === 4 ? isStep4Complete() : selectedOption)}
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
    fontWeight: '500',
  },
  selectedOptionText: {
    fontSize: responsiveFontSize(1.6),
    color: '#202025',
    fontWeight: '500',
  },
  unselectedOptionText: {
    fontSize: responsiveFontSize(1.6),
    color: '#9B9BA3',
    fontWeight: '500',
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
  step4Title: {
    fontSize: responsiveFontSize(2),
    fontWeight: '500',
    color: '#202025',
    marginTop: responsiveHeight(5),
    marginLeft: responsiveWidth(5),
  },
  living: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: responsiveHeight(2),
  },
  city: {
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    width: responsiveWidth(28),
    height: responsiveHeight(5.5),
    alignItems: 'center',
    flexDirection: 'row',
  },
  cityIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    justifyContent: 'flex-end',
    marginLeft: responsiveWidth(21),
  },
  cityText: {
    color: '#9B9BA3',
    fontSize: responsiveFontSize(1.6),
    fontWeight: '500',
    marginLeft: responsiveWidth(3),
  },
  environment: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: responsiveHeight(2),
  },
  rank: {
    backgroundColor: '#F7F7F7',
    borderRadius: 12,
    width: responsiveWidth(43),
    height: responsiveHeight(5.5),
    alignItems: 'center',
    flexDirection: 'row',
  },
  rankText: {
    color: '#9B9BA3',
    fontSize: responsiveFontSize(1.6),
    fontWeight: '500',
    marginLeft: responsiveWidth(5),
  },
  rankIcon: {
    width: 20,
    height: 20,
    position: 'absolute',
    justifyContent: 'flex-end',
    marginLeft: responsiveWidth(35),
  },
  selectedText: {
    fontSize: responsiveFontSize(1.6),
    fontWeight: '500',
    color: '#202025',
  },
});

export default SurveyQuestionScreen;