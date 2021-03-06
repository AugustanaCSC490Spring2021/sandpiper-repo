import { Container, Content, Text, Header, Button, StyleProvider, Card } from 'native-base';
import { StyleSheet, Dimensions, View } from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import styles from './style.js';
import 'react-native-gesture-handler';
import uuid from "react-native-uuid";
import * as FriendWalkDB from './FriendWalkDB.js';
import { useRoute } from '@react-navigation/native';

class WatchQueue extends React.Component {
  constructor(props) {
    super(props);
    var listener = null
    this.state = {
      matched: false,
      walker_uuid: '',
      watcher_uuid: uuid.v1()
    };
  }

async componentDidMount() {
  listener = FriendWalkDB.pairWatcher(this)
}

async componentDidUpdate() {
  if(this.state.matched == true && this.state.walker_uuid != ''){
    console.log('Final State: ' + this.state.toString())
    this.props.navigation.navigate('Watch Main', {watcher_uuid: this.state.watcher_uuid, walker_uuid: this.state.walker_uuid})
  }
}

async componentWillUnmount(){
  FriendWalkDB.closeListener(listener);
  console.log("Component update with this state");
}

  render() {
    return (
      <Container style={styles.container}>
        <Content padder style = {styles.content}>
          <View
          style={styles.queueView}>
          <Text style = {styles.queueText}>
          Waiting to be matched...
          </Text>
        </View>
        </Content>
      </Container>
    );
  }
}


export default WatchQueue;
