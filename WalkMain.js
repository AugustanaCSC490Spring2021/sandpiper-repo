import { Container, Content, Text, Header, Button, StyleProvider, Card, Input, Form } from 'native-base';
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
import * as firebase from 'firebase';
import moment from 'moment';
import * as Location from 'expo-location';
import { valueToNode } from '@babel/types';


class WalkMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      walker_uuid: props.route.params.walker_uuid,
      messageArray: [],
      messageInput: '',

    }
  }



  sendMessage() {
    var database = firebase.database().ref("users/" + this.state.walker_uuid);
    let now = new Date();
    let Message = {
      messageText: this.state.messageInput,
      date: moment().format('YYYY-MM-DD hh:mm:ss'),
      sender: this.state.walker_uuid
    }
    //let newMessage = new Message({text: this.state.message, date: now.getDate, sender: this.state.walker_uuid});
    console.log("MESSAGE: " + Message.messageText + " " + Message.date + " " + Message.sender);
    this.state.messageArray.push(Message);
    database.update({messages: this.state.messageArray});
  }


  sendLocation() {
      this.props.navigation.navigate('MapWalk', {walker_uuid: this.state.walker_uuid});
  }

  render() {
    return (
      <Container style={styles.container}>
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

export default WalkMain;
