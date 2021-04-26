import { Container, Content, Text, Header, Button, StyleProvider, Card } from 'native-base';
import { StyleSheet, Dimensions, View } from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import styles from './style.js';
import 'react-native-gesture-handler';
import "firebase/auth";
import "firebase/database";
import * as firebase from 'firebase';
import uuid from "react-native-uuid";

class WatchQueue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matched: false,
      walker_uuid: ''
    };
  }

  async updateWalkers() {
    var res = '';

    var database = firebase.database().ref("users");

    console.log("Updating walkers");
    //TODO make the list a queue so that no one is left behind
    var snapshot = await database.limitToLast(1).orderByChild("havePaired").equalTo(false).once('value', (snapshot) => {
      console.log("Testing snapshot: " + snapshot);
      snapshot.forEach((childSnapshot) => {
        console.log("Parsing...");
        var childKey = childSnapshot.key;
        var childData = childSnapshot.val().havePaired;
        console.log("One result: " + childKey + " " + childData);
        //Next: set havePaired to true, and set the watcher uuid to this device's uuid
        this.updateDatabase(childSnapshot.key);
        this.setState({walker_uuid: childKey});
      })
    });

  return res;
}

updateDatabase(userId){
  console.log("Updating database...")
    firebase
      .database()
      .ref('users/' + userId)
      .update({havePaired: true,
            watcher_uuid: uuid.v1()});
    this.setState({matched: true});
}

async componentDidMount() {
  this.updateWalkers();
  console.log(this.state)
}

async componentDidUpdate() {
  if(this.state.matched == true){
    this.props.navigation.navigate('Watch Main')
  }
  console.log("Component update with this state")
  console.log(this.state.toString())
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
          Insert loading animation
          </Text>
        </View>
        <Button
          onPress={() => this.updateWalkers()}>
          <Text>
          Update
          </Text>
        </Button>
        <Button>
          <Text>
          Matched!
          </Text>
        </Button>
        </Content>
      </Container>
    );
  }
}


export default WatchQueue;
