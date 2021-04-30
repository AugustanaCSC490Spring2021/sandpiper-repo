import { Container, Content, Text, Header, Button, StyleProvider } from 'native-base';
import { StyleSheet, Dimensions, View } from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import styles from './style.js';
import 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';

import * as FriendWalkDB from './FriendWalkDB.js';


class WalkQueue extends React.Component {
  constructor(props) {
    var listener = null
    super(props);
    this.state = {
      walker_uuid: props.route.params.walker_uuid,
      isMatched: false,
    };
  }

<<<<<<< HEAD
  async startPairing() {
    listener = FriendWalkDB.checkIfPaired(this, this.state.walker_uuid);
}

    async componentDidMount() {
      this.startPairing()
      console.log(this.state.walker_uuid)
=======
  async updateWalkers() {
    var database = firebase.database().ref("users");

    //console.log("Updating walkers");
    //TODO make the list a queue so that no one is left behind
    var snapshot = await database.limitToLast(1).orderByChild("walker_uuid").equalTo(this.state.walker_uuid).on('value', (snapshot) => {
      //console.log("Testing snapshot: " + snapshot);
      snapshot.forEach((childSnapshot) => {
        //console.log("Parsing...");
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val().havePaired;
        //console.log("One result: " + childKey + " " + childData);
        //Next: set havePaired to true, and set the watcher uuid to this device's uuid
        if(childData){
          this.setState({isMatched: true});
        }
      })
    });
}

    async componentDidMount() {
      this.updateWalkers()
      //console.log(this.state.walker_uuid)
>>>>>>> began getMessage method
    }

    async componentDidUpdate(){
      if(this.state.isMatched){
        this.props.navigation.navigate('Walk Main', {walker_uuid: this.state.walker_uuid});
      }
    }

    async componentWillUnmount(){
      FriendWalkDB.closeListener(listener);
    }

  render() {
    return (
      <Container style={styles.container}>
        <Content padder style = {styles.content}>
        <View
        style={{
        flexDirection: "row",
        height: 400,
        width: 350,
        padding: 50,
        backgroundColor: '#FFDD00'
      }}>
          <Text>
          Waiting to be matched...
          </Text>
        </View>
        <Button
          onPress={() => this.setState({isMatched: true})}>
          <Text>
          Matched!
          </Text>
        </Button>
        </Content>
      </Container>
    );
  }
}


export default WalkQueue;
