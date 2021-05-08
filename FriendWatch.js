import { Container, Content, Text, Header, Button, StyleProvider, Card } from 'native-base';
import { StyleSheet, Dimensions, View } from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import styles from './style.js';
import 'react-native-gesture-handler';
import uuid from "react-native-uuid";
import * as FriendWalkDB from './FriendWalkDB.js';

class WatchQueue extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      matched: false,
      walker_uuid: '',
      watcher_uuid: uuid.v1()
    };
  }

async componentDidMount() {
  FriendWalkDB.pairWatcher(this)
}

async componentDidUpdate() {
  if(this.state.matched == true){
    this.props.navigation.navigate('Watch Main', {watcher_uuid: this.state.watcher_uuid})
  }
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
        </Content>
      </Container>
    );
  }
}


export default WatchQueue;
