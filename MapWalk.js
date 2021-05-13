import { Container, Content, Text, Header, Button, StyleProvider, Card, Input, Form } from 'native-base';
import { StyleSheet, Dimensions } from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import styles from './style.js';
import 'react-native-gesture-handler';
import * as Location from 'expo-location';
import MapView from "react-native-maps";
import * as FriendWalkDB from './FriendWalkDB.js';

var verbose = false; //DEBUGGING LOG
const mapHeader = '[MAP DEBUG] ';

class MapWalk extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walker_uuid: props.route.params.walker_uuid,
      region: {
          latitude: 10,
          longitude: 20,
          latitudeDelta: .05,
          longitudeDelta: .05,
        },
      error: '',
    }
  }

  async componentDidMount() {
    // Asking for device location permission
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      this.getLocationAsync();
    } else {
      this.setState({ error: "Locations services needed" });
    }
  }


  async componentWillUnmount() {
    this.location_listener.remove()
  }

  async componentDidUpdate(){
    if(verbose) console.log(mapHeader + "Region: " + JSON.stringify(this.state.region))
  }


  getLocationAsync = async () => {
    this.location_listener = await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        distanceInterval: 1,
        timeInterval: 10000
      },
      newLocation => {
        let { coords } = newLocation;
        if(verbose) console.log(mapHeader + coords);
        let region = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: .05,
          longitudeDelta: .05,
        };
        this.setState({region: region});

      FriendWalkDB.updateDatabase(this.state.walker_uuid, {location_region: this.state.region});
    })
  };

  render() {
    return (
      <Container style={stylemap.container}>
        <Content>
          <MapView style={stylemap.map}
            region={this.state.region}
            showsCompass={true}
            showsUserLocation={true}
            rotateEnabled={true}
            showsUserLocation = {true}
            followsUserLocation = {true}
            ref={map => {
              this.map = map;
            }}
              />
          </Content>
    </Container>
    );
  }


}

const stylemap = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});


export default MapWalk;
