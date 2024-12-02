import React, { useState } from 'react';
import { View, Image, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

type ImageCarouselProps = {
  images: string[]; // Assuming the images prop is an array of URIs or local image paths.
};

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  images = [require('../assets/images/paris.jpg')];  const handleScroll = (event: any) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    setCurrentIndex(newIndex);
  };

  return (
    <View className="w-full" style={{ height: width }}>
      <FlatList
        data={images}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16} // Ensures smooth tracking of scroll position
        renderItem={({ item }) => (
          <Image source={require('@/assets/images/paris.jpg')} className="w-full h-full rounded-lg" />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
      <View className="flex flex-row absolute bottom-2 self-center">
        {images.map((_, index) => (
          <View
            key={index}
            className={`w-2 h-2 mx-1 rounded-full ${
              currentIndex === index ? 'bg-black' : 'bg-gray-400'
            }`}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageCarousel;
