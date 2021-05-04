import { Container, Content, Text, Header, Button, StyleProvider, Card, View } from 'native-base';
import { StyleSheet, Dimensions } from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import styles from './style.js';
import 'react-native-gesture-handler';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

//code snippet obtained from: https://docs.nativebase.io/docs/GetStarted.html
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {coords: { latitude: 37.78825, longitude: -122.4324}},
      geocode: null,
      errorMessage: "",
      mapRegion: null,
    }
  }

  componentDidMount() {
    this.getLocationAsync();
  }

  handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };


  getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
    const { latitude , longitude } = location.coords
    this.getGeocodeAsync({latitude, longitude})
    this.setState({ location: { latitude, longitude } });
    this.setState({
        mapRegion: {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
    });
    
  };



    getGeocodeAsync = async (location) => {
      let geocode = await Location.reverseGeocodeAsync(location)
      this.setState({ geocode })
    };

  render(){
    const {location,geocode, errorMessage } = this.state
    return (
      
      <View style={styles.containermap}>
        <MapView
          provider={MapView.PROVIDER_GOOGLE}
          style={styles.map}
          region={this.state.mapRegion}
          onRegionChange={this.handleMapRegionChange}
        >
        {!!this.state.location.latitude && !!this.state.location.longitude && <MapView.Marker
                        coordinate={{"latitude": this.state.location.latitude, "longitude": this.state.location.longitude}}
                    />}
        </MapView>
        
      </View>
    
    );
  }
}


export default Map;
