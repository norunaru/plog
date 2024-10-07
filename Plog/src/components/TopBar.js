import React from 'react';
import {SafeAreaView, View, StyleSheet, Image, Dimensions} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
const {width} = Dimensions.get('window');

const TopBar = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.box}>
        <View style={styles.barArea}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logoImage}
          />
          <Image
            source={require('../../assets/images/btn_notice.png')}
            style={styles.noticeImage}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 0,
    backgroundColor: '#FFFFFF',
    position: 'absolute',
    top: 0,
  },
  box: {
    width: width,
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  barArea: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  logoImage: {
    width: 66,
    height: 25,
    marginLeft: responsiveWidth(3),
  },
  noticeImage: {
    width: 48,
    height: 48,
  },
});

export default TopBar;
