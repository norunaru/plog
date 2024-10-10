import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth
} from 'react-native-responsive-dimensions';
import Modal from "react-native-modal";

const EnvironmentModal = ({ isVisible, onClose, onSelect, options, displayRank, alreadySelected }) => {
  return (
    <Modal 
      isVisible={isVisible} 
      onBackdropPress={onClose}
      style={styles.modalContainer}
    >
      {alreadySelected && (
          <View style={styles.alertBox}>
            <Text style={styles.alertText}>이미 선택된 옵션이에요</Text>
          </View>
      )}
      <View style={styles.modalContent}>
        <FlatList
          data={options}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.EnvironmentItem} 
              onPress={() => {
                onSelect(item);
              }}
            >
              <View style={styles.textContainer}>
                <Text style={[styles.EnvironmentText, item === displayRank && styles.disablesText]}>{item}</Text>
                {item === displayRank && <Text style={styles.rankText}>1순위</Text>}
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />

      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: responsiveWidth(80),
    height: 244,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  EnvironmentItem: {
    width: responsiveWidth(70),
    height: 52,
    justifyContent: 'center',
    marginTop: responsiveHeight(0.5),
    marginLeft: responsiveWidth(3),
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  EnvironmentText: {
    fontSize: responsiveFontSize(1.6),
    color: "#202025",
    fontWeight: '500',
  },
  rankText: {
    color: "#1ECD90",
    fontSize: responsiveHeight(1.4),
    fontWeight: '500',
  },
  disablesText: {
    color: '#9B9BA3',
    fontSize: responsiveFontSize(1.6),
    fontWeight: '500',
  },
  alertBox: {
    width: responsiveWidth(70),
    height: responsiveHeight(6),
    borderRadius: 30,
    backgroundColor: '#202025',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: responsiveHeight(2),
  },
  alertText: {
    color: '#fff',
    fontSize: responsiveFontSize(1.6),
    fontWeight: '400'
  },
});

export default EnvironmentModal;
