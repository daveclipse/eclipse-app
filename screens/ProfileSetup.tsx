import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ProfileSetup = () => {
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('123-456-7890');
  const [address, setAddress] = useState('123 Main St, Anytown, USA');

  const [isEditing, setIsEditing] = useState({
    name: false,
    email: false,
    phone: false,
    address: false,
  });

  const navigation = useNavigation();

  const handleSave = (field: string) => {
    setIsEditing({ ...isEditing, [field]: false });
    console.log(`${field} saved`);
  };

  const handleEdit = (field: string) => {
    setIsEditing({ ...isEditing, [field]: true });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    
    <ScrollView className="flex-1 bg-white px-4">
      <TouchableOpacity onPress={handleBack} className="absolute top-12 left-4">
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <View className="flex-1 items-center justify-center mt-16">
        <Image
          source={{ uri: 'https://via.placeholder.com/150' }}
          className='w-full h-1/4'
        />
      </View>

      <View className="flex-1 justify-center mt-8">
        <View className="mb-5">
          <Text className="text-lg mb-1">Name</Text>
          {isEditing.name ? (
            <TextInput
              className="border border-gray-300 p-3 rounded-lg"
              value={name}
              onChangeText={setName}
              onBlur={() => handleSave('name')}
            />
          ) : (
            <TouchableOpacity onPress={() => handleEdit('name')}>
              <Text className="border border-gray-300 p-3 rounded-lg">{name}</Text>
            </TouchableOpacity>
          )}
        </View>

        <View className="mb-5">
          <Text className="text-lg mb-1">Email</Text>
          {isEditing.email ? (
            <TextInput
              className="border border-gray-300 p-3 rounded-lg"
              value={email}
              onChangeText={setEmail}
              onBlur={() => handleSave('email')}
              keyboardType="email-address"
            />
          ) : (
            <TouchableOpacity onPress={() => handleEdit('email')}>
              <Text className="border border-gray-300 p-3 rounded-lg">{email}</Text>
            </TouchableOpacity>
          )}
        </View>

        <View className="mb-5">
          <Text className="text-lg mb-1">Phone</Text>
          {isEditing.phone ? (
            <TextInput
              className="border border-gray-300 p-3 rounded-lg"
              value={phone}
              onChangeText={setPhone}
              onBlur={() => handleSave('phone')}
              keyboardType="phone-pad"
            />
          ) : (
            <TouchableOpacity onPress={() => handleEdit('phone')}>
              <Text className="border border-gray-300 p-3 rounded-lg">{phone}</Text>
            </TouchableOpacity>
          )}
        </View>

        <View className="mb-5">
          <Text className="text-lg mb-1">Address</Text>
          {isEditing.address ? (
            <TextInput
              className="border border-gray-300 p-3 rounded-lg"
              value={address}
              onChangeText={setAddress}
              onBlur={() => handleSave('address')}
            />
          ) : (
            <TouchableOpacity onPress={() => handleEdit('address')}>
              <Text className="border border-gray-300 p-3 rounded-lg">{address}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileSetup;