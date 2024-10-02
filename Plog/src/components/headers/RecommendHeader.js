import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from 'react-native';
import chevronLeft from '../../../assets/icons/ic_back.png';
import location from '../../../assets/icons/ic_location.png';

const RecommendHeader = ({navigation, headerText}) => {
  return (
    <SafeAreaView style={styles.headerWrap}>
      <Pressable onPress={() => navigation.goBack()}>
        <Image source={chevronLeft} style={styles.chevron} />
      </Pressable>
      <Text style={styles.headerText}>
        {headerText}
      </Text>
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
  chevron: {
    width: 24,
    height: 24,
  },
  headerText: {
    color: 'black',
    fontSize: 18,
    height: '100%',
    fontWeight: 'semiBold',
    textAlign: 'center',   
    flex: 1,
    lineHeight: 45,
    marginLeft: -10,
  },
});

export default RecommendHeader;
