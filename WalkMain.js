import { Container, Content, Text, Button, Card, Input, Form } from 'native-base';
import * as React from 'react';
import styles from './style.js';
import 'react-native-gesture-handler';
import "firebase/auth";
import "firebase/database";
import * as firebase from 'firebase';
import moment from 'moment';
import * as Location from 'expo-location';
import { valueToNode } from '@babel/types';


class WalkMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     // walker_uuid: props.route.params.walker_uuid,
     //uuid test
      walker_uuid: props.route.params.walker_uuid,
      watcher_uuid: props.route.params.watcher_uuid,
      messageArray: [],
      messageInput: '',


      location: {coords: { latitude: null, longitude: null}},
      geocode: null,
      errorMessage: "",
    }
    this.getMessage();
  }

  componentDidMount() {
    this.getLocationAsync();
  }

  sendMessage() {
    var database = firebase.database().ref("users/" + this.state.walker_uuid);
    let Message = {
      messageText: this.state.messageInput,
      date: moment().format('YYYY-MM-DD hh:mm:ss'),
      sender: this.state.walker_uuid
    }
    //let newMessage = new Message({text: this.state.message, date: now.getDate, sender: this.state.walker_uuid});
    console.log("MESSAGE: " + Message.messageText + " " + Message.date + " " + Message.sender);
    this.state.messageArray.push(Message);
    database.update({messages: this.state.messageArray});
    //Issue for clearing the input of an Input part from native base
    //https://github.com/GeekyAnts/NativeBase/issues/320
    this.input._root.clear();
  }

  getLocationAsync = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({accuracy:Location.Accuracy.Highest});
    const { latitude , longitude } = location.coords
    this.getGeocodeAsync({latitude, longitude})
    this.setState({ location: { latitude, longitude } });
  };

    getGeocodeAsync = async (location) => {
      let geocode = await Location.reverseGeocodeAsync(location)
      this.setState({ geocode })
    };

  sendLocation() {
      //this.getLocationAsync();
      var database = firebase.database().ref("users/" + this.state.walker_uuid);
      database.update({ location: this.state.location });
    console.log(this.state.location);
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
            <Input onChangeText = {value => this.setState({messageInput: value})} ref={(ref) => { this.input = ref }}></Input>
          </Form>
          <Button style={styles.button} onPress={() => this.sendMessage()}><Text>Send</Text></Button>
          <Button style={styles.button} onPress={() => this.sendLocation()}><Text>Share Location</Text></Button>

        </Content>
        
      </Container>

    );
  }
}

export default WalkMain;
