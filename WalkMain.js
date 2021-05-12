import { Container, Content, Text, Button, Card, Input, Form } from 'native-base';
import * as React from 'react';
import styles from './style.js';
import 'react-native-gesture-handler';
import "firebase/auth";
import "firebase/database";
import * as firebase from 'firebase';
import moment from 'moment';

class WalkMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     // walker_uuid: props.route.params.walker_uuid,
     //uuid test
      walker_uuid: props.route.params.walker_uuid,
      watcher_uuid: props.route.params.watcher_uuid,
      messageArray: [],
      messageInput: ''
    }
  }

  sendMessage() {
    var database = firebase.database().ref("users/" + this.state.walker_uuid);
    let now = new Date();
    let Message = {
      messageText: this.state.messageInput,
      date: moment().format('YYYY-MM-DD hh:mm:ss'),
      sender: this.state.walker_uuid
    }
    //let newMessage = new Message({text: this.state.message, date: now.getDate, sender: this.state.walker_uuid});
    console.log("MESSAGE: " + Message.messageText + " " + Message.date + " " + Message.sender);
    this.state.messageArray.push(Message);
    database.update({messages: this.state.messageArray});
    this.setState({messageInput: ''});
  }

  async getMessage(){
    firebase.database().ref("users/" + this.state.walker_uuid+"/messages/").on('value', (snapshot)=>{
      this.setState({messageArray: snapshot.val()});  
    })
  }

  createCards() {
    if (this.state.messageArray.length != 0) {
      console.log(this.state.messageArray);
      let cards = this.state.messageArray.map(message => (
        //Using a ternary operator for an if statement inside of map
        //https://stackoverflow.com/questions/44969877/if-condition-inside-of-map-react
        this.state.walker_uuid == message.sender ?
        <Card style={{backgroundColor: 'yellow'}}>
                <Text style={{textAlign: 'right'}}>{message.messageText}</Text>
                <Text style={{textAlign: 'right'}}>{message.date}</Text>
        </Card>
        :
        <Card style={{backgroundColor: 'red'}}>
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
            <Input onChangeText = {value => this.setState({messageInput: value})}></Input>
          </Form>
          <Button style={styles.button} onPress={() => this.sendMessage()}><Text>Send</Text></Button>
          <Button style={styles.button} onPress={() => this.getMessage()}><Text>Get</Text></Button>

        </Content>
        
      </Container>

    );
  }
}

export default WalkMain;
