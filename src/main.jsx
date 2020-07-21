/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import { StyleSheet, View, Animated } from 'react-native';
import MapView from 'react-native-maps';
import GeoCoder from 'react-native-geocoding';
import car from './img/car.png';
import ClassSelection from './components/classSelection';
import ConfirmationModal from './components/confirmationModal';
import LocationPin from './components/locationPin';
import LocationSearch from './components/locationSearch';

GeoCoder.init('AIzaSyByQWma6tBLCBtTyWvOQUr_PVUMKjdtICI');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullScreenMap: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      position: null,
      confirmationModalVisible: false,
      carLocations: [
        {
          rotation: 78,
          latitude: 37.78725,
          longitude: -122.4318,
        },
        {
          rotation: -10,
          latitude: 37.79015,
          longitude: -122.4318,
        },
        {
          rotation: 262,
          latitude: 37.78525,
          longitude: -122.4348,
        },
      ],
    };
    this.initialRegion = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.00922,
      longitudeDelta: 0.00421,
    };
  }

  _onRegionChange = (region) => {
    this.setState({ position: null });
    const self = this;
    if (this.timeoutId) clearTimeout(this.timeoutId);
    this.timeoutId = setTimeout(async () => {
      try {
        const res = await GeoCoder.from({
          lat: region.latitude,
          lng: region.longitude,
        });

        self.setState({
          position: res.results[0].formatted_address,
        });
      } catch (err) {
        console.log(err);
      }
    }, 2000);
  };

  _onBookingRequest = () => {
    this.setState({
      confirmationModalVisible: true,
    });
  };

  componentDidMount = () => {
    this._onRegionChange.call(this, this.initialRegion);
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.fullScreenMap}
          initialRegion={this.initialRegion}
          onRegionChange={this._onRegionChange}
        >
          {this.state.carLocations.map((carLocation, i) => (
            <MapView.Marker
              key={i}
              coordinate={carLocation}
            >
              <Animated.Image
                style={{
                  transform: [
                    {
                      rotate: `${carLocation.rotation}deg`,
                    },
                  ],
                }}
                source={car}
              />
            </MapView.Marker>
          ))}
        </MapView>
        <LocationSearch value={this.state.position} />
        <LocationPin onPress={this._onBookingRequest} />
        <ClassSelection />
        <ConfirmationModal
          visible={this.state.confirmationModalVisible}
          onClose={() => {
            this.setState({
              confirmationModalVisible: false,
            });
          }}
        />
      </View>
    );
  }
}

export default Main;
