import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from "react-native-modal";
import {
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

const CloseModal = ({isVisible, onClose, onExit}) => {
  return (
    <Modal isVisible={isVisible} style={styles.modal}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>선택을 종료하시겠어요?</Text>
        <Text style={styles.modalMessage}>
          종료 시, 선택한 내용은 저장되지 않으며, {'\n'}맞춤형 플로깅 코스를 추천받을 수 없어요.
        </Text>
        <View style={styles.modalButtons}>
          <TouchableOpacity style={styles.continueButton} onPress={onClose}>
            <Text style={styles.buttonText}>계속하기</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.exitButton} onPress={onExit}>
            <Text style={styles.buttonText}>종료하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
    modal: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContent: {
        width: '75%',          // 고정된 값 대신 화면 크기의 85%로 설정
        paddingVertical: 24,   // 상하 여백
        paddingHorizontal: 17, // 좌우 여백
        borderRadius: 24,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 11,
    },
    modalTitle: {
        fontSize: responsiveFontSize(2.3),
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 8,
    },
    modalMessage: {
        fontSize: responsiveFontSize(1.5),
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',      // 텍스트 중앙 정렬
        lineHeight: 24,           // 줄 간 간격 설정
        flexWrap: 'wrap', 
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%',
    },
    continueButton: {
        width: 118,
        height: 52,
        backgroundColor: '#9B9BA3',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    exitButton: {
        width: 118,
        height: 52,
        backgroundColor: '#FF5168',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});

export default CloseModal;
