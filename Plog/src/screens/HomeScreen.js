import React from 'react';
import {View, Text, Button} from 'react-native';

export default function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Detail')}
      />
      <Button 
        title="Recommend"
        onPress={() => navigation.navigate('Recommend')}
      />
      <Button 
        title="CourseDetail"
        onPress={() => navigation.navigate('CourseDetail')}
      />
    </View>
  );
}
