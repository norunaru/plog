import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import SurveyQuestionHeader from '../components/headers/SurveyQuestionHeader';
import CloseModal from '../components/modals/CloseModal';
import RegionModal from '../components/modals/RegionModal';
import EnvironmentModal from '../components/modals/EnvironmentModal';

import regionData from '../../assets/data/regionData.json';
import {submitSurvey} from '../API/survey/surveyAPI';
import AsyncStorage from '@react-native-async-storage/async-storage';

import useStore from '../../store/store';

const SurveyQuestionScreen = ({navigation}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState({});
  const [navigateToResult, setNavigateToResult] = useState(false);

  const [isCityModalVisible, setCityModalVisible] = useState(false);
  const [isCountyModalVisible, setCountyModalVisible] = useState(false);
  const [isTownModalVisible, setTownModalVisible] = useState(false);

  const [csvData, setCsvData] = useState(regionData);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedCounty, setSelectedCounty] = useState('');
  const [selectedTown, setSelectedTown] = useState('');

  const [isEnvironmentModalVisible, setEnvironmentModalVisible] =
    useState(false);
  const [environmentRank, setEnvironmentRank] = useState('');
  const [firstRank, setFirstRank] = useState('');
  const [secondRank, setSecondRank] = useState('');
  const [alreadySelected, setAlreadySelected] = useState(false);

  const setIsFirst = useStore(state => state.setIsFirst);

  const questions = [
    {
      id: 1,
      question: '선호하는 플로깅 시간대가 \n언제인가요?',
      options: ['아침', '점심', '저녁'],
    },
    {
      id: 2,
      question: '선호하는 플로깅 적정 활동시간은 \n어느정도 인가요?',
      options: ['30분 미만', '30분 이상 1시간 미만', '1시간 이상'],
    },
    {
      id: 3,
      question: '다음 중 누구와 함께 플로깅을 \n함께 하고 싶으신가요?',
      options: ['혼자서', '친구 또는 가족과 함께', '새로운 사람들과 함께'],
    },
    {
      id: 4,
      question: '현재 주거하고 있는 지역과 \n선호 환경이 어디인가요?',
    },
  ];

  const environments = ['하천', '바다', '도심', '공원'];

  const activityTimeMap = {
    아침: 0,
    점심: 1,
    저녁: 2,
  };

  const floggingTimeMap = {
    '30분 미만': 0,
    '30분 이상 1시간 미만': 1,
    '1시간 이상': 2,
  };

  const environmentMap = {
    하천: 2,
    바다: 1,
    도심: 0,
    공원: 3,
  };

  const handleCitySelect = city => {
    setSelectedCity(city);
    setSelectedCounty('');
    setSelectedTown('');
  };

  const handleCountySelect = county => {
    setSelectedCounty(county);
    setSelectedTown('');
  };

  const handleTownSelect = town => {
    setSelectedTown(town);
  };

  const getCities = () => {
    return [...new Set(csvData.map(item => item.sd_nm))];
  };

  const getCounties = () => {
    return [
      ...new Set(
        csvData
          .filter(item => item.sd_nm === selectedCity)
          .map(item => item.sgg_nm),
      ),
    ];
  };

  const getTowns = () => {
    return csvData
      .filter(item => item.sgg_nm === selectedCounty)
      .map(item => item.emd_nm);
  };

  const handleEnvironmentSelect = environment => {
    if (environmentRank === '1순위') {
      if (environment === firstRank) {
        setAlreadySelected(true);
      } else {
        setFirstRank(environment);
        setSecondRank('');
        setAlreadySelected(false);
        setEnvironmentModalVisible(false);
      }
    } else if (environmentRank === '2순위') {
      if (environment === firstRank) {
        setAlreadySelected(true);
      } else {
        setSecondRank(environment);
        setAlreadySelected(false);
        setEnvironmentModalVisible(false);
      }
    }
  };

  const findRegionCoordinates = (city, county, town) => {
    const region = csvData.find(
      item =>
        item.sd_nm === city && item.sgg_nm === county && item.emd_nm === town,
    );
    if (region) {
      return {lat: region.center_lati, lon: region.center_long};
    }
    return {lat: 0, lon: 0};
  };

  const handleModalClose = () => {
    setEnvironmentModalVisible(false);
    setAlreadySelected(false);
  };

  const handleRankPress = rank => {
    setEnvironmentRank(rank);
    setEnvironmentModalVisible(true);
  };

  useEffect(() => {
    if (navigateToResult) {
      setNavigateToResult(false);
      navigation.navigate('SurveyResult', {answers});
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

  const handleOptionSelect = option => {
    setSelectedOption(option);
  };

  const handleNextStep = async () => {
    if (step === 4) {
      const coordinates = findRegionCoordinates(
        selectedCity,
        selectedCounty,
        selectedTown,
      );

      const surveyData = {
        activityTime: activityTimeMap[answers[1]], // 선호 시간대
        floggingTime: floggingTimeMap[answers[2]], // 적정 시간
        region_type: environmentMap[firstRank], // 선호 환경
        regionLat: coordinates.lat,
        regionLon: coordinates.lon,
      };

      try {
        // 서버에 설문조사 데이터를 제출
        const result = await submitSurvey(surveyData);
        console.log('설문 제출 응답:', result);

        if (result && result.status === 200) {
          console.log('설문조사 성공:', result.message);

          // 설문조사 완료 시 isFirst를 false로 변경
          await AsyncStorage.setItem('isFirst', 'false');
          setIsFirst(false);

          // answers를 최신 상태로 업데이트한 뒤 화면 전환
          const updatedAnswers = {
            ...answers,
            4: {
              city: selectedCity,
              county: selectedCounty,
              town: selectedTown,
              firstEnvironment: firstRank,
              secondEnvironment: secondRank,
            },
          };

          setAnswers(updatedAnswers); // 상태 업데이트
          navigation.navigate('SurveyResult', {answers: updatedAnswers}); // 최신 상태 전달
        } else {
          console.error('설문 제출 실패:', result); // 실패 시 에러 출력
        }
      } catch (error) {
        console.error('Survey submission error:', error);
      }
    } else {
      if (!selectedOption) return;
      setAnswers(prevAnswers => ({
        ...prevAnswers,
        [step]: selectedOption,
      }));
      setStep(step + 1);
      setSelectedOption(null);
    }
  };

  const isStep4Complete = () => {
    return (
      selectedCity && selectedCounty && selectedTown && firstRank && secondRank
    );
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
        <View style={[styles.progressBar, {width: `${progressPercentage}%`}]} />
      </View>

      <View style={styles.header}>
        <Text style={styles.stepText}>
          {step} / {totalSteps}
        </Text>
        <Text style={styles.questionText}>{questions[step - 1].question}</Text>
      </View>

      {step === 4 ? (
        <View>
          <Text style={styles.step4Title}>주거지역</Text>
          <View style={styles.living}>
            <TouchableOpacity
              style={styles.city}
              onPress={() => setCityModalVisible(true)}>
              <Text
                style={[styles.cityText, selectedCity && styles.selectedText]}>
                {selectedCity || '도/시'}
              </Text>
              <Image
                source={require('../../assets/icons/ic_ditection.png')}
                style={styles.cityIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.city}
              onPress={() => selectedCity && setCountyModalVisible(true)}>
              <Text
                style={[
                  styles.cityText,
                  selectedCounty && styles.selectedText,
                ]}>
                {selectedCounty || '시/군/구'}
              </Text>
              <Image
                source={require('../../assets/icons/ic_ditection.png')}
                style={styles.cityIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.city}
              onPress={() => selectedCounty && setTownModalVisible(true)}>
              <Text
                style={[styles.cityText, selectedTown && styles.selectedText]}>
                {selectedTown || '동/읍/면'}
              </Text>
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
              onPress={() => handleRankPress('1순위')}>
              <Text style={[styles.rankText, firstRank && styles.selectedText]}>
                {firstRank || '1순위'}
              </Text>
              <Image
                source={require('../../assets/icons/ic_ditection.png')}
                style={styles.rankIcon}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rank}
              onPress={() => handleRankPress('2순위')}>
              <Text
                style={[styles.rankText, secondRank && styles.selectedText]}>
                {secondRank || '2순위'}
              </Text>
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
          {questions[step - 1].options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionBtn,
                selectedOption === option && styles.selectedOptionBtn,
              ]}
              onPress={() => handleOptionSelect(option)}>
              <Text
                style={[
                  styles.optionText,
                  selectedOption === option
                    ? styles.selectedOptionText
                    : selectedOption === null
                    ? styles.optionText
                    : styles.unselectedOptionText,
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
            : styles.inactiveNextBtn,
        ]}
        onPress={handleNextStep}
        disabled={!(step === 4 ? isStep4Complete() : selectedOption)}>
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
