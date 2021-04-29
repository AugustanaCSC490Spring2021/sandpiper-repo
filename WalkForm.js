import { Container, Content, Text, Header, Button, StyleProvider, Label, Form, Item, Input } from 'native-base';
import { StyleSheet, Dimensions } from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import styles from './style.js';
import 'react-native-gesture-handler';
import uuid from "react-native-uuid";
import { useRoute } from '@react-navigation/native';


// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/database";

//import { REACT_APP_FIREBASE_API_KEY } from 'react-native-dotenv'
// const API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
var firebaseConfig = {
  apiKey: "AIzaSyAXhoMqorexwwYImNQuFUIBqFmaXz3SMqU",
  authDomain: "vikingready-d4167.firebaseapp.com",
  databaseURL: "https://vikingready-d4167-default-rtdb.firebaseio.com",
  projectId: "vikingready-d4167",
  storageBucket: "vikingready-d4167.appspot.com",
  messagingSenderId: "409187750267",
  appId: "1:409187750267:web:793290bf3bb99f93fcedde",
  measurementId: "G-CL5F67YSNN"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();


class WalkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walker_name: '',
      walker_studentID: '',
      walker_destination: '',
      walker_phoneNum: '',
      walker_friendsNum: '',
      havePaired: false,
      walker_gps_coordinates: '',
      friendwalk_chat: [],
      walker_uuid: uuid.v1(),
      watcher_uuid: '',
      isPinged: false,
      disabledSubmit: true,

    };

  }

  checkToDisable(){
    //TODO:
    if(this.state.walker_name !== '' && this.state.disabledSubmit === true){
      this.setState({disabledSubmit: false});
    }
    if(this.state.walker_name === '' && this.state.disabledSubmit === false){
      this.setState({disabledSubmit: true});
    }
  }

  Submit(){
    this.updateDatabase();
    this.props.navigation.navigate('Walk Queue', {walker_uuid: this.state.walker_uuid});
  }

  updateDatabase(){
    console.log("Updating database...")
      firebase
        .database()
        .ref('users/' + this.state.walker_uuid)
        .set(this.state);
  }

  componentDidUpdate(){
    this.checkToDisable()
  }

  async compoentDidUnmount() {
    firebase.close()
  }

  render() {
    //learned the switching of background color for a disabled button from: https://reactnativecode.com/disabled-button-state/
    return (
      <Container style={styles.container}>
        <Content padder>
        <Form style={styles.form}>
        <Item floatingLabel styles={styles.item}>
          <Label>Name: </Label>
          <Input
          onChangeText= {value=>this.setState({walker_name: value})}
          >
          </Input>
        </Item>
        <Item floatingLabel styles={styles.item}>
          <Label>Student ID: </Label>
          <Input
          onChangeText= {value=>this.setState({walker_studentID: value})}
          >
          </Input>
        </Item>
        <Item floatingLabel styles={styles.item}>
          <Label>Destination: </Label>
          <Input
          onChangeText= {value=>this.setState({walker_destination: value})}
          >
          </Input>
        </Item>
        <Item floatingLabel styles={styles.item}>
          <Label>Phone Number: </Label>
          <Input
          onChangeText= {value=>this.setState({walker_phoneNum: value})}
          >
          </Input>
        </Item>
        <Item floatingLabel styles={styles.item}>
          <Label>Friend's Phone Number: </Label>
          <Input
          onChangeText= {value=>this.setState({walker_friendsNum: value})}
          >
          </Input>
        </Item>
        </Form>
        <Button style={[styles.button, { backgroundColor: this.state.disabledSubmit ? '#474747' : '#FFDD00' }]}
          disabled={this.state.disabledSubmit}
          onPress={() => this.Submit()}>
          <Text style={styles.text}>
            Submit
          </Text>
        </Button>
        </Content>
      </Container>
    );
  }
}
export default WalkForm;
