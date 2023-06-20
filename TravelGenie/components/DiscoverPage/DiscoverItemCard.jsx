import { useCallback, useState } from 'react';
import {
  Box,
  IconButton,
  Text,
} from 'native-base';
import { ImageBackground, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BookmarkIcon from '../../assets/icons/discoverItem/BookmarkIcon';
import { categories } from '../../lib/categories';

function BookmarkButton() {
  const [saved, setSaved] = useState(false);

  return (
    <IconButton
      variant='unstyled'
      icon={<BookmarkIcon size='lg' color='#FFFFFF' isSaved={saved} />}
      size='xs'
      _pressed={{
        bg: "transparent",
      }}
      position='absolute'
      top='1'
      right='1'
      onPress={() => setSaved(!saved)}
    />
  );
}

const DiscoverItemCard = ({ item, _text, ...props }) => {
  const CategoryIcon = useCallback((props) => {
    const GetIcon = categories
        .filter((cat) => cat.name == item.category)[0]?.icon ||
        categories[2].icon;
    return <GetIcon {...props} />;
  }, [item]);
  return (
    <Box {...props}
      h='160px'
      flex='1'
      borderRadius='xl'
      maxW='220px'
      flexShrink={1}
      borderWidth={0}
    >
      <ImageBackground
        source={{uri: item.image}}
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
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          end={{x: 0.5, y: 1}}
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
          <BookmarkButton />
          <Box
            position='absolute'
            top='3'
            left='3'
          >
            <CategoryIcon
              size='sm' color='#FFFFFF'
            />
          </Box>
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
            {item.title}
          </Text>
        </LinearGradient>
      </ImageBackground>
    </Box>
  );
};

export default DiscoverItemCard;
