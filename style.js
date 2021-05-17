import { StyleSheet, Dimensions } from "react-native"

const extraWidth = Dimensions.get('window').width/30;
const extraHeight = Dimensions.get('window').height/30;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var mainColor = '#FFFF4D'
var backColor = '#120090'
var black = '#000000'

export default StyleSheet.create({
container: {
    backgroundColor: backColor,
    paddingTop:20
},
content: {
},
button: {
  marginBottom:12,
  marginTop:12,
  backgroundColor: mainColor
},
buttonWIP: {
  marginBottom:12,
  marginTop:12,
  backgroundColor: backColor
},
text: {
  color: black
},
textHeader: {
  fontWeight: 'bold',
  textAlign: 'center'
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
  marginTop:12,
  backgroundColor: mainColor,
},
item: {
  color: black,
  marginTop: 25
  },

map: {
    width: Dimensions.get('window').width,
    height: 0.3* Dimensions.get('window').height,
    alignItems: "center",
    backgroundColor: backColor,
  },

queueView: {
  height: 400,
  width: Dimensions.get('window').width - 20,
  backgroundColor: mainColor,
  alignItems: "center",
  justifyContent: "center"
},

queueText: {
  fontSize: 24,
}
})
