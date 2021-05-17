import { Container, Content, Text, Header, Button, StyleProvider, Card } from 'native-base';
import * as React from 'react';
import styles from './style.js';
import 'react-native-gesture-handler';

class MainScreen extends React.Component {
  render() {
    return (
      <Container style={styles.container}>
        <Content padder style = {styles.content}>
          <Button block 
          style = {styles.button}
          onPress={() => this.props.navigation.navigate('ResourceDisplay', 
          {pdfUrl: 'https://www.augustana.edu/files/2018-12/Andreen_Emergency_Instruction_sm.pdf', isPDF: true})}>
            <Text style = {styles.text}>
              Andreen
            </Text>
          </Button>
          <Button block 
          style = {styles.button}
          onPress={() => this.props.navigation.navigate('ResourceDisplay', 
          {pdfUrl: 'https://www.augustana.edu/files/2018-12/Erickson_Emergency_Instruction_sm.pdf', isPDF: true})}>
            <Text style = {styles.text}>
              Erickson
            </Text>
          </Button>
          <Button block 
          style = {styles.button}
          onPress={() => this.props.navigation.navigate('ResourceDisplay', 
          {pdfUrl: 'https://www.augustana.edu/files/2018-12/Seminary_Emergency_Instruction_sm.pdf', isPDF: true})}>
            <Text style = {styles.text}>
              Seminary
            </Text>
          </Button>
          <Button block 
          style = {styles.button}
          onPress={() => this.props.navigation.navigate('ResourceDisplay', 
          {pdfUrl: 'https://www.augustana.edu/files/2018-12/SwansonTLA_Emergency_Instruction_sm.pdf', isPDF: true})}>
            <Text style = {styles.text}>
              Swanson
            </Text>
          </Button>
          <Button block 
          style = {styles.button}
          onPress={() => this.props.navigation.navigate('ResourceDisplay', 
          {pdfUrl: 'https://www.augustana.edu/files/2018-12/Westerlin_Emergency_Instruction_sm.pdf', isPDF: true})}>
            <Text style = {styles.text}>
              Westerlin
            </Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

export default MainScreen;