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

class MapWatch extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        walker_uuid: props.route.params.walker_uuid,
        watcher_uuid: props.route.params.watcher_uuid,
        region: null,
        }
  }
  
  async componentDidMount() {
    this.grabLocation()
  }

  async componentWillUnmount() {
    var database = firebase.database().ref("users/" + this.state.walker_uuid);
    database.off()
  }


  async grabLocation() {
    var database = firebase.database().ref("users/" + this.state.walker_uuid );
    var snapshot = database.on('value', (snapshot) => {
      console.log(dbHeader + "Testing snapshot: " + snapshot);
      var childKey = snapshot.key;
      var childData = snapshot.val().location_region;
      console.log(dbHeader + "Uuid: " + childKey + " location_region " + childData);
      this.setState({region: childData});
    })
  }

    
    
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

export default MapWatch;
