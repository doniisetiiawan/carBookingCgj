/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  Modal,
  View,
  Text,
  Animated,
  Easing,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import loading from '../img/loading.png';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#0006',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'white',
    alignSelf: 'center',
    padding: 20,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  title: {
    textAlign: 'right',
    paddingTop: 5,
    fontSize: 12,
  },
  spinner: {
    resizeMode: 'contain',
    height: 50,
    width: 50,
    margin: 50,
    alignSelf: 'center',
  },
  closeButton: {
    backgroundColor: '#333',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  closeButtonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 20,
  },
});

class ConfirmationModal extends Component {
  // eslint-disable-next-line camelcase
  UNSAFE_componentWillMount = () => {
    this._animatedValue = new Animated.Value(0);
  };

  cycleAnimation = () => {
    Animated.sequence([
      Animated.timing(this._animatedValue, {
        toValue: 100,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
      Animated.timing(this._animatedValue, {
        toValue: 0,
        duration: 0,
        useNativeDriver: true,
      }),
    ]).start(() => {
      this.cycleAnimation();
    });
  };

  componentDidMount = () => {
    this.cycleAnimation();
  };

  render() {
    const interpolatedRotateAnimation = this._animatedValue.interpolate({
      inputRange: [0, 100],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <Modal
        animationType="fade"
        visible={this.props.visible}
        transparent
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <Text style={styles.title}>
              Contacting nearest car...
            </Text>
            <Animated.Image
              style={[
                styles.spinner,
                {
                  transform: [
                    { rotate: interpolatedRotateAnimation },
                  ],
                },
              ]}
              source={loading}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={this.props.onClose}
            >
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
}

export default ConfirmationModal;
