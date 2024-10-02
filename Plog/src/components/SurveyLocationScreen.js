import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker"; // Picker 컴포넌트 가져오기
import { responsiveWidth, responsiveHeight, responsiveFontSize } from 'react-native-responsive-dimensions';

const SurveyLocationScreen = ({onSubmit}) => {
  const [city, setCity] = useState(null);      // 도시 선택 상태
  const [district, setDistrict] = useState(null); // 시/군/구 선택 상태
  const [neighborhood, setNeighborhood] = useState(null); // 동/읍/면 선택 상태
  const [environmentFirst, setEnvironmentFirst] = useState(null); // 선호 환경 1순위
  const [environmentSecond, setEnvironmentSecond] = useState(null); // 선호 환경 2순위

  // 도시, 시/군/구, 동/읍/면 데이터 예시
  const cities = ["서울특별시", "경기도", "부산광역시"];
  const districts = {
    "서울특별시": ["강남구", "종로구", "마포구"],
    "경기도": ["성남시", "수원시", "고양시"],
    "부산광역시": ["해운대구", "사하구", "부산진구"],
  };
  const neighborhoods = {
    "강남구": ["역삼동", "논현동", "삼성동"],
    "종로구": ["명륜동", "청운동", "익선동"],
    "성남시": ["분당구", "수정구", "중원구"],
    "해운대구": ["좌동", "중동", "송정동"],
  };
  
  const environments = ["공원", "바다", "산", "도심", "강변"];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>현재 주거하고 있는 지역과 선호 환경이 어디인가요?</Text>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>주거 지역</Text>
        
        {/* 도시 선택 */}
        <Picker
          selectedValue={city}
          onValueChange={(itemValue) => {
            setCity(itemValue);
            setDistrict(null);  // 도시 선택 시 시/군/구 초기화
            setNeighborhood(null);  // 도시 선택 시 동/읍/면 초기화
          }}
          style={styles.picker}
        >
          <Picker.Item label="도시" value={null} />
          {cities.map((city) => (
            <Picker.Item key={city} label={city} value={city} />
          ))}
        </Picker>

        {/* 시/군/구 선택 */}
        <Picker
          selectedValue={district}
          onValueChange={(itemValue) => {
            setDistrict(itemValue);
            setNeighborhood(null); // 시/군/구 선택 시 동/읍/면 초기화
          }}
          enabled={!!city}  // 도시가 선택되어야 시/군/구 선택 가능
          style={styles.picker}
        >
          <Picker.Item label="시/군/구" value={null} />
          {city && districts[city].map((district) => (
            <Picker.Item key={district} label={district} value={district} />
          ))}
        </Picker>

        {/* 동/읍/면 선택 */}
        <Picker
          selectedValue={neighborhood}
          onValueChange={(itemValue) => setNeighborhood(itemValue)}
          enabled={!!district}  // 시/군/구가 선택되어야 동/읍/면 선택 가능
          style={styles.picker}
        >
          <Picker.Item label="동/읍/면" value={null} />
          {district && neighborhoods[district].map((neighborhood) => (
            <Picker.Item key={neighborhood} label={neighborhood} value={neighborhood} />
          ))}
        </Picker>
      </View>

      <View style={styles.pickerContainer}>
        <Text style={styles.label}>선호 환경</Text>

        {/* 선호 환경 1순위 */}
        <Picker
          selectedValue={environmentFirst}
          onValueChange={(itemValue) => setEnvironmentFirst(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="1순위" value={null} />
          {environments.map((env) => (
            <Picker.Item key={env} label={env} value={env} />
          ))}
        </Picker>

        {/* 선호 환경 2순위 */}
        <Picker
          selectedValue={environmentSecond}
          onValueChange={(itemValue) => setEnvironmentSecond(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="2순위" value={null} />
          {environments.map((env) => (
            <Picker.Item key={env} label={env} value={env} />
          ))}
        </Picker>
      </View>

      <TouchableOpacity
        onPress={() => Alert.alert("확인", `선택한 지역: ${city}, ${district}, ${neighborhood} \n 선호 환경: ${environmentFirst}, ${environmentSecond}`)}
        style={styles.submitButton}
      >
        <Text style={styles.submitButtonText}>다음</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    marginBottom: responsiveHeight(3),
  },
  title: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: "bold",
    color: "#202025",
  },
  pickerContainer: {
    marginBottom: responsiveHeight(2),
  },
  label: {
    fontSize: responsiveFontSize(2),
    color: "#202025",
    marginBottom: responsiveHeight(1),
  },
  picker: {
    backgroundColor: "#F7F7F7",
    borderRadius: 8,
    width: "100%",
    height: responsiveHeight(6),
    marginBottom: responsiveHeight(1.5),
  },
  submitButton: {
    marginTop: responsiveHeight(5),
    backgroundColor: "#1ECD90",
    borderRadius: 30,
    paddingVertical: responsiveHeight(2),
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: responsiveFontSize(2),
    fontWeight: "bold",
  },
});

export default SurveyLocationScreen;
