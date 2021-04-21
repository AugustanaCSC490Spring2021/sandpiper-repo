import { Container, Content, Text, Header, Button, StyleProvider, Label, Form, Item, Input } from 'native-base';
import { StyleSheet, Dimensions } from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import styles from './style.js';
import 'react-native-gesture-handler';

class WalkForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      studentID: '',
      destination: '',
      phoneNum: '',
      friendsNum: ''
    };
  }

  render() {
    return (
      <Container style={styles.container}>
        <Content padder>
        <Form style={styles.form}>
        <Item floatingLabel styles={styles.item}>
          <Label>Name: </Label>
          <Input
          onChangeText= {value=>this.setState({name: value})}
          >
          </Input>
        </Item>
        <Item floatingLabel styles={styles.item}>
          <Label>Student ID: </Label>
          <Input
          onChangeText= {value=>this.setState({studentID: value})}
          >
          </Input>
        </Item>
        <Item floatingLabel styles={styles.item}>
          <Label>Destination: </Label>
          <Input
          onChangeText= {value=>this.setState({destination: value})}
          >
          </Input>
        </Item>
        <Item floatingLabel styles={styles.item}>
          <Label>Phone Number: </Label>
          <Input
          onChangeText= {value=>this.setState({phoneNum: value})}
          >
          </Input>
        </Item>
        <Item floatingLabel styles={styles.item}>
          <Label>Friend's Phone Number: </Label>
          <Input
          onChangeText= {value=>this.setState({friendsNum: value})}
          >
          </Input>
        </Item>
        </Form>
        <Button style={styles.button}>
          <Text style={styles.text}>
            Submit
          </Text>
        </Button>
        </Content>
      </Container>
    );
  }
}
export default WalkForm;
