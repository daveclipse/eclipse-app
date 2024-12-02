import React, { useEffect } from 'react';
import { View, Dimensions, TouchableWithoutFeedback, Text } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, runOnJS } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Array of interests with icons
const interests = [
  { interest: 'Traveling', icon: <Ionicons name="airplane" size={24} color="black" /> },
  { interest: 'Music', icon: <Ionicons name="musical-notes" size={24} color="black" /> },
  { interest: 'Photography', icon: <Ionicons name="camera" size={24} color="black" /> },
  { interest: 'Cooking', icon: <Ionicons name="restaurant" size={24} color="black" /> },
  // Add more interests as needed
];

type ProfilePopoverProps = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const ProfilePopover: React.FC<ProfilePopoverProps> = ({ isVisible, onClose, children }) => {
  const translateX = useSharedValue(width);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (isVisible) {
      translateX.value = withTiming(0, { duration: 300 });
      opacity.value = withTiming(1, { duration: 300 });
    } else {
      translateX.value = withTiming(width, { duration: 300, easing: Easing.out(Easing.exp) }, (finished) => {
        if (finished) {
          runOnJS(onClose)();
        }
      });
      opacity.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.exp) });
    }
  }, [isVisible]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
    opacity: opacity.value, // Apply opacity for fade effect
  }));

  return (
    <View className={`absolute top-0 right-0 bottom-0 z-50 ${isVisible ? '' : 'hidden'} w-screen`}>
      {/* Background overlay - Touchable to close */}
      {isVisible && (
        <TouchableWithoutFeedback onPress={onClose}>
          <View className="absolute top-0 left-0 right-0 bottom-0 bg-transparent opacity-50 z-10" />
        </TouchableWithoutFeedback>
      )}

      {/* Popover content - This should have 5/6 width */}
      {isVisible && (
        <Animated.View
          style={[
            animatedStyle,
            {
              position: 'absolute',
              top: 0,
              right: 0,
              height: '100%',
              backgroundColor: 'white',
              zIndex: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,
              borderRadius: 20,
            },
          ]}
          className="rounded-xl w-5/6"
        >
          {/* Card List */}
          <View className="p-4">
            <Text className="text-xl font-bold mb-4">Interests</Text>

            <View className="space-y-4">
              {interests.map((item, index) => (
                <Card key={index} interest={item.interest} icon={item.icon} />
              ))}
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

// Card component to display interest and icon
type CardProps = {
  interest: string;
  icon: React.ReactNode;
};

const Card: React.FC<CardProps> = ({ interest, icon }) => {
  return (
    <View className="flex flex-row items-center border-gray-300 border-b-[.5px] p-4 rounded-xl">
      <View className="mr-4">{icon}</View>
      <Text className="text-lg font-medium">{interest}</Text>
    </View>
  );
};

export default ProfilePopover;
