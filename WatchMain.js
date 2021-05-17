import { Container, Content, Text, Header, Button, StyleProvider, Card, Input, Form } from 'native-base';
import { StyleSheet, Dimensions } from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import styles from './style.js';
import { Linking } from 'react-native';
import 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';
import MapView from "react-native-maps";
import * as FriendWalkDB from './FriendWalkDB.js';

class WatchMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      walker_uuid: props.route.params.walker_uuid,
      watcher_uuid: props.route.params.watcher_uuid,
      messageArray: [],
      messageInput: '',

      region: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: .05,
        longitudeDelta: .05
      }
    }
    FriendWalkDB.getMessage(this);
  }

  async componentDidMount() {
    listener = FriendWalkDB.grabLocation(this, this.state.walker_uuid);
  }



  async componentWillUnmount() {
    FriendWalkDB.closeListener(listener)
  }

  sendMessage() {
    //Issue for clearing the input of an Input part from native base
    //https://github.com/GeekyAnts/NativeBase/issues/320
    FriendWalkDB.sendMessage(this.state, this.state.walker_uuid, this.state.watcher_uuid);
    this.input._root.clear();
  }

  createCards() {
    if (this.state.messageArray.length != 0) {
      let cards = this.state.messageArray.map(message => (
        //Using a ternary operator for an if statement inside of map
        //https://stackoverflow.com/questions/44969877/if-condition-inside-of-map-react
        this.state.watcher_uuid == message.sender ?
        <Card style={styles.sendCard} key={message.date}>
                <Text style={styles.alignRight}>{message.messageText}</Text>
                <Text style={styles.alignRight}>{message.date}</Text>
        </Card>
        :
        <Card style={styles.receiveCard} key={message.date}>
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
         <Content style={styles.content}>
        <MapView style={styles.map}
          region={this.state.region}
          ref={map => {
            this.map = map;
          }}>
          <MapView.Circle center={{
              latitude: this.state.region.latitude,
              longitude: this.state.region.longitude
            }} radius={100} strokeColor={'#002F6C'} fillColor={'#002F6C'}/>
        </MapView>
        {this.createCards()}
        <Form style={styles.form}>
            <Text style={styles.text}>Enter your message.</Text>
            <Input onChangeText = {value => this.setState({messageInput: value})} ref={(ref) => { this.input = ref }}></Input>
        </Form>
        <Button block style={styles.button} onPress={() => this.sendMessage()}>
          <Text style = {styles.text}>Send</Text>
        </Button>
      </Content>
      </Container>
    );
  }
}

export default WatchMain;
