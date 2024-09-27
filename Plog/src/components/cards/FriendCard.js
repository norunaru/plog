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

export default function FriendCard({name, profile, level}) {
  let a = 0;
  if (profile == 'jaejun') a = jaejun;
  else if (profile == 'yonghoon') a = yonghoon;
  else if (profile == 'gawon') a = gawon;

  return (
    <View style={styles.wrap}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image style={styles.profileImg} source={a} />
        <View style={{}}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.levelBadge}>
            <Text style={styles.levelText}>{level}레벨</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    padding: 16,
    backgroundColor: '#F7F7F7',
    borderColor: '#D9D9D9',
    borderRadius: 12,
    borderWidth: 1,
    width: 150,
    marginRight: 8,
  },
  profileImg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'black',
  },
  levelBadge: {
    // paddingHorizontal: 8,
    // paddingVertical: 2,
    paddingHorizontal: 4,
    paddingVertical: 1,
    backgroundColor: '#BAF0D7',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  levelText: {
    fontSize: 12,
    color: '#00A68A',
    marginBottom: 4,
  },
});
