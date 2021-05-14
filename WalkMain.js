import { Container, Content, Text, Button, Card, Input, Form } from 'native-base';
import * as React from 'react';
import styles from './style.js';
import 'react-native-gesture-handler';
import "firebase/auth";
import "firebase/database";
import * as firebase from 'firebase';
import moment from 'moment';
import * as Location from 'expo-location';
import * as FriendWalkDB from './FriendWalkDB.js';
import { valueToNode } from '@babel/types';


class WalkMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      walker_uuid: props.route.params.walker_uuid,
      watcher_uuid: props.route.params.watcher_uuid,
      messageArray: [],
      messageInput: '',


      location: {coords: { latitude: null, longitude: null}},
      geocode: null,
      errorMessage: "",
    }
    FriendWalkDB.getMessage(this);
  }

  componentDidMount() {
    this.getLocationAsync();
  }

  sendMessage() {
    //Issue for clearing the input of an Input part from native base
    //https://github.com/GeekyAnts/NativeBase/issues/320
    FriendWalkDB.sendMessage(this.state, this.state.walker_uuid, this.state.walker_uuid);
    this.input._root.clear();
  }

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
  };

    getGeocodeAsync = async (location) => {
      let geocode = await Location.reverseGeocodeAsync(location)
      this.setState({ geocode })
    };

  sendLocation() {
      //this.getLocationAsync();
      var database = firebase.database().ref("users/" + this.state.walker_uuid);
      database.update({ location: this.state.location });
    console.log(this.state.location);
  }

  createCards() {
    if (this.state.messageArray.length != 0) {
      let cards = this.state.messageArray.map(message => (
        //Using a ternary operator for an if statement inside of map
        //https://stackoverflow.com/questions/44969877/if-condition-inside-of-map-react
        this.state.walker_uuid == message.sender ?
        <Card style={{backgroundColor: 'yellow'}}>
                <Text style={{textAlign: 'right'}}>{message.messageText}</Text>
                <Text style={{textAlign: 'right'}}>{message.date}</Text>
        </Card>
        :
        <Card style={{backgroundColor: 'red'}}>
                <Text style={styles.text}>{message.messageText}</Text>
                <Text style={styles.text}>{message.date}</Text>
        </Card>
      ));
      return cards;
    }
  }
  render() {
    return (
      
      <Container style={styles.container}>
        <Content padder style={styles.content} style={{ padding: 10 }}>
          {this.createCards()}
          <Form style={styles.form}>
            <Text style={styles.text}>Enter your message.</Text>
            <Input onChangeText = {value => this.setState({messageInput: value})} ref={(ref) => { this.input = ref }}></Input>
          </Form>
          <Button style={styles.button} onPress={() => this.sendMessage()}><Text>Send</Text></Button>
          <Button style={styles.button} onPress={() => this.sendLocation()}><Text>Share Location</Text></Button>

        </Content>
        
      </Container>

    );
  }
}

export default WalkMain;
