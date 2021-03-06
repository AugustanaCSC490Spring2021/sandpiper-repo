import { Container, Content, Text, Button, Card, Input, Form } from 'native-base';
import { StyleSheet, Dimensions, ScrollView, View} from "react-native";
import * as React from 'react';
import styles from './style.js';
import 'react-native-gesture-handler';
import moment from 'moment';
import * as Location from 'expo-location';
import MapView from "react-native-maps";
import * as FriendWalkDB from './FriendWalkDB.js';
import { useRoute } from '@react-navigation/native';
import { valueToNode } from '@babel/types';


class WalkMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      walker_uuid: props.route.params.walker_uuid,
      watcher_uuid: props.route.params.watcher_uuid,
      messageArray: [],
      messageInput: '',

      region: {
        latitude: 10,
        longitude: 20,
        latitudeDelta: 0.045,
        longitudeDelta: 0.045
      },
      error: '',
    }
    var messageListener = FriendWalkDB.getMessage(this);
  }


//MAP STUFF HERE
  async componentDidMount() {
    // Asking for device location permission
    const {status} = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      this.getLocationAsync();
    } else {
      this.setState({error: "Locations services needed"});
    }
  }

  async componentWillUnmount() {
    this.location_listener.remove()
    FriendWalkDB.closeListener(this.messageListener)
  }

  getLocationAsync = async () => {
    this.location_listener = await Location.watchPositionAsync({
      enableHighAccuracy: true,
      distanceInterval: 1,
      timeInterval: 10000
    }, newLocation => {
      let {coords} = newLocation;
      //console.log(coords);
      let region = {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.045,
        longitudeDelta: 0.045
      };
      this.setState({region: region});
      FriendWalkDB.updateDatabase(this.state.walker_uuid, {location_region: this.state.region})
    })
  }



//CHAT STUFF HERE
  sendMessage() {
    //Issue for clearing the input of an Input part from native base
    //https://github.com/GeekyAnts/NativeBase/issues/320
    FriendWalkDB.sendMessage(this.state, this.state.walker_uuid, this.state.walker_uuid);
    this.input._root.clear();
  }




  createCards() {
    if (this.state.messageArray.length != 0) {
      let cards = this.state.messageArray.map(message => (
        //Using a ternary operator for an if statement inside of map
        //https://stackoverflow.com/questions/44969877/if-condition-inside-of-map-react
        this.state.walker_uuid == message.sender ?
        <Card style={styles.sendCard} key={message.key}>
                <Text style={styles.alignRight}>{message.messageText}</Text>
                <Text style={styles.alignRight}>{message.date}</Text>
        </Card>
        :
        <Card style={styles.receiveCard} key={message.key}>
                <Text style={styles.alignLeft}>{message.messageText}</Text>
                <Text style={styles.alignLeft}>{message.date}</Text>
        </Card>
      ));
      return cards;
    }
  }

  completeWalk(){
    console.log("Completed Walk");
    FriendWalkDB.updateDatabase(this.state.walker_uuid, {completed: true})
    this.props.navigation.navigate('Friend Walk');
  }


  render() {
    return (
      <Container style={styles.container}>
         <Content style={styles.content} scrollEnabled={false}>
          <MapView style={styles.map}
          region={this.state.region}
          showsUserLocation={true}
          followsUserLocation={true} ref={map => {
              this.map = map;
            }}/>
          {/*Source code for scroll to bottom of ScrollView and setting maxheight of ScrollView to grow to
          https://stackoverflow.com/questions/44533225/make-scrollview-size-automatically-up-to-a-max-height
          https://stackoverflow.com/questions/46791899/react-native-scrollview-scrolltoend-on-android*/}
          <ScrollView style={styles.walkScroll} ref = {(ref) => { this.scroll = ref}}>
              {this.createCards()}
          </ScrollView>
          <Form style={styles.form}>
            <Text style={styles.text}>Enter your message.</Text>
            <Input onChangeText = {value => this.setState({messageInput: value})} ref={(ref) => { this.input = ref }}></Input>
          </Form>
          <Button block style={styles.button} onPress={() => this.sendMessage()}>
          <Text style = {styles.text}>Send</Text>
          </Button>
          <Button block style={styles.button} onPress={() => this.completeWalk()}>
          <Text style = {styles.text}>I have arrived at my destination</Text></Button>
        </Content>
      </Container>

    );
  }
}

export default WalkMain;
