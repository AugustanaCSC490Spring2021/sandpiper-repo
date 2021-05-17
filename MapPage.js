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
        {title: 'Denkmann',
        coordinates: {
          latitude: 41.5045,
              longitude: -90.5506
            },
          }
      
      ]
    };
  }



  

  render() {
    return (<Container style={styles.map_container}>
      <Content style={stylemap.container} >
        <MapView style={stylemap.map} region={this.state.region} showsCompass={true} rotateEnabled={true} showsUserLocation={true}  ref={map => {
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
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});

export default MapPage
