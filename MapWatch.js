import {
  Container,
  Content,
  Text,
  Header,
  Button,
  StyleProvider,
  Card
} from 'native-base';
import {StyleSheet, Dimensions} from "react-native";
import * as Font from 'expo-font';
import {Ionicons} from '@expo/vector-icons';
import * as React from 'react';
import {Col, Row, Grid} from 'react-native-easy-grid';
import styles from './style.js';
import {Linking} from 'react-native';
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
        longitudeDelta: .05
      }
    }
  }

  async componentDidMount() {
    listener = FriendWalkDB.grabLocation(this, this.state.walker_uuid);
  }

  async componentDidUpdate() {
    console.log("Updating MapWatch.js's component")
  }

  async componentWillUnmount() {
    FriendWalkDB.closeListener(listener)
  }

  render() {
    return (<Container style={stylemap.container}>
      <Content>
        <MapView style={stylemap.map} region={this.state.region} ref={map => {
            this.map = map;
          }}>
          <MapView.Circle center={{
              latitude: this.state.region.latitude,
              longitude: this.state.region.longitude
            }} radius={100} strokeColor={'#002F6C'} fillColor={'#002F6C'}/>
        </MapView>
      </Content>
    </Container>);
  }

}

const stylemap = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
});

export default MapWatch;
