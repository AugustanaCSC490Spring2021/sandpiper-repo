import { Container, Content, Text, Header, Button, StyleProvider } from 'native-base';
import { StyleSheet, Dimensions } from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
// import 'react-native-gesture-handler';
const extraWidth = Dimensions.get('window').width/30;
const extraHeight = Dimensions.get('window').height/30;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#002F6C'
  },
  content: {
    flexDirection: 'row',
    flex: 1
  },
  button: {
    marginBottom:25,
    marginLeft:0,
    marginRight:(windowWidth / 2),
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
      <Container style={styles.container}>
        <Content padder style = {styles.content}>
          <Button block
            style = {styles.button}>
            <Text style= {styles.text}>
              Emergency Contacts
            </Text>
          </Button>
          <Button block
          style = {styles.button}>
            <Text style = {styles.text}>
              Friend Walk
            </Text>
          </Button>
          <Button block
          style = {styles.button}>
            <Text style = {styles.text}>
              Resources
            </Text>
          </Button>
          <Button block
          style = {styles.button}>
            <Text style = {styles.text}>
              Map
            </Text>
          </Button>
          <Button block
          style = {styles.button}>
            <Text style = {styles.text}>
              Report Incident
            </Text>
          </Button>
          <Button block
          style = {styles.button}>
            <Text style = {styles.text}>
              Covid
            </Text>
          </Button>
          <Button block
          style = {styles.button}>
            <Text style = {styles.text}>
              Weather
            </Text>
          </Button>
          <Button block
          style = {styles.button}>
            <Text style = {styles.text}>
              News
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
