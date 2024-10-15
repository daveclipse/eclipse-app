import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import 'nativewind';
import firebaseConfig from '@/firebase.config.js';
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from 'firebase/auth';
import Login from '@/screens/Login';

export default function App() {

  return (
    <Login></Login>
  );
}
