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

  async startPairing() {
    listener = FriendWalkDB.checkIfPaired(this, this.state.walker_uuid);
}

    async componentDidMount() {
      this.startPairing()
      console.log(this.state.walker_uuid)
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
