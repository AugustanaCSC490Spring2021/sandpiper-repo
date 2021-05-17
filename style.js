import { StyleSheet, Dimensions } from "react-native"

const extraWidth = Dimensions.get('window').width/30;
const extraHeight = Dimensions.get('window').height/30;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
container: {
    backgroundColor: '#002F6C',
    paddingTop:20
},
content: {
},
button: {
  marginBottom:12,
  marginTop:12,
  backgroundColor: '#FFDD00'
},
buttonWIP: {
  marginBottom:12,
  marginTop:12,
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
  marginTop:12,
  backgroundColor: '#FFDD00',
},
item: {
  color: '#000000',
  marginTop: 25
  },

map: {
    width: Dimensions.get('window').width,
    height: 0.3* Dimensions.get('window').height,
    alignItems: "center",
    backgroundColor: '#002F6C',
  },

queueView: {
  height: 400,
  width: Dimensions.get('window').width - 20,
  backgroundColor: '#FFDD00',
  alignItems: "center",
  justifyContent: "center"
},

queueText: {
  fontSize: 24,
}
})
