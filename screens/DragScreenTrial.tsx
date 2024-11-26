import React, { useState } from 'react';
import { View, Text, Image, ScrollView, SafeAreaView, Button, TouchableOpacity, Pressable } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, { useSharedValue } from 'react-native-reanimated';
import ProfileSquare from '@/components/ProfileSquare';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon component
import ImageCarousel from '@/components/ImageCarousel';
import ProfilePopover from '@/components/ProfilePopover';

type Props = {};

const Profile = (props: Props) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
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

  const onPopover = () => {
    setIsPopoverVisible(true);
  }

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
    <GestureHandlerRootView className="flex flex-col bg-gray-100 h-screen">
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}>
          <View className="w-full">
            <View className="flex flex-row justify-between items-center px-4">
              <Text className="text-3xl font-bold">Profile</Text>
              <TouchableOpacity className="" onPress={onPopover}>
                <Icon name="plus" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          <ProfilePopover isVisible={isPopoverVisible} onClose={() => setIsPopoverVisible(false)} children={undefined}>
          </ProfilePopover>

          <View className="aspect-square w-[95%]">
            <ImageCarousel images={[require('../assets/images/bird.jpg'), require('../assets/images/paris.jpg')]}/>
          </View>
          <View className="flex flex-wrap flex-row justify-between mt-2 w-[95%]">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProfileSquare
                key={index}
                index={index}
                position={positions[index]}
                validPositions={validPositions}
                onLayout={handleLayout(index)}
                profileInfo={profileInfo}
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Profile;
