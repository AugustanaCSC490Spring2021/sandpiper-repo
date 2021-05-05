import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import MapView from "react-native-maps";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import * as TaskManager from "expo-task-manager";

const LOCATION_TASK_NAME = "background-location-task";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: null,
      error: '',
    };
  }

  async componentDidMount() {
    // Asking for device location permission
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      this._getLocationAsync();
    } else {
      this.setState({ error: "Locations services needed" });
    }
  }

  _getLocationAsync = async () => {
    
    // watchPositionAsync Return Lat & Long on Position Change
    this.location = await Location.watchPositionAsync(
      {
        enableHighAccuracy: true,
        distanceInterval: 1,
        timeInterval: 10000
      },
      newLocation => {
        let { coords } = newLocation;
        console.log(coords);
        let region = {
          latitude: coords.latitude,
          longitude: coords.longitude,
          latitudeDelta: 0.045,
          longitudeDelta: 0.045
        };
        this.setState({ region: region });
      },
      error => console.log(error)
    );
    return this.location;
  };

  

  render() {
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={this.state.region}
          showsCompass={true}
          showsUserLocation={true}
          rotateEnabled={true}
          ref={map => {
            this.map = map;
          }}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}

TaskManager.defineTask(LOCATION_TASK_NAME, async ({ data, error }) => {
  if (error) {
    console.log(error);
    return;
  }
  if (data) {
    const { locations } = data;
    let lat = locations[0].coords.latitude;
    let long = locations[0].coords.longitude;
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default Map
