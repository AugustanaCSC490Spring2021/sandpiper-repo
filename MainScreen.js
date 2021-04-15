import { Container, Content, Text, Header, Button, StyleProvider } from 'native-base';
import { StyleSheet } from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
// import 'react-native-gesture-handler';

const styles = StyleSheet.create({
  button: {
    marginBottom:25,
    marginTop:25,
    marginLeft:25,
    marginRight:25,
    backgroundColor: '#FFDD00'
  },
  text: {
    color: '#000000'
  }
});

//code snippet obtained from: https://docs.nativebase.io/docs/GetStarted.html
class MainScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    return (
      <Container style={{ backgroundColor: '#002F6C'}}>
        <Content>
          <Button block
            style = {styles.button}>
            <Text style= {styles.text}>
              Emergency Contacts
            </Text>
          </Button>
          <Button block
          style = {styles.button}>
            <Text style = {styles.text}>
              About the app
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default MainScreen;
