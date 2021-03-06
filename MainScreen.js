import { Container, Content, Text, Header, Button, StyleProvider } from 'native-base';
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
          <Button block
            style = {styles.button}
            onPress={() => this.props.navigation.navigate('Emergency Contacts')}>
            <Text style= {styles.text}>
              Emergency Contacts
            </Text>
          </Button>

          <Button block
          style = {styles.button}
          onPress={() => this.props.navigation.navigate('Friend Walk')}>
            <Text style = {styles.text}>
              Friend Walk
            </Text>
          </Button>

          <Button block
          style = {styles.button}
          onPress={() => this.props.navigation.navigate('Resources')}>
            <Text style = {styles.text}>
              Resources
            </Text>
          </Button>

          <Button block
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Map')}>
            <Text style = {styles.text}>
              Map
            </Text>
          </Button>

          <Button block
          style = {styles.button}
          onPress={() => this.props.navigation.navigate('About')}>

            <Text style = {styles.text}>
              About the app
            </Text>
          </Button>

        </Content>
      </Container>
    );
  }
}

export default MainScreen;
