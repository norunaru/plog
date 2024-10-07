import React, { useState } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import UpdateDeleteModal from '../modals/UpdateDeleteModal';
import leftIcon from '../../../assets/icons/ic_back.png';
import menyIcon from '../../../assets/icons/meny.png';

const PloggingDetailHeader = ({navigation, headerText}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <SafeAreaView style={styles.headerWrap}>

      {isModalOpen && (
        <UpdateDeleteModal
          isVisible={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onEdit={() => {
            console.log('Edit pressed');
            setIsModalOpen(false);
          }}
          onDelete={() => {
            console.log('Delete pressed');
            setIsModalOpen(false);
          }}
        />
      )}

      <Pressable onPress={() => navigation.goBack()}>
        <Image source={leftIcon} style={styles.left} />
      </Pressable>
      <Text style={styles.headerText}>{headerText}</Text>
      <Pressable onPress={() => setIsModalOpen(true)}>
        <Image source={menyIcon} style={styles.meny} />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerWrap: {
    width: '100%',
    height: 60,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1.5,
    borderBottomColor: '#E8E8E8',
  },
  left: {
    width: 24,
    height: 24,
  },
  meny: {
    width: 24,
    height: 24,
  },
  headerText: {
    color: 'black',
    fontSize: responsiveFontSize(2),
    height: '100%',
    fontWeight: 'semiBold',
    textAlign: 'center',   
    flex: 1,
    lineHeight: 45,
    marginLeft: -10,
  },
});

export default PloggingDetailHeader;
