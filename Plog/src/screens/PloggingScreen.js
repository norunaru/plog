import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import running from '../../assets/images/running.png'; // 실제 이미지 경로를 넣으세요
import timerIcon from '../../assets/icons/ic_time.png';
import startIcon from '../../assets/icons/ic_start.png';
import stopIcon from '../../assets/icons/ic_stop.png';
import pauseIcon from '../../assets/icons/ic_pause.png';
import calorieIcon from '../../assets/icons/ic_calorie.png';
import distIcon from '../../assets/icons/distance.png';

const PloggingScreen = ({navigation}) => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true); // 타이머가 실행 중인지 확인하는 상태

  // 타이머 설정 (1초마다 업데이트)
  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else if (!isRunning && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  // 시간을 "00:00" 형식으로 변환하는 함수
  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const seconds = secs % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <View style={styles.wrap}>
      {/* 상단 텍스트 */}
      <Text style={styles.topText}>A코스에서 플로깅 하고있어요</Text>
      
      {/* 타이머 표시 */}
      <View style={styles.timerContainer}>
        <Image source={timerIcon} style={{width:27, height:27}}/>
        <Text style={styles.timerText}>{formatTime(seconds)}</Text>
      </View>

      {/* 지도 이미지 (임시 배경 색으로 대체) */}
      <View style={styles.mapContainer}>
      </View>

      {/* 이동 거리와 칼로리 정보 */}
      <View style={styles.infoContainer}>
        <View style={styles.textCont}>
          <Image source={distIcon} style={{width:27, height:27}}/>
          <Text style={styles.infoText}>현재 이동 거리</Text>
          <Text style={styles.numText}>3km</Text>
        </View>
        <View style={styles.textCont}>
          <Image source={calorieIcon} style={{width:27, height:27}}/>
          <Text style={styles.infoText}>소모 칼로리</Text>
          <Text style={styles.numText}>150kcal</Text>
        </View>
      </View>

      {/* 하단 버튼 */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.endButton}
          onPress={() => navigation.navigate("Home")} 
        >
          <Image source={stopIcon} style={{width:21, height:21}}/>        
          <Text style={styles.endButtonText}>끝내기</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.actionButton, { backgroundColor: isRunning ? '#E7F7EF' : '#1ECD90', borderWidth: isRunning ? 2 : 0 }]} 
          onPress={() => setIsRunning(!isRunning)} // 타이머 시작/정지
        >
          <Image source={isRunning ? pauseIcon : startIcon} style={{ width: 21, height: 21 }} />
          <Text style={[styles.actionButtonText, { color: isRunning ? '#00A68A' :  '#FFFFFF'}]}>
            {isRunning ? '잠시 멈추기' : '이어하기'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    backgroundColor: '#DFE4E7',
    alignItems: 'center',
  },
  topText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 60,
    textAlign: 'center',
  },
  timerContainer: {
    marginTop: 20,
    backgroundColor: '#ffffff',
    width: 217,
    height: 89,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  timerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#017978',
  },
  mapContainer: {
    marginTop: 20,
    width: '90%',
    height: 340,
    backgroundColor: '#DFE4E7',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapImage: {
    width: '90%',
    height: '90%',
  },
  infoContainer: {
    width: '90%',
    height: 100,
    paddingVertical: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  textCont: {
    flexDirection: 'row',
  },
  infoText: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    paddingVertical: 7,
    marginLeft: 10,
  },
  numText: {
    fontSize: 14,
    color: 'black',
    paddingVertical: 7,
    marginLeft: 6,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    marginTop: 30,
  },
  endButton: {
    backgroundColor: '#FFFFFF',
    width: 127,
    height: 70,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  endButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9B9BA3',
    marginLeft: 5,
  },
  actionButton: {
    width: 226,
    height: 70,    
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    borderColor: '#1ECD90',
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default PloggingScreen;
