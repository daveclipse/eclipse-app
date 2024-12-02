import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';

interface TileEditPopupProps {
  visible: boolean;
  onClose: () => void;
  initialData: {
    firstName: string;
    lastName: string;
    age: number;
    location: string;
  };
  onSave: (data: { firstName: string; lastName: string; age: number; location: string; }) => void;
}

const TileEditPopup: React.FC<TileEditPopupProps> = ({
  visible,
  onClose,
  initialData,
  onSave,
}) => {
  const [formData, setFormData] = useState(initialData);

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-opacity-50">
        <View className="w-[90%] bg-white rounded p-4 shadow-lg">
          <Text className="text-xl font-bold mb-4">Edit Tile</Text>

          <View className="mb-3">
            <Text className="font-semibold mb-1">First Name</Text>
            <TextInput
              placeholder="First Name"
              value={formData.firstName}
              onChangeText={(text) => handleChange('firstName', text)}
              className="border border-gray-300 rounded p-2"
            />
          </View>

          <View className="mb-3">
            <Text className="font-semibold mb-1">Last Name</Text>
            <TextInput
              placeholder="Last Name"
              value={formData.lastName}
              onChangeText={(text) => handleChange('lastName', text)}
              className="border border-gray-300 rounded p-2"
            />
          </View>

          <View className="mb-3">
            <Text className="font-semibold mb-1">Age</Text>
            <TextInput
              placeholder="Age"
              keyboardType="numeric"
              value={String(formData.age)}
              onChangeText={(text) => handleChange('age', parseInt(text, 10))}
              className="border border-gray-300 rounded p-2"
            />
          </View>

          <View className="mb-3">
            <Text className="font-semibold mb-1">Location</Text>
            <TextInput
              placeholder="Location"
              value={formData.location}
              onChangeText={(text) => handleChange('location', text)}
              className="border border-gray-300 rounded p-2"
            />
          </View>

          <View className="flex-row justify-center mt-4">
            <TouchableOpacity
              onPress={handleSave}
              className="bg-eclipseBlack px-4 py-2 w-1/2 flex rounded"
            >
              <Text className="text-white text-center">Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TileEditPopup;
