import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import pencilIcon from '../../../assets/icons/ic_pencil.png'
import trashIcon from '../../../assets/icons/ic_trash.png'
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const UpdateDeleteModal = ({ isVisible, onClose, onEdit, onDelete }) => {
  return (
    <Modal
      isVisible={isVisible} 
      style={styles.modal}
      onBackdropPress={onClose}
    >
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.option} onPress={onEdit}>
          <Image source={pencilIcon} style={styles.icon} />
          <Text style={styles.updateText}>수정</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={onDelete}>
          <Image source={trashIcon} style={styles.icon} />
          <Text style={styles.deleteText}>삭제</Text>
        </TouchableOpacity>

      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    width: responsiveWidth(90),
    alignSelf: 'center',
  },
  option: {
    flexDirection: 'row',
    paddingVertical: 10,
    width: responsiveWidth(60),
  },
  updateText: {
    fontSize: responsiveFontSize(2),
    marginLeft: 10,
    color: '#0F1012',
    fontWeight: 'semibold',
  },
  deleteText: {
    fontSize: responsiveFontSize(2),
    marginLeft: 10,
    color: '#FF5168',
    fontWeight: 'semibold',
  },
  icon: {
    width: responsiveWidth(6),
    height: responsiveHeight(3),
    resizeMode: 'contain',
  },
});

export default UpdateDeleteModal;
