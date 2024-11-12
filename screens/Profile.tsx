// Profile.tsx
import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue } from 'react-native-reanimated';
import ProfileSquare from '@/components/ProfileSquare';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon component

type Props = {};

const Profile = (props: Props) => {
  const [squaresLayout, setSquaresLayout] = useState(
    Array.from({ length: 6 }).map(() => ({ x: 0, y: 0, width: 0, height: 0 }))
  );
  
  const profileInfo = {
    name: 'John Doe',
    age: 25,
    location: 'San Francisco, CA',
    gender: 'Male',
    icon: <Icon name="user" size={20} color="#000" />, // Profile icon
  };

  const validPositions = [
    { x: 0, y: 4 },
    { x: 139, y: 4 },
    { x: 277.6666564941406, y: 4 },
    { x: 0, y: 142.6666717529297 },
    { x: 139, y: 142.6666717529297 },
    { x: 277.6666564941406, y: 142.6666717529297 },
  ];

  const positions = Array.from({ length: 6 }).map(() => ({
    x: useSharedValue(0),
    y: useSharedValue(0),
  }));

  const initialPositions = Array.from({ length: 6 }).map(() => ({ x: 0, y: 0 }));

  const handleLayout = (index: number) => (event: any) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setSquaresLayout((prev) => {
      const newLayout = [...prev];
      newLayout[index] = { x, y, width, height };
      return newLayout;
    });
    initialPositions[index] = { x, y };
  };

  return (
    <GestureHandlerRootView className="flex flex-col justify-center bg-gray-100 h-screen items-center">
      <View className="w-full">
        <Text className="text-3xl ml-4 mb-4 font-bold text-left">Profile</Text>
      </View>

      <View className="aspect-square w-[95%]">
        <Image source={require('@/assets/images/bird.jpg')} className="w-full h-full rounded-md" />
      </View>

      <View className="flex flex-wrap flex-row justify-between mt-2 w-[95%]">
        {Array.from({ length: 6 }).map((_, index) => (
          <ProfileSquare
            key={index}
            index={index}
            position={positions[index]}
            validPositions={validPositions}
            onLayout={handleLayout(index)}
            profileInfo={profileInfo} // Pass profileInfo with the icon
          />
        ))}
      </View>
    </GestureHandlerRootView>
  );
};

export default Profile;
