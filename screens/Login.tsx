import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import 'nativewind';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import app from "../firebase.config";

const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<any>();

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('User signed in:', userCredential.user);

      const user = userCredential.user;
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          userId: user.uid,
          email: user.email,
          createdAt: new Date(),
        });
        console.log('User document created in Firestore');
      } else {
        console.log('User document already exists');
      }

      navigation.navigate('profile', { userId: user.uid });
    } catch (error: any) {
      console.error('Error signing in:', error.code, error.message);
    }
  };

  const handleRegister = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User registered:', userCredential.user);

      const user = userCredential.user;
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        userId: user.uid,
        email: user.email,
        createdAt: new Date(),
      });

      navigation.navigate('home');
    } catch (error: any) {
      console.error('Error registering:', error.code, error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log('Google user signed in:', result.user);

      const user = result.user;
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          userId: user.uid,
          email: user.email,
          createdAt: new Date(),
        });
        console.log('User document created in Firestore');
      } else {
        console.log('User document already exists');
      }

      navigation.navigate('home');
    } catch (error: any) {
      console.error('Error with Google sign-in:', error.code, error.message);
    }
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      <View className='flex items-center w-full h-1/3 justify-center'>
        <Image source={require('@/assets/images/eclipseLogo.png')} className="items-center" />
      </View>

      <View className="w-full">
        <TextInput
          placeholder="Email"
          className="border border-gray-300 rounded-lg w-full px-3 py-2 mb-4"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Password"
          className="border border-gray-300 rounded-lg w-full px-3 py-2 mb-4"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity onPress={handleSignIn} className="bg-black rounded-lg w-full py-4 mb-4">
          <Text className="text-white text-center text-lg font-semibold">Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRegister} className="bg-yellow-500 rounded-lg w-full py-4 mb-4">
          <Text className="text-black text-center text-lg font-semibold">Register</Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center justify-center mb-6">
        <View className="border-b border-gray-200 flex-grow" />
        <Text className="mx-2 text-gray-400">Or continue with</Text>
        <View className="border-b border-gray-200 flex-grow" />
      </View>

      <TouchableOpacity onPress={handleGoogleSignIn} className="bg-gray-100 p-4 rounded-lg">
        <Image
          source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }}
          style={{ width: 30, height: 30 }}
        />
      </TouchableOpacity>
    </View>
  );
}