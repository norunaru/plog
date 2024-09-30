import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
  Pressable,
} from 'react-native';
import chevronLeft from '../../../assets/icons/ic_back.png';
import location from '../../../assets/icons/ic_location.png';

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
        {/* <Image
          style={{width: 16, height: 16, marginRight: 8}}
          source={location}
        /> */}
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            height: '100%',
            fontWeight: 'bold',
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
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
  },
  chevron: {
    width: 24,
    height: 24,
  },
});

export default RecommendHeader;
