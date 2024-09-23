import React from 'react';
import {View, Text} from 'react-native';
import TopBar from '../components/TopBar';

export default function CommunityScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TopBar />
      <Text>Community Screen</Text>
    </View>
  );
}
