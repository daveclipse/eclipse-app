import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import Icon component
import ImageCarousel from '@/components/ImageCarousel';
import ProfilePopover from '@/components/ProfilePopover';
import ProfileSquare from '@/components/ProfileSquare';
import Animated, { useSharedValue } from 'react-native-reanimated';
import VitalTile from '@/components/VitalTile';
import { profile } from 'console';
import { useRoute } from '@react-navigation/native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

type Props = {};

const Profile = (props: Props) => {
  const route = useRoute();
  const { userId } = route.params as { userId: string };
  const [isPopoverVisible, setIsPopoverVisible] = useState(false);
  const [profileInfo, setProfileInfo] = useState<any>(null);

  useEffect(() => {
    if (userId) {
      const fetchUserData = async () => {
        try {
          const firestore = getFirestore();
          const userDocRef = doc(firestore, 'users', userId);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            console.log(userDoc.data());
            setProfileInfo(userDoc.data());
          } else {
            console.log('User not found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };

      fetchUserData();
    }
  }, [userId]);


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

          <View className='aspect-square rounded w-[95%]'>
            {/* <ImageCarousel images={['../assets/images/bird.jpg', '../assets/images/paris.jpg']}/> */}
            <Image source={require('../assets/images/bird.jpg')} className='rounded w-full h-full' />
          </View>
          <View /*style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginTop: 8, width: '95%' }} */>
            {/* {squares.map((square, index) => (
              <ProfileSquare
                key={square.id}
                index={index}
                position={positions[index]} // Pass the shared position value
                validPositions={validPositions}
                onLayout={handleLayout(index)}
                profileInfo={profileInfo}
              />
            ))} */}
          </View>
          {profileInfo && <VitalTile profileInfo={profileInfo} /> }
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default Profile;