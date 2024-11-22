import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import chevronLeft from '../../../assets/icons/ic_back.png';

const RecommendHeader = ({navigation, headerText}) => {
  return (
    <SafeAreaView style={styles.headerWrap}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backWrap}>
        <Image source={chevronLeft} style={styles.chevron} />
      </Pressable>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: responsiveFontSize(2.1),
            height: '100%',
            fontWeight: '400',
          }}>
          {headerText}
        </Text>
      </View>
      <View style={styles.box} />
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
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
  },
  chevron: {
    width: 24,
    height: 24,
  },
  headerIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
    marginTop: 3,
  },
  box: {
    width: responsiveWidth(12),
  },
  backWrap: {
    width: responsiveWidth(12),
    height: responsiveHeight(4),
    justifyContent: 'center',
  },
});

export default RecommendHeader;
