import {
  Box,
  Pressable,
  Text,
} from 'native-base';
import { ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ItineraryItemCard = ({ onPress, item, _text, ...props }) => {
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
            source={{ uri: item.coverPhoto }}
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
              <Text
                {..._text}
                position='absolute'
                bottom='1'
                left='0'
                w='100%'
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
            </LinearGradient>
          </ImageBackground>
        </Box>
      )}
    </Pressable>
  );
};

export default ItineraryItemCard;
