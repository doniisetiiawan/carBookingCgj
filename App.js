/* eslint-disable react/jsx-filename-extension,react/style-prop-object */
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Main from './src/main';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Main />
    </View>
  );
}
