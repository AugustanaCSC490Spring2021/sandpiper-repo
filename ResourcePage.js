import { Container, Content, Text, Header, Button, StyleProvider, Card } from 'native-base';
import { StyleSheet, Dimensions } from "react-native";
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import styles from './style.js';
import 'react-native-gesture-handler';

class MainScreen extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <Content padder style = {styles.content}>
          <Button block style = {styles.button} 
          onPress={() => this.props.navigation.navigate('ResourceDisplay',
          {pdfUrl: 'https://www.augustana.edu/files/2019-10/Accident%20Investigations%202019-20.doc', isPDF: true})}>
            <Text style = {styles.text}>
              Accident Investigations
            </Text>
          </Button>
          <Button block style = {styles.button}
          onPress={() => this.props.navigation.navigate('ResourceDisplay',
          {pdfUrl: 'https://www.augustana.edu/student-life/public-safety/augie-alerts', isPDF: false})}>
            <Text style = {styles.text}>
              Augie Alerts
            </Text>
          </Button>
          <Button block style = {styles.button}
          onPress={() => this.props.navigation.navigate('ResourceDisplay',
          {pdfUrl: 'https://www.augustana.edu/files/2019-10/Bloodborne%20Pathogens%20Exposure%20Control%20Plan%20%2719-20.docx', isPDF: true})}>
            <Text style = {styles.text}>
              Bloodborne Pathogens Exposure Control Plan
            </Text>
          </Button>
          <Button block style = {styles.button}
          onPress={() => this.props.navigation.navigate('ResourceDisplay',
          {pdfUrl: 'https://www.augustana.edu/files/2019-03/Chemical%20Hygiene%20Plan%202019-20_0.pdf', isPDF: true})}>
            <Text style = {styles.text}>
              Chemical Hygiene Plan
            </Text>
          </Button>
          <Button block style = {styles.button}
          onPress={() => this.props.navigation.navigate('Dorm Resources')}>
            <Text style = {styles.text}>
              Dorm Emergency Procedures
            </Text>
          </Button>
          <Button block style = {styles.button}
          onPress={() => this.props.navigation.navigate('ResourceDisplay',
          {pdfUrl: 'https://www.augustana.edu/files/2019-03/Emergency%20Hazardous%20Spill%20Response%20%2719-20_0.pdf', isPDF: true})}>
            <Text style = {styles.text}>
              Hazardous Material
            </Text>
          </Button>
          <Button block style = {styles.button}
          onPress={() => this.props.navigation.navigate('ResourceDisplay',
          {pdfUrl: 'https://www.augustana.edu/files/2019-06/Hazard%20Communication%20Plan%202019-20.pdf', isPDF: true})}>
            <Text style = {styles.text}>
              Hazard Communication Plan
            </Text>
          </Button>
          <Button block style = {styles.button}
          onPress={() => this.props.navigation.navigate('ResourceDisplay',
          {pdfUrl: 'https://www.augustana.edu/files/2019-12/Heat%20and%20Cold%20Injuries%20Policy%202019-20.doc', isPDF: true})}>
            <Text style = {styles.text}>
              Heat/Cold Related Injuries
            </Text>
          </Button>
          <Button block style = {styles.button}
          onPress={() => this.props.navigation.navigate('ResourceDisplay',
          {pdfUrl: 'https://www.augustana.edu/files/2019-10/Personal%20Protective%20Equipment%20Program.docx', isPDF: true})}>
            <Text style = {styles.text}>
              Personal Protective Equipment Program (PPE)
            </Text>
          </Button>
          <Button block style = {styles.button}
          onPress={() => this.props.navigation.navigate('ResourceDisplay',
          {pdfUrl: 'https://www.augustana.edu/files/2019-10/Slips%2C%20Trips%20and%20Falls%20Policy.doc', isPDF: true})}>
            <Text style = {styles.text}>
              Slips, Trips, and Falls
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default MainScreen;
