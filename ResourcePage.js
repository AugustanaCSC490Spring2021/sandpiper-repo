import { Container, Content, Text, Header, Button, StyleProvider, Card } from 'native-base';
import { StyleSheet, Dimensions } from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import styles from './style.js';
import 'react-native-gesture-handler';

//code snippet obtained from: https://docs.nativebase.io/docs/GetStarted.html
class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: true,
    };
  }


  render() {
    return (
      <Container style={styles.container}>
        <Content padder style = {styles.content}>
          <Button style = {styles.button}>
            <Text style = {styles.text}>
              Secure in place
            </Text>
          </Button>
          <Button style = {styles.button}>
            <Text style = {styles.text}>
              Shelter in place
            </Text>
          </Button>
          <Button style = {styles.button}>
            <Text style = {styles.text}>
              Evacuation
            </Text>
          </Button>
          <Button style = {styles.button}>
            <Text style = {styles.text}>
              Concerning Behavior
            </Text>
          </Button>
          <Button style = {styles.button}>
            <Text style = {styles.text}>
              Hazardous Material
            </Text>
          </Button>
          <Button style = {styles.button}>
            <Text style = {styles.text}>
              Facility Emergency
            </Text>
          </Button>
          <Button style = {styles.button}>
            <Text style = {styles.text}>
              Weather Emergency
            </Text>
          </Button>
          <Button style = {styles.button}>
            <Text style = {styles.text}>
              Medical Emergency
            </Text>
          </Button>
          <Button style = {styles.button}>
            <Text style = {styles.text}>
              Physical Threat Emergency
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default MainScreen;
