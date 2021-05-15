import { Container, Content, Text, Button, Card, Input, Form } from 'native-base';
import * as React from 'react';
import styles from './style.js';
import 'react-native-gesture-handler';
import "firebase/auth";
import "firebase/database";
import * as firebase from 'firebase';
import moment from 'moment';
import * as FriendWalkDB from './FriendWalkDB.js';

class watchMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      walker_uuid: props.route.params.walker_uuid,
      watcher_uuid: props.route.params.watcher_uuid,
      messageArray: [],
      messageInput: ''
    }
    console.log(this.state.walker_uuid);
    FriendWalkDB.getMessage(this);
  }

  sendMessage() {
    FriendWalkDB.sendMessage(this.state, this.state.walker_uuid, this.state.watcher_uuid);
    this.input._root.clear();
  }

  createCards() {
    if (this.state.messageArray.length != 0) {
      let cards = this.state.messageArray.map(message => (
        //Using a ternary operator for an if statement inside of map
        //https://stackoverflow.com/questions/44969877/if-condition-inside-of-map-react
        this.state.watcher_uuid == message.sender ?
        <Card style={styles.sendCard}>
                <Text style={styles.alignRight}>{message.messageText}</Text>
                <Text style={styles.alignRight}>{message.date}</Text>
        </Card>
        :
        <Card style={styles.receiveCard}>
                <Text style={styles.text}>{message.messageText}</Text>
                <Text style={styles.text}>{message.date}</Text>
        </Card>
      ));
      return cards;
    }
  }


  render() {
    return (
      <Container style={styles.container}>
        <Content padder style={styles.content} style={{ padding: 10 }}>
          {this.createCards()}
          <Form style={styles.form}>
            <Text style={styles.text}>Enter your message.</Text>
            <Input onChangeText = {value => this.setState({messageInput: value})} ref={(ref) => { this.input = ref }}></Input>
          </Form>
          <Button style={styles.button} onPress={() => this.sendMessage()}><Text>Send</Text></Button>

        </Content>
        
      </Container>
    );
  }
}

export default watchMain;
