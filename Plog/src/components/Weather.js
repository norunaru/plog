import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

const Weather = () => {
  return (
    <View style={styles.box}>
      <View style={styles.fontBox}>
        <Text style={styles.font}>대기환경</Text>
      </View>
      <View style={styles.weatherBox}>
        <Image
          source={require('../../assets/images/ic_weather.png')}
          style={styles.imageBox}
        />
        <View style={styles.contentBox}>
          <View style={styles.title}>
            <Text style={styles.titleFont}>맑음</Text>
          </View>
          <View style={styles.content}>
            <Text style={[styles.contentFont, styles.space]}>
              현재 기온 <Text style={styles.gray}>|</Text> 27℃ (80.6℉)
            </Text>
            <Text style={[styles.contentFont, styles.space]}>
              현재 습도 <Text style={styles.gray}>|</Text> 70%
            </Text>
            <Text style={styles.contentFont}>
              미세 먼지 <Text style={styles.gray}>|</Text>{' '}
              <Text style={styles.orange}>보통</Text> (77CAI)
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: '100%',
    height: 177,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
  },
  fontBox: {
    position: 'absolute',
    height: 21,
    left: 16,
    top: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  font: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#0F1012',
    lineHeight: 15 * 1.4,
  },
  weatherBox: {
    position: 'absolute',
    left: 24,
    top: 49,
    width: 268,
    height: 104,
  },
  imageBox: {
    position: 'absolute',
    top: 2,
    width: 100,
    height: 100,
  },
  contentBox: {
    position: 'absolute',
    left: 120,
    width: 148,
    height: 104,
    paddingVertical: 8,
  },
  title: {
    position: 'absolute',
    width: 55,
    height: 26,
    backgroundColor: '#1ECD90',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleFont: {
    fontSize: 13,
    fontWeight: 'semibold',
    color: '#FFFFFF',
    lineHeight: 13 * 1.4,
  },
  content: {
    position: 'absolute',
    width: 148,
    height: 70,
    top: 34,
  },
  contentFont: {
    fontSize: 13,
    lineHeight: 13 * 1.4,
    color: '#202025',
  },
  gray: {
    color: '#66666D',
  },
  orange: {
    color: '#FFA600',
  },
  space: {
    marginBottom: 8,
  },
});

export default Weather;
