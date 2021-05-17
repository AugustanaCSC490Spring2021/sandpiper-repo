import { StyleSheet, Dimensions } from "react-native"

const extraWidth = Dimensions.get('window').width/30;
const extraHeight = Dimensions.get('window').height/30;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

 //Used color scheme from: https://www.colorcombos.com/color-schemes/144/ColorCombo144.html
const mainColor = '#FFDE00'
const backColor = '#000066'
const black = '#000000'
const recievedText = '#CC9900'
const sentText = '#006699'
const spareColor = '#006666'

export default StyleSheet.create({
container: {
    backgroundColor: backColor,
    paddingTop:20
},
content: {
},
button: {
  borderColor: sentText,
  borderRadius: 10,
  borderWidth: 2,
  marginBottom:12,
  marginTop:12,
  backgroundColor: mainColor
},
buttonWIP: {
  marginBottom:12,
  marginTop:12,
  backgroundColor: spareColor
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
  backgroundColor: sentText
},
receiveCard: {
  backgroundColor: recievedText
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
