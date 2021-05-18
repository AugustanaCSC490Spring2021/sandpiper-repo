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

                        <Text style={styles.textHeaderMain}>How to Use Friend Walk!{'\n'}</Text>
                        {'\n'}
                    
                        <Text style={styles.textHeaderMain}>How to: Walker{'\n'}</Text>
                        {'\n'}
                        <Text style={styles.textHeader}>Step One{'\n'}</Text>
                        As a walker, you'll first need to fill out your information, including your name, Student ID, phone number, and destination.
                        {'\n'}
                        {'\n'}
                        <Text style={styles.textHeader}>Step Two{'\n'}</Text>
                        Once you are paired with a watcher, you can begin moving to your destination! Feel free to chat with the watcher from the walk screen.
                        {'\n'}
                        {'\n'}
                        <Text style={styles.textHeader}>Step Three{'\n'}</Text>
                        When you reach your destination, press "I have reached my destination". You will be unpaired from the watcher and your session will end.
                        
                        {'\n'}
                        {'\n'}{'\n'}
                        <Text style={styles.textHeaderMain}>How to: Watcher{'\n'}</Text>
                        {'\n'}
           
                              
                      
                        <Text style={styles.textHeader}>Step One{'\n'}</Text>
                        As a watcher, you will wait to be queued with the next available walker.
                        {'\n'}
                        {'\n'}
                        <Text style={styles.textHeader}>Step Two{'\n'}</Text>
                        Once you are paired with a watcher, you will be taken to the watch screen where you can observe and chat with the walker.
                        {'\n'}
                        {'\n'}
                        <Text style={styles.textHeader}>Step Three{'\n'}</Text>
                        Track and talk to the walker until they reach their destination. When they end the pairing, you will return to the selection menu.
                        
                        {'\n'}
                        {'\n'}
                        


                    </Text>
                  </View>

                </Content>
            </Container>
        );
    }
}

export default MainScreen;
