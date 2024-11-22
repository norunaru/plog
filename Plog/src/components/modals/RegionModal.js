import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth
} from 'react-native-responsive-dimensions';
import Modal from "react-native-modal";

const RegionModal = ({ isVisible, onClose, onSelect, options }) => {
  return (
    <Modal 
      isVisible={isVisible} 
      onBackdropPress={onClose}
      style={styles.modalContainer}
    >
      <View style={styles.modalContent}>
        <FlatList
          data={options}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.regionItem} 
              onPress={() => {
                onSelect(item);
                onClose();
              }}
            >
              <Text style={styles.regionText}>{item}</Text>
            </TouchableOpacity>
          )}
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
  regionItem: {
    width: 311,
    height: 43,
    justifyContent: 'space-evenly',
    marginTop: responsiveHeight(0.5),
    marginLeft: responsiveWidth(3),
  },
  regionText: {
    fontSize: responsiveFontSize(1.6),
    color: "#202025",
    fontWeight: '500',
  },
  closeBtn: {
    marginTop: 15,
    alignItems: "center",
  },
  closeText: {
    fontSize: 18,
    color: "#1ECD90",
  },
});

export default RegionModal;
