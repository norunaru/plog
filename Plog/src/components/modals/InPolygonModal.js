import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const InPolygonModal = ({
  onClose,
  greenBtnFn,
  boldText,
  subText,
  greenBtnText,
}) => {
  return (
    <View style={styles.modalContainer}>
      {/* 배경 클릭 시 모달 닫힘 */}
      <TouchableOpacity style={styles.blackBg} onPress={onClose} />

      {/* 모달 콘텐츠 */}
      <View style={styles.modalWrap}>
        <Text style={styles.boldText}>{boldText}</Text>
        {subText && <Text style={styles.subText}>{subText}</Text>}

        {/* 버튼 영역 */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.greenBtn} onPress={greenBtnFn}>
            <Text style={styles.greenBtnText}>{greenBtnText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: 10,
  },
  blackBg: {
    backgroundColor: 'black',
    opacity: 0.5,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  modalWrap: {
    width: '75%',          // 고정된 값 대신 화면 크기의 85%로 설정
    paddingVertical: 24,   // 상하 여백
    paddingHorizontal: 17, // 좌우 여백
    borderRadius: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 11,
  },
  boldText: {
    fontSize: responsiveFontSize(2.3),
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  subText: {
    fontSize: responsiveFontSize(1.8),
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',      // 텍스트 중앙 정렬
    lineHeight: 24,           // 줄 간 간격 설정
    flexWrap: 'wrap', 
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%', // 버튼들이 모달 안에 들어가도록 폭을 맞춤
    marginTop: 20, // 텍스트와 버튼 사이에 여백 추가
  },
  greenBtn: {
    flex: 1,
    backgroundColor: '#1ECD90',
    borderRadius: 24,
    height: responsiveHeight(6.5),
    justifyContent: 'center',
    alignItems: 'center',
  },
  greenBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InPolygonModal;
