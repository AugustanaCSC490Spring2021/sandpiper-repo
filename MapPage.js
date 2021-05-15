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

class MapPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      error: '',
    };
  }

  async componentDidMount() {
    // Asking for device location permission
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      this._getLocationAsync();
    } else {
      this.setState({ error: "Locations services needed" });
    }
  }

  _getLocationAsync = async () => {
    
    // watchPositionAsync Return Lat & Long on Position Change
    this.location = await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        distanceInterval: 1,
        timeInterval: 10000
      },
      newLocation => {
        let { coords } = newLocation;
        console.log(coords);
        let region = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.045,
          longitudeDelta: 0.045
        };
        this.setState({ region: region });
       // console.log(this.state.region)
      },
      error => console.log(error)
    );
    console.log(this.location.coords);
    return this.location;
  };



  render() {
    return (<Container style={styles.map_container}>
      <Content style={stylemap.container} >
        <MapView style={stylemap.map} region={this.state.region} showsCompass={true} rotateEnabled={true} showsUserLocation={true} followsUserLocation={true} ref={map => {
            this.map = map;
          }}/>
      </Content>

      <Content padder style={styles.content} style={{ padding: 10 }}>
          <Form style={styles.form}>
            <Text style={styles.text}>Enter your message.</Text>
            <Input onChangeText = {value => this.setState({messageInput: value})}></Input>
          </Form>
          <Button style={styles.button} onPress={() => this.sendMessage()}><Text>Send</Text></Button>
          <Button style={styles.button} onPress={() => this.sendLocation()}><Text>Share Location</Text></Button>
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
    width: 0.8  *Dimensions.get('window').width,
    height: 0.4* Dimensions.get('window').height,
    alignItems: "center",
    marginTop:12, 
    //height: 540, // you can customize this
    //width: 400,  // you can customize this
  }
});

export default MapPage
