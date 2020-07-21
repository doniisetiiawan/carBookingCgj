import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import classBar from '../img/classBar.png';
import classxhc from '../img/class.png';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    height: 80,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 10,
  },
  classBar: {
    width: width * 0.7,
    left: width * 0.15,
    resizeMode: 'contain',
    height: 30,
    top: 35,
  },
  classButton: {
    top: 30,
    justifyContent: 'center',
    borderRadius: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    position: 'absolute',
    backgroundColor: 'white',
    height: 40,
    width: 40,
  },
  classButtonImage: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 30,
  },
  classButtonContainer: {
    backgroundColor: 'transparent',
    position: 'absolute',
    height: 70,
    top: 10,
  },
  classLabel: {
    paddingTop: 5,
    fontSize: 12,
  },
});

class ClassSelection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      classButtonPosition: new Animated.Value(
        15 + width * 0.1,
      ),
    };
  }

  _onClassChange = (className) => {
    if (className === 'superior') {
      Animated.timing(this.state.classButtonPosition, {
        toValue: width * 0.77,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }

    if (className === 'special') {
      Animated.timing(this.state.classButtonPosition, {
        toValue: width * 0.5 - 20,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }

    if (className === 'economy') {
      Animated.timing(this.state.classButtonPosition, {
        toValue: 15 + width * 0.1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.classBar} source={classBar} />
        <Animated.View
          style={[
            styles.classButton,
            { left: this.state.classButtonPosition },
          ]}
        >
          <Image
            style={styles.classButtonImage}
            source={classxhc}
          />
        </Animated.View>
        <TouchableOpacity
          style={[
            styles.classButtonContainer,
            { width: width / 3 - 10, left: width * 0.11 },
          ]}
          onPress={() => this._onClassChange('economy')}
        >
          <Text style={styles.classLabel}>economy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.classButtonContainer,
            { width: width / 3, left: width / 3 },
          ]}
          onPress={() => this._onClassChange('special')}
        >
          <Text
            style={[
              styles.classLabel,
              { textAlign: 'center' },
            ]}
          >
            Special
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.classButtonContainer,
            { width: width / 3, right: width * 0.11 },
          ]}
          onPress={() => this._onClassChange('superior')}
        >
          <Text
            style={[
              styles.classLabel,
              { textAlign: 'right' },
            ]}
          >
            Superior
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ClassSelection;
