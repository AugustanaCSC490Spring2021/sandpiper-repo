import { Container, Content, Text, Header, Button, StyleProvider, Card } from 'native-base';
import { StyleSheet, Dimensions } from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import styles from './style.js';
import 'react-native-gesture-handler';

class MainScreen extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <Content padder style = {styles.content}>
          <Button style = {styles.buttonWIP}>
            <Text style = {styles.text}>
              Secure in place
            </Text>
          </Button>
          <Button style = {styles.buttonWIP}>
            <Text style = {styles.text}>
              Shelter in place
            </Text>
          </Button>
          <Button style = {styles.buttonWIP}>
            <Text style = {styles.text}>
              Evacuation
            </Text>
          </Button>
          <Button style = {styles.buttonWIP}>
            <Text style = {styles.text}>
              Concerning Behavior
            </Text>
          </Button>
          <Button style = {styles.button}
          onPress={() => this.props.navigation.navigate('Dorm Resources')}>
            <Text style = {styles.text}>
              Dorm Emergency Procedures
            </Text>
          </Button>
          <Button style = {styles.button}
          onPress={() => this.props.navigation.navigate('ResourceDisplay', 
          {pdfUrl: 'https://www.augustana.edu/files/2019-03/Emergency%20Hazardous%20Spill%20Response%20%2719-20_0.pdf'})}>
            <Text style = {styles.text}>
              Hazardous Material
            </Text>
          </Button>
          <Button style = {styles.buttonWIP}>
            <Text style = {styles.text}>
              Facility Emergency
            </Text>
          </Button>
          <Button style = {styles.buttonWIP}>
            <Text style = {styles.text}>
              Weather Emergency
            </Text>
          </Button>
          <Button style = {styles.buttonWIP}>
            <Text style = {styles.text}>
              Medical Emergency
            </Text>
          </Button>
          <Button style = {styles.buttonWIP}>
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
