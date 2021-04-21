import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

class MainScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isReady: true,
        };
      }

      //webview has issues displaying a pdf on android, so use a workaround to display in a custom expo tab when on an android device
      //solution found on: https://github.com/facebook/react-native/issues/6488
    

//tutorial for passing parameters from stack navigator: https://www.positronx.io/react-native-stack-navigator-passing-getting-params-to-screen/
//temporary fix for webview, webview has issues displaying a pdf on android, use a workaround by displaying in google docs
// google doc fix: https://stackoverflow.com/questions/58155621/react-native-webview-for-android-not-displaying-pdf-and-word-files
//possible better fix: https://github.com/facebook/react-native/issues/6488#issuecomment-352557454
  render() {
      const {pdfUrl} = this.props.route.params;
      const url = 'http://docs.google.com/gview?embedded=true&url=' + pdfUrl

    return (
      <View style={{ flex: 1}}>
        <WebView
        bounces={false}
        scrollEnabled={false} 
        source={{
          uri: url,
        }}
      />
      </View>
    );
  }
}

export default MainScreen;