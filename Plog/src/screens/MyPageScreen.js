import React from 'react';
import {View, Text} from 'react-native';
import TopBar from '../components/TopBar';

export default function MyPageScreen() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TopBar />
      <Text>My Page Screen</Text>
    </View>
  );
}
