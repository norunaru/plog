import React from 'react';
import {View, Text, Button} from 'react-native';

export default function DetailScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Detail Screen (No Tab Bar)</Text>
      <Button title="Go Back" onPress={() => navigation.goBack()} />
    </View>
  );
}
