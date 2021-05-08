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

export function initializeDatabase(){
  if(verbose) console.log(dbHeader + "Attempting to Authenticate...")
  !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
  if(verbose) console.log(dbHeader + "Authenticated")
}

export function setDatabase(uuid, value){
  if(verbose) console.log(dbHeader + "Setting " + uuid + " with value: " + value)
  firebase
    .database()
    .ref('users/' + uuid)
    .set(value);
  if(verbose) console.log(dbHeader + "Set!")
}

export function closeListener(listener, value) {
  if(verbose) console.log(dbHeader + "Closing the listener " + listener + " with value: " + value)
  ref.off(value, listener)
  if(verbose) console.log(dbHeader + "Closed the database")
}

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

//Pairs the watcher
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
    }})})};

export function updateDatabase(uuid, keyValue){
if(verbose) console.log(dbHeader + "Updating database...")
  firebase
    .database()
    .ref('users/' + uuid)
    .update(keyValue);
}
