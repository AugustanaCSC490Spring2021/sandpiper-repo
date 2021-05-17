import { Container, Content, Text, Header, Button, StyleProvider, Card } from 'native-base';
import { StyleSheet, Dimensions } from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import styles from './style.js';
import { Linking } from 'react-native';
import 'react-native-gesture-handler';

class MainScreen extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <Content padder style={styles.content} style={{ padding: 10 }}>

          <Button block style={styles.button}
            onPress={() => Linking.openURL('tel:${911}')}>
            <Text style={styles.text}>
            Emergency Services{'\n'}
                    911
            </Text>
          </Button>
          <Button block style={styles.button}
            onPress={() => Linking.openURL('tel:${309-794-7000}')}>
            <Text style={styles.text}>
              Public Safety{'\n'}
              309-794-7000
            </Text>

          </Button>
          <Button block style={styles.button}
            onPress={() => Linking.openURL('tel:${309-732-2677}')}>

            <Text style={styles.text}>
              Rock Island Police Department
              {'\n'}
              309- 732-2677
            </Text>
          </Button>


          <Button block style={styles.button}
            onPress={() => Linking.openURL('tel:${800-273-8255}')}>

            <Text style={styles.text}>
              National Suicide Prevention Line {'\n'}
              800-273-8255
            </Text>
          </Button>
          <Button block style={styles.button}
            onPress={() => Linking.openURL('tel:${800-222-1222}')}>

            <Text style={styles.text}>
              Poison Control Center  {'\n'}
              800-222-1222
            </Text>
          </Button>
          <Button block style={styles.button}
            onPress={() => Linking.openURL('tel:${309-794-7533}')}>

            <Text style={styles.text}>
              Dean Of Students{'\n'}
              309-794-7533
            </Text>
          </Button>


        </Content>
      </Container>
    );
  }
}

export default MainScreen;
