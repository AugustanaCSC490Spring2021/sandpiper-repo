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
  marginBottom:12,
  marginTop:12,
  marginLeft:0,
  marginRight:(windowWidth / 2),
  backgroundColor: '#FFDD00'
},
buttonWIP: {
  marginBottom:12,
  marginTop:12,
  marginLeft:0,
  marginRight:(windowWidth / 2),
  backgroundColor: '#474747'
},
text: {
  color: '#000000'
},
alignRight: {
  textAlign: 'right'
},
sendCard: {
  backgroundColor: 'yellow'
},
receiveCard: {
  backgroundColor: 'red'
},
form: {
  backgroundColor: '#FFDD00'
},
item: {
  color: '#000000',
  marginTop: 25
  },

map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
containermap: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
})
