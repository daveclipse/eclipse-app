import { View, Text, TextInput, TouchableOpacity, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Profile = () => {
  const [city, setCity] = useState('');
  const [hometown, setHometown] = useState('');
  const [genderPreference, setGenderPreference] = useState('');
  const [otherGender, setOtherGender] = useState('');
  const [isPickerVisible, setIsPickerVisible] = useState(false);

  const navigation = useNavigation();

  const handleOpenPicker = () => setIsPickerVisible(true);
  const handleClosePicker = () => setIsPickerVisible(false);

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <View className="flex-1 bg-white px-4">
      <TouchableOpacity onPress={handleBack} className="absolute top-12 left-4">
        <Ionicons name="chevron-back" size={24} color="black" />
      </TouchableOpacity>

      <View className="flex-1 justify-center">
        <Text className="text-2xl font-bold mb-5">Profile</Text>

        <Text className="text-lg mb-1">City</Text>
        <TextInput
          className="border border-gray-300 p-3 rounded-lg mb-5"
          placeholder="Enter your city"
          value={city}
          onChangeText={setCity}
        />

        <Text className="text-lg mb-1">Hometown</Text>
        <TextInput
          className="border border-gray-300 p-3 rounded-lg mb-5"
          placeholder="Enter your hometown"
          value={hometown}
          onChangeText={setHometown}
        />

        <Text className="text-lg mb-1">Gender Preference</Text>
        <TouchableOpacity onPress={handleOpenPicker} className="border border-gray-300 p-3 rounded-lg mb-5">
          <Text className="text-gray-600">
            {genderPreference ? genderPreference : 'Select gender preference'}
          </Text>
        </TouchableOpacity>

        {genderPreference === 'Other' && (
          <TextInput
            className="border border-gray-300 p-3 rounded-lg mb-5"
            placeholder="Specify your gender preference"
            value={otherGender}
            onChangeText={setOtherGender}
          />
        )}

        {/* Modal for the Picker */}
        <Modal visible={isPickerVisible} transparent={true} animationType="slide">
          <View className="flex-1 justify-end bg-transparent bg-opacity-50">
            <View className="bg-white p-5 rounded-lg">
              <Text className="text-lg font-semibold mb-3">Select Gender Preference</Text>
              <Picker
                selectedValue={genderPreference}
                onValueChange={(itemValue) => {
                  setGenderPreference(itemValue);
                  handleClosePicker();
                }}
              >
                <Picker.Item label="Select gender preference" value="" />
                <Picker.Item label="Male" value="Male" />
                <Picker.Item label="Female" value="Female" />
                <Picker.Item label="Other" value="Other" />
              </Picker>
              <TouchableOpacity onPress={handleClosePicker} className="mt-3 bg-black p-2 rounded-lg">
                <Text className="text-center text-white font-semibold">Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

export default Profile;
