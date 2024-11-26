import React from 'react';
import { View, Text } from 'react-native'; // or 'react-native-web'

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