// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfGaG0Jne42C90ugL_nYpPymoAOt_NAp0",
  authDomain: "eclipse--app.firebaseapp.com",
  projectId: "eclipse--app",
  storageBucket: "eclipse--app.appspot.com",
  messagingSenderId: "12693271732",
  appId: "1:12693271732:web:8141afe43434e80b0f93e1",
  measurementId: "G-B7616XNGMF"
};

const app = initializeApp(firebaseConfig);

export default app;