import React from "react";
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import MainScreen from './src/screens/MainScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MainScreen/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});

export default App;