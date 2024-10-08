import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  Pressable,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const {width} = Dimensions.get('window');

const TopBar = () => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  return (
    <SafeAreaView style={styles.safeArea}>
      {isInfoOpen && (
        <View style={styles.info}>
          <Text style={styles.boldText}>플로깅이란?</Text>

          <Text style={styles.subText}>
            플로깅은 2016년 스웨덴에서 시작된 달리면서 길거리의 쓰레기를 줍는
            운동입니다.
          </Text>
        </View>
      )}
      <View style={styles.box}>
        <View style={styles.barArea}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logoImage}
          />
          <Pressable onPress={() => setIsInfoOpen(!isInfoOpen)}>
            <Image
              source={require('../../assets/images/btn_notice.png')}
              style={styles.noticeImage}
            />
          </Pressable>
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
    zIndex: 3,
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
  info: {
    zIndex: 10,
    padding: 16,
    maxWidth: 180,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#1ECD90',
    backgroundColor: 'white',
    position: 'absolute',
    right: 10,
    top: 70,
  },
  boldText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 8,
  },
  subText: {
    fontSize: 13,
    color: '#202025',
  },
});

export default TopBar;
