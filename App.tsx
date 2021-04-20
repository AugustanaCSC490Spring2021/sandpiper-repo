import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './MainScreen.js';
import ResourcePage from './ResourcePage.js';
import Emergency from './EmergencyContactPage.js';
import { StyleSheet } from "react-native";

const Stack = createStackNavigator();

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={MainScreen}
          />
          <Stack.Screen
            name="Resources"
            component={ResourcePage}
          />
          <Stack.Screen
            name="Emergency"
            component={Emergency}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;
