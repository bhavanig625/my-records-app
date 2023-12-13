import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";

// console.log(
//   "process.env.REACT_APP_FIREBASE_API_KEY: ",
//   process.env.REACT_APP_FIREBASE_API_KEY
// );

//Prod Config
const app = initializeApp({
  apiKey: "AIzaSyBu3Vqdvcbe9Ko9y0F5uANc0FilwMOkfzk",
  authDomain: "records-prod-c4ecf.firebaseapp.com",
  projectId: "records-prod-c4ecf",
  storageBucket: "records-prod-c4ecf.appspot.com",
  messagingSenderId: "206526607751",
  appId: "1:206526607751:web:c1a3a69b9512bd1bbae322",
});

//Dev config
// const app = initializeApp({
//   apiKey: "AIzaSyCGZUzn2V-D2Bdq5Bhbl9onv1ttk7Z4N8E",
//   authDomain: "auth-development-39550.firebaseapp.com",
//   projectId: "auth-development-39550",
//   storageBucket: "auth-development-39550.appspot.com",
//   messagingSenderId: "1041490932625",
//   appId: "1:1041490932625:web:584ca0fe94e146e0752030",
// });

export const auth = getAuth(app);
export const database = getDatabase(app);
export const storage = getStorage(app);
export default app;
