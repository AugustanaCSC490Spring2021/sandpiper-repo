import { StyleSheet, Dimensions } from "react-native"

const extraWidth = Dimensions.get('window').width/30;
const extraHeight = Dimensions.get('window').height/30;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
container: {
    backgroundColor: '#002F6C'
},
textBlock:{
  backgroundColor: '#FFDD00',
  width: 'auto',
  height: 'auto',
  marginBottom:25,
  alignSelf: "baseline",
  padding: 15,
  //flexDirection: 'column',
},
textBlockWIP:{
  backgroundColor: '#474747',
  width: 'auto',
  height: 'auto',
  marginBottom:25,
  alignSelf: "baseline",
  padding: 15,
  //flexDirection: 'column',
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
buttonWIP: {
  marginBottom:25,
  marginLeft:0,
  marginRight:(windowWidth / 2),
  backgroundColor: '#474747'
},
text: {
  color: '#000000'
}
})
