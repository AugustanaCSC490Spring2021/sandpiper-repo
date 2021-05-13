import { Container, Content, Text, Header, Button, StyleProvider, Card } from 'native-base';
import { StyleSheet, Dimensions } from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import styles from './style.js';
import { Linking } from 'react-native';
import 'react-native-gesture-handler';
import "firebase/auth";
import "firebase/database";
import MapView from "react-native-maps";
import * as FriendWalkDB from './FriendWalkDB.js';


var verbose = false; //DEBUGGING LOG
const mapHeader = '[MAP DEBUG] ';

class MapWatch extends React.Component {

    constructor(props) {
        var listener = null
        super(props);
        this.state = {
        walker_uuid: props.route.params.walker_uuid,
        watcher_uuid: props.route.params.watcher_uuid,
        region: {
          latitude: 0,
          longitude: 0,
          latitudeDelta: .05,
          longitudeDelta: .05,
        },
        }
  }
  
  async componentDidMount() {
    listener = this.grabLocation()
  }

  async componentWillUnmount() {
    FriendWalkDB.closeListener(listener)
  }


  async grabLocation() {
    FriendWalkDB.grabLocation(this, this.state.walker_uuid);
  }

    
    
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

export default MapWatch;
