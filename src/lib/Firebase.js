import Firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
};

let App = Firebase.initializeApp(config);

export let FirebaseApp = App;
export let FirebaseDb = App.database();
export let FirebaseAuth = App.auth();
