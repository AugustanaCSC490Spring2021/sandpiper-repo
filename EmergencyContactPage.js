import { Container, Content, Text, Header, Button, StyleProvider, Card } from 'native-base';
import { StyleSheet, Dimensions } from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import styles from './style.js';
import 'react-native-gesture-handler';

class MainScreen extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <Content padder style={styles.content}>
          <Grid>
            <Col style={styles.leftContent}>
            <Button style={styles.textBlockWIP}>
            <Text style={styles.text}>
              911 {'\n'}
            </Text>
          </Button>
          <Button style={styles.textBlockWIP}>
            <Text style={styles.text}>
              Public Safety{'\n'}
              309-794-7000
            </Text>

          </Button>
          <Button style={styles.textBlockWIP}>
            <Text style={styles.text}>
              Rock Island Police Department
              {'\n'}
              309- 732-2677
            </Text>
          </Button>
            </Col>
            <Col style={styles.rightContent}>
            <Button style={styles.textBlockWIP}>
            <Text style={styles.text}>
              National Suicide Prevention Line {'\n'}
              800-273-8255
            </Text>
          </Button>
          <Button style={styles.textBlockWIP}>
            <Text style={styles.text}>
              Poison Control Center  {'\n'}
              800-222-1222
            </Text>
          </Button>
          <Button style={styles.textBlockWIP}>
            <Text style={styles.text}>
              Dean Of Students{'\n'}
              309-794-7533{'\n'}

            </Text>
          </Button>
            </Col>
          </Grid>


        </Content>
      </Container>
    );
  }
}

export default MainScreen;
