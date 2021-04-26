import 'react-native-gesture-handler';
import * as React from 'react';
import { AppLoading } from 'expo';
import { Container, Text } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './MainScreen.js';
import ResourcePage from './ResourcePage.js';
import ResourceDisplay from './ResourceDisplay.js';
import DormResourcePage from './DormResourcePage.js';
import Emergency from './EmergencyContactPage.js';
import FriendWalk from './FriendWalk.js';
import WalkForm from './WalkForm.js';
import WalkQueue from './WalkQueue.js';
import WatchQueue from './FriendWatch.js';
import Map from './MapPage.js';
import WatchMain from './watchMain.js';
import { StyleSheet, View } from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import About from './About';
const Stack = createStackNavigator();

class App extends React.Component {

  constructor(props) {
    super(props);
    this.componentDidMount();
    this.state = {
      isReady: false,
    };
  }

//This starter was included in the native-base docs: https://docs.nativebase.io/docs/GetStarted.html
//But was broken so I found this answer from user 'Jose Paez': https://stackoverflow.com/questions/57066075/console-error-fontfamily-roboto-medium-is-not-a-system-font-and-has-not-been
async componentDidMount() {
  await Font.loadAsync({
     Roboto: require('native-base/Fonts/Roboto.ttf'),
     Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
     ...Ionicons.font,
  });
  this.setState({ isReady: true });
}

  render() {
  //Checks to see if the font loaded, if it has not it displays a temp screen
  if (!this.state.isReady) {
    return <View></View>
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Viking Ready"
          component={MainScreen}
        />
        <Stack.Screen
          name="Resources"
          component={ResourcePage}
        />
        <Stack.Screen
          name="Emergency Contacts"
          component={Emergency}
        />
        <Stack.Screen
          name="Friend Walk"
          component={FriendWalk}
        />
        <Stack.Screen
          name="Walk Form"
          component={WalkForm}
        />
        <Stack.Screen
          name="Walk Queue"
          component={WalkQueue}
        />
        <Stack.Screen
          name="Watch Queue"
          component={WatchQueue}
        />
        <Stack.Screen
          name="Watch Main"
          component={WatchMain}
        />
        <Stack.Screen
            name="ResourceDisplay"
            component={ResourceDisplay}
        />
        <Stack.Screen
            name="Map"
            component={Map}
          />
          <Stack.Screen
            name="About"
            component={About}
          />
          <Stack.Screen
            name="Dorm Resources"
            component={DormResourcePage}
          />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
}

export default App;
