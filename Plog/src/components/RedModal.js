import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const RedModal = ({
  onClose,
  whiteBtnFn,
  redBtnFn,
  boldText,
  subText,
  whiteBtnText,
  redBtnText,
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
          <TouchableOpacity style={styles.whiteBtn} onPress={onClose}>
            <Text style={styles.whiteBtnText}>{whiteBtnText}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.greenBtn} onPress={redBtnFn}>
            <Text style={styles.greenBtnText}>{redBtnText}</Text>
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
    flex: 1,
    backgroundColor: 'black',
    opacity: 0.5,
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  modalWrap: {
    width: 275,
    height: 168,
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 17,
    borderRadius: 24,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 11,
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  subText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: responsiveHeight(3),
  },
  whiteBtn: {
    flex: 1,
    backgroundColor: '#9B9BA3',
    borderRadius: 24,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  greenBtn: {
    flex: 1,
    backgroundColor: '#FF5168',
    borderRadius: 24,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  greenBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RedModal;
