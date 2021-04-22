import { Container, Content, Text, Header, Button, StyleProvider } from 'native-base';
import { StyleSheet, Dimensions } from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import styles from './style.js';
import 'react-native-gesture-handler';


class FriendWalk extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <Content padder style = {styles.content}>
        <Button style = {styles.button}
        onPress={() => this.props.navigation.navigate('Walk Form')}>
          <Text style = {styles.text}>
            Walk
          </Text>
        </Button>
        <Button style = {styles.button}
          onPress={() => this.props.navigation.navigate('Watch Queue')}>
          <Text style = {styles.text}>
            Watch
          </Text>
        </Button>
        <Button style = {styles.buttonWIP}>
          <Text style = {styles.text}>
            How to use Friend Walk
          </Text>
        </Button>
        </Content>
      </Container>
    );
  }
}


export default FriendWalk;
