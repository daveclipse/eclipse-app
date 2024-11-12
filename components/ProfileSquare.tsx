import React from 'react';
import { Text, View } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

type ProfileSquareProps = {
  index: number;
  position: { x: any; y: any };
  validPositions: { x: number; y: number }[];
  onLayout: (event: any) => void;
  profileInfo: { name: string; age: number; location: string; gender: string; icon: React.ReactNode };
};

const ProfileSquare: React.FC<ProfileSquareProps> = ({ index, position, validPositions, onLayout, profileInfo }) => {
  const initialX = useSharedValue(position.x.value);
  const initialY = useSharedValue(position.y.value);

  const panGesture = Gesture.Pan()
    .onBegin(() => {
      initialX.value = position.x.value;
      initialY.value = position.y.value;
    })
    .onUpdate((event) => {
      position.x.value = initialX.value + event.translationX;
      position.y.value = initialY.value + event.translationY;
    })
    .onEnd(() => {
      const closestPosition = validPositions.reduce((prev, curr) => {
        const distance = (a: { x: number; y: number }, b: { x: number; y: number }) =>
          Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));

        const currentPos = { x: position.x.value, y: position.y.value };
        return distance(currentPos, curr) < distance(currentPos, prev) ? curr : prev;
      });

      position.x.value = withSpring(closestPosition.x);
      position.y.value = withSpring(closestPosition.y);

      initialX.value = closestPosition.x;
      initialY.value = closestPosition.y;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: position.x.value },
      { translateY: position.y.value },
    ],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View
        onLayout={onLayout}
        className="bg-white aspect-square w-[32%] h-1/3 my-2 rounded-md p-2"
        style={animatedStyle}
      >
        <View className="flex-1 justify-center">
          <Text className="font-bold text-md">{profileInfo.name}</Text>
          <Text className="text-xs">{profileInfo.location}</Text>
          <Text className="text-xs">{profileInfo.age} years</Text>
        </View>
        <View style={{ position: 'absolute', bottom: 8, right: 8 }}>
          {profileInfo.icon}
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

export default ProfileSquare;
