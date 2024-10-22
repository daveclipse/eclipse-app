import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Animated, TextInput } from 'react-native';
import 'nativewind';
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, Auth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
import Ionicons from '@expo/vector-icons/Ionicons';
import { NavigationProp, useNavigation } from '@react-navigation/native';

export default function Login({ app }: { app: FirebaseApp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignInOpen, setIsSignInOpen] = useState(false);

  const [auth, setAuth] = useState<Auth | null>(null);

  const navigation = useNavigation<any>();


  useEffect(() => {
    const initializeAuth = async () => {
      const authInstance = getAuth(app);
      setAuth(authInstance);
    };

    initializeAuth();
  }, [app]);
  
  const provider = new GoogleAuthProvider();

  const slideAnim = useRef(new Animated.Value(1)).current;

  const routeSignIn = () => {
    navigation.navigate('home');
  };

  useEffect(() => {
    if (isSignInOpen) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isSignInOpen]);

  const handleSignIn = async () => {
    if (auth) {
      try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log(userCredential);
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
    }
    
  };

  const handleSignUp = async () => {
    if (auth) {
      try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created!');
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    }
    }
    
  };

  const handleGoogleSignIn = async () => {
    const auth = getAuth(); // Assuming you have initialized auth elsewhere
    const provider = new GoogleAuthProvider();
  
    try {
      const result = await signInWithPopup(auth, provider);
  
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential ? credential.accessToken : null;
  
      // The signed-in user info.
      const user = result.user;
      console.log(user);

    } catch (error: any) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.error(errorCode, errorMessage);
    }
  };

  const toggleSignIn = () => {
    setIsSignInOpen(!isSignInOpen);
  };

  const slideStyle = {
    transform: [{ translateX: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [500, 0] }) }],
    display: !isSignInOpen ? 'flex' as 'flex' : 'none' as 'none',
    visibility: !isSignInOpen ? 'visible' as 'visible' : 'hidden' as 'hidden',
  };

  const inputSlide = {
    transform: [{ translateX: slideAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -500] }) }],
    display: isSignInOpen ? 'flex' as 'flex' : 'none' as 'none',
  };

  return (
    
    <View className="flex-1 items-center justify-center bg-white px-4">
      <View className='flex fixed items-center w-full h-1/3 justify-center'>
        <Image source={require('@/assets/images/eclipseLogo.png')} className="items-center " />
      </View>
     {isSignInOpen && <TouchableOpacity onPress={toggleSignIn} className="absolute top-12 left-4">
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>}
      <Animated.View style={slideStyle} className="w-full">
        <TouchableOpacity className="bg-black rounded-lg w-full py-4 mb-4">
        <Text className="text-white text-center text-lg font-semibold" onPress={toggleSignIn}>Sign In</Text>
      </TouchableOpacity>
      </Animated.View>

      <Animated.View style={slideStyle} className="w-full">
        <TouchableOpacity className="bg-eclipseYellow rounded-lg w-full py-4 mb-6">
          <Text className="text-black text-center text-lg font-semibold">Register</Text>
        </TouchableOpacity>
      </Animated.View>
      

      <Animated.View style={slideStyle} className="flex-row items-center justify-center mb-6">
        <View className="border-b border-gray-200 flex-grow" /><Text className="mx-2 text-gray-400">Or continue with</Text><View className="border-b border-gray-200 flex-grow" />
      </Animated.View>

      <Animated.View style={slideStyle}>
        <View className="flex-row space-x-4">
          <TouchableOpacity className="bg-gray-100 p-4 rounded-lg" onPress={handleGoogleSignIn}>
            <Image source={{ uri: 'https://img.icons8.com/color/48/000000/google-logo.png' }} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>

          <TouchableOpacity className="bg-gray-100 p-4 rounded-lg">
            <Image source={{ uri: 'https://img.icons8.com/ios-filled/50/000000/mac-os.png' }} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>

          <TouchableOpacity className="bg-gray-100 p-4 rounded-lg">
            <Image source={{ uri: 'https://img.icons8.com/color/48/000000/facebook-new.png' }} style={{ width: 30, height: 30 }} />
          </TouchableOpacity>
        </View>
      </Animated.View>

      {isSignInOpen && (
        <>
        <Animated.View className='w-full'>
        <Animated.View style={inputSlide} className="w-full">
            <Text className="text-gray-700 text-base mb-2">Email</Text>
            <TextInput
              className="border border-gray-300 rounded-lg w-full px-3 py-2"
              value={email}
              onChangeText={setEmail}
            />
          </Animated.View>

          <Animated.View style={inputSlide} className="mt-4 w-full">
            <Text className="text-gray-700 text-base mb-2">Password</Text>
            <TextInput
              className="border border-gray-300 rounded-lg w-full px-3 py-2"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </Animated.View>
          <Animated.View style={inputSlide} className="mt-4 w-full">
            <TouchableOpacity onPress={handleSignIn} className="bg-black rounded-lg w-full py-4">
              <Text onPress={routeSignIn} className="text-white text-center text-lg font-semibold">Sign In</Text>
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
        </>
      )}
    </View>
  );
}