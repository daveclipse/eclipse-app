import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import 'nativewind';
import app from '@/firebase.config.js';
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from 'firebase/auth';
import Login from '@/screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '.';
import Profile from '@/screens/Profile';
import Preferences from '@/screens/Preferences';



export default function PreferencesScreen() {
  return (
    <Preferences></Preferences>
  );
}
