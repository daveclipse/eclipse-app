import React, { useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon component
import ImageCarousel from '@/components/ImageCarousel';
import ProfilePopover from '@/components/ProfilePopover';
import ProfileSquare from '@/components/ProfileSquare';
import Animated, { useSharedValue } from 'react-native-reanimated';

type Props = {};

const Profile = (props: Props) => {
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [squares, setSquares] = useState(
    Array.from({ length: 6 }).map((_, index) => ({
      id: index,
      position: { x: 0, y: 0 },
    }))
  );

  // State for positions, updated each time we add a new square
  const [positions, setPositions] = useState(
    Array.from({ length: 6 }).map(() => ({ x: useSharedValue(0), y: useSharedValue(0) }))
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

  const onPopover = () => {
    setIsPopoverVisible(true);
  };

  const handleLayout = (index: number) => (event: any) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setSquares((prev) => {
      const newSquares = [...prev];
      newSquares[index].position = { x, y };
      return newSquares;
    });
  };

  const addSquare = () => {
    setSquares((prev) => {
      const newSquare = { id: prev.length, position: { x: 0, y: 0 } };
      return [...prev, newSquare];
    });
    setPositions((prev) => [
      ...prev,
      { x: useSharedValue(0), y: useSharedValue(0) } // Add new shared value for position
    ]);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1, backgroundColor: '#f3f4f6' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ alignItems: 'center', paddingBottom: 20 }}>
          <View style={{ width: '100%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16 }}>
              <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Profile</Text>
              <TouchableOpacity style={{ cursor: 'pointer' }} onPress={onPopover}>
                <Icon name="plus" size={24} color="#000" />
              </TouchableOpacity>
            </View>
          </View>

          <ProfilePopover isVisible={isPopoverVisible} onClose={() => setIsPopoverVisible(false)}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
            </View>
          </ProfilePopover>

          <View style={{ aspectRatio: 1, width: '95%' }}>
            <ImageCarousel images={['../assets/images/bird.jpg', '../assets/images/paris.jpg']}/>
          </View>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 8, width: '95%' }}>
            {squares.map((square, index) => (
              <ProfileSquare
                key={square.id}
                index={index}
                position={positions[index]} // Pass the shared position value
                validPositions={validPositions}
                onLayout={handleLayout(index)}
                profileInfo={profileInfo}
              />
            ))}
          </View>
          <TouchableOpacity style={{ marginTop: 20 }} onPress={addSquare}>
            <Text style={{ fontSize: 18, color: '#007bff' }}>Add Square</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Profile;
