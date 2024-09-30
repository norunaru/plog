import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import jaejun from '../../../assets/images/재준소.webp';
import yonghoon from '../../../assets/images/용훈.jpg';
import gawon from '../../../assets/images/가원.webp';

export default function FriendManageCard({
  name,
  profileURL,
  level,
  ploggingCnt,
}) {
  return (
    <View style={styles.wrap}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image style={styles.profileImg} source={''} />
        <View style={{}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.name}>{name}</Text>
            <View style={styles.levelBadge}>
              <Text style={styles.levelText}>{level}레벨</Text>
            </View>
          </View>
          <Text style={styles.plogCnt}>{ploggingCnt}번의 플로깅</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    padding: 16,
    backgroundColor: 'white',
    borderColor: '#D9D9D9',
    borderRadius: 12,
    borderWidth: 1,
    width: '100%',
    marginBottom: 8,
  },
  profileImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 4,
    backgroundColor: 'gray',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'black',
    marginRight: 4,
  },
  levelBadge: {
    // paddingHorizontal: 8,
    // paddingVertical: 2,
    paddingHorizontal: 4,
    paddingVertical: 1,
    backgroundColor: '#E7F7EF',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 12,
    color: '#00A68A',
    marginBottom: 4,
  },
  plogCnt: {
    fontSize: 11,
    color: '#3F3F47',
  },
});
