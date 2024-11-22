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

export default function FriendCard({name, profile, level}) {
  return (
    <View style={styles.wrap}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          style={styles.profileImg}
          source={{uri: profile}} // 이미지 URL을 받아와서 표시
          resizeMode="cover" // 이미지가 커버되도록 설정
        />
        <View>
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
    backgroundColor: 'black',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
    color: 'black',
  },
  levelBadge: {
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
