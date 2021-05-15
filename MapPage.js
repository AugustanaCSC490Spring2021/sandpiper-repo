import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import {Dimensions} from 'react-native';  
import * as Location from "expo-location";
import styles from './style.js';
import {
  Container,
  Content,
  Text,
  Header,
  Button,
  StyleProvider,
  Card,
  Input,
  Form
} from 'native-base';
import style from "./style";
import * as FriendWalkDB from './FriendWalkDB.js';

class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      error: '',

      markers: [
        { title: 'Olin',
          coordinates: {
          latitude: 41.5031,
          longitude: -90.5507}, },
        {title: 'Old Main',
        coordinates: {
          latitude: 41.5044,
              longitude: -90.5496
            },
        },
        {title: 'Evald',
        coordinates: {
          latitude: 41.5052,
              longitude: -90.5499
            },
        },
        {title: 'Gerber',
        coordinates: {
          latitude: 41.5023,
              longitude: -90.5507
            },
        },
        {title: 'Swenson',
        coordinates: {
          latitude: 41.5045,
              longitude: -90.5506
            },
          }
      
      ]
    };
  }



  async componentDidMount() {
    // Asking for device location permission
    const {status} = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      this.getLocationAsync();
    } else {
      this.setState({error: "Locations services needed"});
    }
  }

  async componentWillUnmount() {
    this.location_listener.remove()

  }


  getLocationAsync = async () => {
    this.location_listener = await Location.watchPositionAsync({
      enableHighAccuracy: true,
      distanceInterval: 1,
      timeInterval: 10000
    }, newLocation => {
      let {coords} = newLocation;
      console.log(coords);
      let region = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.045
      };
      this.setState({region: region});
      FriendWalkDB.updateDatabase(this.state.walker_uuid, {location_region: this.state.region})
    })
  }



  render() {
    return (<Container style={styles.map_container}>
      <Content style={stylemap.container} >
        <MapView style={stylemap.map} region={this.state.region} zoomEnabled={true} showsCompass={true} rotateEnabled={true} showsUserLocation={true} followsUserLocation={true} ref={map => {
            this.map = map;
        }}>
          {this.state.markers.map((marker, index) => (
            <MapView.Marker
              key={index} 	
              coordinate={marker.coordinates}
              title={marker.title}
            />
          ))}
          </MapView>
      </Content>

    </Container>
      
      
    );
  }
}

const stylemap = StyleSheet.create({
  container: {
    flex: 1,
    //backgroundColor: '#FFDD00',
        //width: 0.8  *Dimensions.get('window').width,
    //height: 0.4* Dimensions.get('window').height,
    ///alignItems: "center",
    
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});

export default MapPage
