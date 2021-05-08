import { Container, Content, Text, Header, Button, StyleProvider, Card, Input, Form } from 'native-base';
import { StyleSheet, Dimensions } from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import styles from './style.js';
import { View } from "react-native";
import 'react-native-gesture-handler';
import "firebase/auth";
import "firebase/database";
import * as firebase from 'firebase';
import * as Location from 'expo-location';
import MapView from "react-native-maps";

class MapWalk extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      walker_uuid: props.route.params.walker_uuid,

      region: null,
      error: '',
    }
  }

  async componentDidMount() {
    // Asking for device location permission
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      this.getLocationAsync();

      //var database = firebase.database().ref("users/" + this.state.walker_uuid);
      //database.update({ location_region: coord });
      
    } else {
      this.setState({ error: "Locations services needed" });
    }
  }

  
  getLocationAsync = async () => {
    var database = firebase.database().ref("users/" + this.state.walker_uuid);
    //var updateData = database.getInstance().getReference("location_region")
//.//child(this.state.walker_uuid);
    // watchPositionAsync Return Lat & Long on Position Change
    
    this.location = await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        distanceInterval: 1,
        timeInterval: 10000
      },
      newLocation => {
        let { coords } = newLocation;
        //console.log(coords);
        let region = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.045,
          longitudeDelta: 0.045
        };
        this.setState({ region: region });
        console.log(this.state.region);
        //this.state.region.push(region);
        database.set(region)
      },

      //this.setState({ region: newLocation });
      error => console.log(error),
    )
    
    //console.log("hhelo" + this.location.region);
    //database.update({ location_region: this.state.region });
    return this.location;
  };

  
  
  
  render() {
    return (
      <View style={stylemap.container}>
        <MapView
          initialRegion={this.state.region}
          showsCompass={true}
          showsUserLocation={true}
          rotateEnabled={true}
          ref={map => {
            this.map = map;
          }}
          style={styles.map}
        />
      </View>
    );
  }
}

const stylemap = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});


export default MapWalk;
