import { StyleSheet, Dimensions } from "react-native"

const extraWidth = Dimensions.get('window').width/30;
const extraHeight = Dimensions.get('window').height/30;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default StyleSheet.create({
container: {
    backgroundColor: '#002F6C',
    justifyContent:'center',
    flex:1,
    paddingTop:20
},
content: {
  flex: 1,
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
  backgroundColor: '#FFDD00'
},
item: {
  color: '#000000',
  marginTop: 25
  },

map: {
    width: 0.8*Dimensions.get('window').width,
    height: 0.4* Dimensions.get('window').height,
    alignItems: "center",
    backgroundColor: '#002F6C',
    marginTop:12,
  },

map_container: {
    backgroundColor: '#002F6C',
    alignItems: "center",
  },

map_content: {
    flex: 1,
  },

queueView: {
  flexDirection: "row",
  height: 400,
  width: 350,
  backgroundColor: '#FFDD00',
  alignItems: 'center',
},

queueText: {
  fontSize: 24,
  alignItems: 'center',
}
})
