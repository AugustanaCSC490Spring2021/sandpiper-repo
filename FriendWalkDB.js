import * as React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

var verbose = true //DEBUGGING
const dbHeader = '[DATABASE DEBUG] ';

var firebaseConfig = {
  apiKey: "AIzaSyAXhoMqorexwwYImNQuFUIBqFmaXz3SMqU",
  authDomain: "vikingready-d4167.firebaseapp.com",
  databaseURL: "https://vikingready-d4167-default-rtdb.firebaseio.com",
  projectId: "vikingready-d4167",
  storageBucket: "vikingready-d4167.appspot.com",
  messagingSenderId: "409187750267",
  appId: "1:409187750267:web:793290bf3bb99f93fcedde",
  measurementId: "G-CL5F67YSNN",
};

/**
 * Using the firebaseConfig, initializeDatabase authenticates if the firebase hasn't already been initialized
 *
 */
export function initializeDatabase(){
  if(verbose) console.log(dbHeader + "Attempting to Authenticate...")
  !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
  if(verbose) console.log(dbHeader + "Authenticated")
}

/**
 * setDatabase sets (replaces all values at that location, good for initializing)
 * the database for a specific pairing, likely only useful for walker init only
 *
 * @params {string} uuid, The uuid which will be used in the path.
 * @params {key value pair} keyValue, The key value pairs to set, can be multiple
 */
export function setDatabase(uuid, value){
  if(verbose) console.log(dbHeader + "Setting " + uuid + " with value: " + value)
  firebase
    .database()
    .ref('users/' + uuid)
    .set(value);
  if(verbose) console.log(dbHeader + "Set!")
}

/**
 * updateDatabase updates the database for a specific pairing
 * does over write the specific key value pair, but not any other entries
 *
 * @params {string} uuid, The uuid which will be used in the path.
 * @params {key value pair} keyValue, The key value pairs to set, can be multiple
 */
export function updateDatabase(uuid, keyValue){
if(verbose) console.log(dbHeader + "Updating database...")
firebase
  .database()
  .ref('users/' + uuid)
  .update(keyValue);
}

/**
 * closeListener takes a listener and closes it
 * https://firebase.google.com/docs/database/admin/retrieve-data#section-event-types
 *
 * @params {firebase.database.Reference} listener, the Reference to the listener
 * @params {string} value, unsure why this is needed but each listener has a value attached to it,
 * so each off needs that value, should be 'value', ''
 */
export function closeListener(listener, value) {
  if(verbose) console.log(dbHeader + "Closing the listener " + listener + " with value: " + value)
  ref.off(value, listener)
  if(verbose) console.log(dbHeader + "Closed the database")
}

/**
 * checkIfPaired checks to see if isPaired is true for a specific connection (uuid)
 *
 * @params {react.Component} reactState, a reference to the class that calls the method (use this)
 * @params {string} uuid, the uuid of the connection you want to reference
 */
export function checkIfPaired(reactState, uuid) {
    var database = firebase.database().ref("users/" + uuid);
    if(verbose) console.log(dbHeader + "Checking if " + uuid + " is matched");
    //TODO make the list a queue so that no one is left behind
    var snapshot = database.on('value', (snapshot) => {
      if(verbose) console.log(dbHeader + "Testing snapshot: " + snapshot);
      var childKey = snapshot.key;
      var childData = snapshot.val().isPaired;
      if(verbose) console.log(dbHeader + "Uuid: " + childKey + " isPaired: " + childData);
      //Next: set isPaired to true, and set the watcher uuid to this device's uuid
      if(childData){
        reactState.setState({isMatched: true});
      }
    })
  };

/**
 * pairWatcher creates a listener to listen for any new connections then sees if there are any unpaired
 * if it finds an unpaired connection in the database, connect the two users.
 *
 * @params {react.Component} reactState, a reference to the class that calls the method (use this)
 */
export function pairWatcher(reactState) {
  var database = firebase.database().ref("users");
  var snapshot = database.limitToLast(1).orderByChild("isPaired")
    .equalTo(false).on('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      if(snapshot.exists()) if(!childSnapshot.val().isPaired){
        if(verbose) console.log(dbHeader + "One result: " + childSnapshot.val().walker_uuid + " " + childSnapshot.val().isPaired);
          reactState.setState({matched: true});
          reactState.setState({walker_uuid: childSnapshot.key});
          updateDatabase(childSnapshot.val().walker_uuid, {isPaired: true})
          updateDatabase(childSnapshot.val().walker_uuid, {watcher_uuid: reactState.state.watcher_uuid})
        }
      })
    })
  };
