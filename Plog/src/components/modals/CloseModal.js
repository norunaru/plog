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
        width: 275,
        height: 170,
        backgroundColor: 'white',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        borderRadius: 24,
    },
    modalTitle: {
        fontSize: responsiveFontSize(1.6),
        fontWeight: 'bold',
        color: '#0F1012',
    },
    modalMessage: {
        width: 193,
        height: 34,
        fontSize: responsiveFontSize(1.2),
        fontWeight: '500',
        textAlign: 'center',
        color: '#66666D'
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
