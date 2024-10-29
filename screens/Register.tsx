import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import 'nativewind';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [height, setHeight] = useState('');
  const [city, setCity] = useState('');
  const [hometown, setHometown] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [genderPreference, setGenderPreference] = useState('');

  const navigation = useNavigation<any>();

  const routePreferences = () => {
    navigation.navigate('preferences');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-1 items-center justify-center bg-white px-4">
      {/* Back Button */}
      <TouchableOpacity onPress={handleBack} className="absolute top-12 left-4">
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <Text className="text-2xl font-bold mb-6 text-center">Register</Text>

      <TextInput
        className="border border-gray-300 rounded-lg w-full px-3 py-2 mb-4"
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        className="border border-gray-300 rounded-lg w-full px-3 py-2 mb-4"
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        className="border border-gray-300 rounded-lg w-full px-3 py-2 mb-4"
        placeholder="Height"
        value={height}
        onChangeText={setHeight}
        keyboardType="numeric"
      />
      <TextInput
        className="border border-gray-300 rounded-lg w-full px-3 py-2 mb-4"
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType="numeric"
      />

      <TouchableOpacity onPress={routePreferences} className="bg-black rounded-lg w-full py-4">
        <Text className="text-white text-center text-lg font-semibold">Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;
