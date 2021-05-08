import { Container, Content, Text, Header, Button, StyleProvider, Label, Form, Item, Input } from 'native-base';
import { StyleSheet, Dimensions } from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import styles from './style.js';
import 'react-native-gesture-handler';
import uuid from "react-native-uuid";
import { useRoute } from '@react-navigation/native';
import * as FriendWalkDB from './FriendWalkDB.js';

class WalkForm extends React.Component {
  constructor(props) {
    super(props);
    var disabledSubmit = true
    this.state = {
      walker_name: '',
      walker_studentID: '',
      walker_destination: '',
      walker_phoneNum: '',
      walker_friendsNum: '',
      walker_gps_coordinates: '',
      friendwalk_chat: [],
      walker_uuid: uuid.v1(),
      watcher_uuid: '',
      isPaired: false,
      isPinged: false,
      disabledSubmit: true,
    };
  }


  checkToDisable() {
    //TODO:
    if(this.state.walker_name !== '' && this.state.disabledSubmit === true){
      this.setState({disabledSubmit: false});
    }
    if(this.state.walker_name === '' && this.state.disabledSubmit === false){
      this.setState({disabledSubmit: true});
    }
  }

  Submit(){
    this.updateDatabase();
    this.props.navigation.navigate('Walk Queue', {walker_uuid: this.state.walker_uuid});
  }

  updateDatabase(){
    // console.log("Updating database...")
    //   firebase
    //     .database()
    //     .ref('users/' + this.state.walker_uuid)
    //     .set(this.state);
    FriendWalkDB.setDatabase(this.state.walker_uuid, this.state)
  }

  componentDidUpdate(){
    this.checkToDisable()
  }

  async compoentDidUnmount() {
    firebase.close()
  }

  render() {
    //learned the switching of background color for a disabled button from: https://reactnativecode.com/disabled-button-state/
    return (
      <Container style={styles.container}>
        <Content padder>
        <Form style={styles.form}>
        <Item floatingLabel styles={styles.item}>
          <Label>Name: </Label>
          <Input
          onChangeText= {value=>this.setState({walker_name: value})}
          >
          </Input>
        </Item>
        <Item floatingLabel styles={styles.item}>
          <Label>Student ID: </Label>
          <Input
          onChangeText= {value=>this.setState({walker_studentID: value})}
          >
          </Input>
        </Item>
        <Item floatingLabel styles={styles.item}>
          <Label>Destination: </Label>
          <Input
          onChangeText= {value=>this.setState({walker_destination: value})}
          >
          </Input>
        </Item>
        <Item floatingLabel styles={styles.item}>
          <Label>Phone Number: </Label>
          <Input
          onChangeText= {value=>this.setState({walker_phoneNum: value})}
          >
          </Input>
        </Item>
        <Item floatingLabel styles={styles.item}>
          <Label>Friend's Phone Number: </Label>
          <Input
          onChangeText= {value=>this.setState({walker_friendsNum: value})}
          >
          </Input>
        </Item>
        </Form>
        <Button style={[styles.button, { backgroundColor: this.state.disabledSubmit ? '#474747' : '#FFDD00' }]}
          disabled={this.state.disabledSubmit}
          onPress={() => this.Submit()}>
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
