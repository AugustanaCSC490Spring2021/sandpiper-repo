import * as React from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import moment from 'moment';

var verbose = false //DEBUGGING LOG
const dbHeader = '[DATABASE DEBUG] ';
const databaseReference = "users/";

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
export function initializeDatabase() {
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
export function setDatabase(uuid, keyValue){
  if(verbose) console.log(dbHeader + "Setting " + uuid + " with value: " + keyValue)
  firebase
    .database()
    .ref(databaseReference + uuid)
    .set(keyValue)
    .then(() => {
      if(verbose) console.log(dbHeader + "Set database at: " + databaseReference + uuid
      + " with value:\n " + JSON.stringify(keyValue))
    })
    .catch(error => {
        console.log(dbHeader + "ERROR in setDatabase() in FriendWalkDB, error is: " + error)
    });
}

/**
 * updateDatabase updates the database for a specific pairing
 * does over write the specific key value pair, but not any other entries
 *
 * @params {string} uuid, The uuid which will be used in the path.
 * @params {key value pair} keyValue, The key value pairs to set, can be multiple
 */
export function updateDatabase(uuid, keyValue) {
if(verbose) console.log(dbHeader + "Updating database...")
firebase
  .database()
  .ref(databaseReference + uuid)
  .update(keyValue)
  .then(() => {
    if(verbose) console.log(dbHeader + "Updated database at: " + databaseReference + uuid
    + " with value:\n " + JSON.stringify(keyValue))
  })
  .catch(error => {
      console.log(dbHeader + "ERROR in updateDatabase() in FriendWalkDB, error is: " + error)
  });
}

/**
 * closeListener takes a listener and closes it
 * https://firebase.google.com/docs/database/admin/retrieve-data#section-event-types
 *
 * @params {firebase.database.Reference} listener, the Reference to the listener
 * so each off needs that value, should be 'value', ''
 */
export function closeListener(database) {
  if(database !== undefined) {
     database.off()
     if(verbose) console.log(dbHeader + "Closed all listeners on " + database)
   } else {
     if(verbose) console.log(dbHeader + "The Reference you are trying to close does not exist")
   }
}

/**
 * checkIfPaired checks to see if isPaired is true for a specific connection (uuid)
 *
 * @params {react.Component} reactState, a reference to the class that calls the method (use this)
 * @params {string} uuid, the uuid of the connection you want to reference
 *
 * @returns {firebase.database.Reference} listener, used for closing later
 */
export function checkIfPaired(reactState, uuid) {
    var database = firebase.database().ref(databaseReference + uuid);
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
        closeListener(database)
      }
    })
    return database; //returns the reference to the listener for closing.
  };

/**
 * pairWatcher creates a listener to listen for any new connections then sees if there are any unpaired
 * if it finds an unpaired connection in the database, connect the two users.
 *
 * @params {react.Component} reactState, a reference to the class that calls the method (use this)
 *
 * @returns {firebase.database.Reference} listener, used for closing later
 */
export function pairWatcher(reactState) {
  var database = firebase.database().ref(databaseReference);
  var snapshot = database.limitToLast(1).orderByChild("isPaired")
    .equalTo(false).on('value', (snapshot) => {
    snapshot.forEach((childSnapshot) => {
      if(snapshot.exists()) if(!childSnapshot.val().isPaired){
        if(verbose) console.log(dbHeader + "One result: " + childSnapshot.val().walker_uuid + " " + childSnapshot.val().isPaired);
          reactState.setState({walker_uuid: childSnapshot.val().walker_uuid});
          updateDatabase(childSnapshot.val().walker_uuid, {isPaired: true})
          updateDatabase(childSnapshot.val().walker_uuid, {watcher_uuid: reactState.state.watcher_uuid})
          closeListener(database)
          reactState.setState({matched: true});
        }
      })
    })
    return database; //returns the reference to the listener for closing.
};

export function listenForComplete(reactState){
  var uuid = reactState.state.walker_uuid
  var database = firebase.database().ref(databaseReference + uuid);
  var snapshot = database.on('value', (snapshot) => {
    if(snapshot.val().completed){
      reactState.setState({walker_completed: true});
      closeListener(database);
    }
  }
  )
  return database;
}



export function grabLocation(reactState, walker_uuid) {
  var database = firebase.database().ref(databaseReference + walker_uuid);
  console.log(databaseReference + walker_uuid)
  var snapshot = database.on('value', (snapshot) => {
      if(verbose) console.log(dbHeader + "Testing snapshot: " + snapshot);
      var childKey = snapshot.key;
      var childData = snapshot.val().location_region;
      if(verbose) console.log(dbHeader + "Uuid: " + childKey + " location_region " + childData);
      reactState.setState({region: childData});
    })
    return database;
}

  export function sendMessage(reactState, walker_uuid, sender_uuid) {
    var database = firebase.database().ref(databaseReference + walker_uuid);
    let Message = {
      messageText: reactState.messageInput,
      date: moment().format('YYYY-MM-DD hh:mm:ss'),
      sender: sender_uuid
    }

    reactState.messageArray.push(Message);
    database.update({messages: reactState.messageArray});
  }

  export async function getMessage(reactState) {
    firebase.database().ref(databaseReference + reactState.state.walker_uuid + "/messages").on('value', (snapshot)=>{
      if (snapshot.val() != null) {
        reactState.setState({messageArray: snapshot.val()});
      }
    })
  }
