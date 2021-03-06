import { Container, Content, Text, Header, Button, StyleProvider, Card, View } from 'native-base';
import { StyleSheet, Dimensions } from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
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
                <Content padder style={styles.content}>
                  <View style = {styles.button}>
                    <Text style={styles.text} >

                        <Text style={styles.textHeader}>Developers {'\n'}</Text>

                    April Tran, Daniel Zwiener, Michael Setlock, Michael Wardach{'\n'}

                        <Text style={styles.textHeader}>Consultants{'\n'}</Text>

          Forrest Stonedahl,  etc.{'\n'}

                        <Text style={styles.textHeader}>Privacy Policy{'\n'}</Text>
          We will not collect any personal information without your permission. Login information is only used to verify you are an Augustana student.{'\n'}
          Location will be used for Friend Walks to keep track of you location for safety.
{'\n'}


                    </Text>
                  </View>

                </Content>
            </Container>
        );
    }
}

export default MainScreen;
