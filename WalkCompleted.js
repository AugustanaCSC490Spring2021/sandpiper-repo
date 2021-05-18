import { Container, Content, Text, Header, Button, StyleProvider, Card, View } from 'native-base';
import { StyleSheet, Dimensions } from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Col, Row, Grid } from 'react-native-easy-grid';
import styles from './style.js';
import 'react-native-gesture-handler';

//code snippet obtained from: https://docs.nativebase.io/docs/GetStarted.html
class WalkCompleted extends React.Component {
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
                    Walk Completed
                    </Text>
                  </View>
                  <Button
                  onPress={() => this.props.navigation.navigate('Friend Walk')}>
                  <Text>
                  Done
                  </Text>
                  </Button>
                </Content>
            </Container>
        );
    }
}

export default WalkCompleted;
