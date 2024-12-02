import React, { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import TileEditPopup from '@/components/TileEditPopup';
import { doc, getFirestore, updateDoc } from 'firebase/firestore';

type VitalTileProps = {
  profileInfo: { id: string; firstName: string; lastName: string; age: number; location: string; gender: string };
};

const VitalTile: React.FC<VitalTileProps> = ({ profileInfo }) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [data, setData] = useState(profileInfo);

  const firestore = getFirestore();

  const updateData = async (updatedData: any) => {
    try {
      await updateDoc(doc(firestore, "users", profileInfo.id), {
        firstName: updatedData.firstName,
        lastName: updatedData.lastName,
        age: updatedData.age,
        location: updatedData.location,
      });
      console.log('Data updated successfully');
    } catch (error) {
      console.error('Error updating data:', error);
    }
  };

  const handleSave = (updatedData: any) => {
    setData(updatedData);
    updateData(updatedData);
  };

  return (
    <TouchableOpacity onPress={() => setIsPopupVisible(true)} className="py-2 w-[95%]">
      <View className="bg-gray-200 rounded p-4">
        {data && (
          <>
            <Text className="text-lg font-bold">{data.firstName + ' ' + data.lastName}</Text>
            <Text className="text-sm">{data.location}</Text>
            <Text className="text-sm">{data.age} years</Text>
          </>
        )}
      </View>

      <TileEditPopup
        visible={isPopupVisible}
        onClose={() => setIsPopupVisible(false)}
        initialData={data}
        onSave={handleSave}
      />
    </TouchableOpacity>
  );
};

export default VitalTile;