import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import chevronLeft from '../../../assets/icons/ic_back.png';

const RecommendHeader = ({navigation, headerText}) => {
  return (
    <View style={styles.headerWrap}>
      <Pressable onPress={() => navigation.goBack()}>
        <Image source={chevronLeft} style={styles.chevron} />
      </Pressable>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image 
          source={require('../../../assets/icons/ic_location.png')}
          style={styles.headerIcon}
        />
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            height: '100%',
            fontWeight: '400',
          }}>
          {headerText}
        </Text>
      </View>
      <View></View>
    </View>
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
    justifyContent: 'space-between',
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
  }
});

export default RecommendHeader;
