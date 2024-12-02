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
import ProfileSetup from '@/screens/ProfileSetup';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



export default function ProfileScreen() {
  return (
<GestureHandlerRootView style={{ flex: 1 }}>
        <ProfileSetup />
    </GestureHandlerRootView>
  );
}
