/* eslint-disable react/prop-types */
import React from 'react';
import {
  ActivityIndicator, StyleSheet, Text, TextInput, View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    margin: 20,
    marginTop: 40,
    height: 60,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  title: {
    alignSelf: 'center',
    fontSize: 12,
    color: 'green',
    fontWeight: 'bold',
  },
  location: {
    height: 40,
    textAlign: 'center',
    fontSize: 13,
  },
  spinner: {
    margin: 10,
  },
});

function LocationSearch(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>PICKUP LOCATION</Text>
      {props.value && (
        <TextInput
          style={styles.location}
          value={props.value}
        />
      )}
      {!props.value && (
        <ActivityIndicator style={styles.spinner} />
      )}
    </View>
  );
}

export default LocationSearch;
