import { Container, Content, Text, Header, Button, StyleProvider } from 'native-base';
import { StyleSheet, Dimensions, View } from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import styles from './style.js';
import 'react-native-gesture-handler';


class WalkQueue extends React.Component {
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


export default WalkQueue;