import {
  Box,
  Pressable,
  Text,
  VStack,
} from 'native-base';
import { ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo } from 'react';

const ItineraryItemCard = ({ onPress, item, _text, ...props }) => {
  const dateString = useMemo(() => {
    const startDate = new Date(item.start_date);
    const endDate = new Date(item.end_date);
    const startDateStr = startDate.toLocaleString('en-US', {
      month: 'long', day: 'numeric',
    });
    const endDateStr = endDate.toLocaleString('en-US', {
      month: 'long', day: 'numeric',
    });
    // console.log(startDateStr);
    // console.log(endDateStr);
    return `${startDateStr} - ${endDateStr}`;
  }, [item]);

  // console.log(dateString);

  return (
    <Pressable onPress={onPress}>
      {({
        isHovered,
        isFocused,
        isPressed,
      }) => (
        <Box {...props}
          h='160px'
          flex='1'
          borderRadius='10'
          flexShrink={1}
          borderWidth={0}
        >
          <ImageBackground
            source={{ uri: item.photo_url }}
            resizeMode='cover'
            imageStyle={{
              borderRadius: 10,
            }}
            style={{
              borderRadius: 10,
              flex: 1,
            }}
          >
            <LinearGradient
              colors={[
                'transparent',
                isPressed ? 'rgba(0,0,0,0.85)' : 'rgba(0,0,0,0.8)',
              ]}
              end={{ x: 0.5, y: 1 }}
              style={{
                flex: 1,
                flexShrink: 1,
                backgroundColor: "white",
                flexWrap: 'wrap',
                alignItems: "flex-start",
                flexDirection: 'row',
                paddingHorizontal: 12,
                borderRadius: 10,
                backgroundColor: "transparent",
              }}
            >
              <VStack
                position='absolute'
                bottom='3'
                left='0'
                w='100%'
                space='0.5'
              >
                <Text
                  {..._text}
                  color='white'
                  fontWeight='700'
                  fontSize='lg'
                  flex='1'
                  flexShrink={1}
                  flexWrap='wrap'
                  ml='14px'
                >
                  {item.name}
                </Text>
                <Text
                  {..._text}
                  color='white'
                  fontWeight='700'
                  fontSize='lg'
                  flex='1'
                  flexShrink={1}
                  flexWrap='wrap'
                  ml='14px'
                >
                  {dateString}
                </Text>
              </VStack>
            </LinearGradient>
          </ImageBackground>
        </Box>
      )}
    </Pressable>
  );
};

export default ItineraryItemCard;
