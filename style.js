import { StyleSheet, Dimensions } from "react-native"

const extraWidth = Dimensions.get('window').width/30;
const extraHeight = Dimensions.get('window').height/30;
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

 //Used color scheme from: https://www.colorcombos.com/color-schemes/144/ColorCombo144.html
const mainColor = '#FFDE00'
const backColor = '#6599FF'
const black = '#3b444b'
const recievedText = '#097054'
const sentText = '#FF9900'
const spareColor = '#006666'

export default StyleSheet.create({
container: {
    backgroundColor: backColor,
    paddingTop:20
},
content: {
},
button: {
  borderColor: black,
  borderRadius: 10,
  borderWidth: 2,
  marginBottom:12,
  marginTop:12,
  marginLeft:12,
  marginRight:12,
  backgroundColor: mainColor
},
buttonWIP: {
  marginBottom:12,
  marginTop:12,
  backgroundColor: spareColor
},
text: {
  color: black,
  textAlign:"center"
},
textHeader: {
  fontWeight: 'bold',
  textAlign: 'center'
},
alignRight: {
  color: black,
  textAlign: 'right'
},
alignLeft: {
  color: black,
  textAlign: 'left'
},
sendCard: {
  backgroundColor: sentText
},
receiveCard: {
  backgroundColor: recievedText
},
form: {
  borderColor: black,
  borderRadius: 10,
  borderWidth: 2,
  marginTop:12,
  marginBottom:12,
  marginLeft:12,
  marginRight:12,
  paddingBottom: 20,
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
  borderColor: black,
  borderRadius: 10,
  borderWidth: 2,
  height: 400,
  width: Dimensions.get('window').width - 20,
  backgroundColor: mainColor,
  alignItems: "center",
  justifyContent: "center"
},

queueText: {
  fontSize: 24,
},
walkScroll: {
  flexGrow: 0, 
  maxHeight: '30%'
},

watchScroll: {
  flexGrow: 0, 
  maxHeight: '35%'
}
})
