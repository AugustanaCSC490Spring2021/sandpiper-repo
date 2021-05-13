import { Container, Content, Text, Header, Button, StyleProvider, Card } from 'native-base';
import { StyleSheet, Dimensions } from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import styles from './style.js';
import { Linking } from 'react-native';
import 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';

class WatchMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      walker_uuid: props.route.params.walker_uuid,
      watcher_uuid: props.route.params.watcher_uuid,
    }
  }

  getLocation() {
    this.props.navigation.navigate('MapWatch', {walker_uuid: this.state.walker_uuid});
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content padder style={styles.content} style={{ padding: 10 }}>
          <Button style={styles.button} onPress={() => this.getLocation()}><Text>Get Location</Text></Button>


        </Content>
      </Container>
    );
  }
}

export default WatchMain;
