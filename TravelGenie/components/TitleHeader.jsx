import { useRouter } from 'expo-router';
import {
  HStack,
  IconButton,
  ArrowBackIcon,
  Text,
} from 'native-base';
import { useCallback } from 'react';
import { View } from 'react-native';

export default function Title({
  title, onBackPress, _title, _style, showBackButton=true,
}) {
  const router = useRouter();

  const defaultBack = useCallback(() => {
    router.back();
  }, [router]);
  return (
    <HStack
      w='100%' h='50px'
      justifyContent='center'
      alignItems='center'
      {..._style}
    >
      {showBackButton && <IconButton
        size='md'
        position='absolute'
        left='4'
        top='1'
        variant="ghost"
        borderRadius='full'
        _pressed={{
          bg: 'coolGray.200',
        }}
        icon={<ArrowBackIcon color='#593131' />}
        onPress={onBackPress || defaultBack}
      />}
      <View pointerEvents='none'>
        <Text
          color='black'
          fontWeight='700'
          fontSize='2xl'
          w='100%'
          textAlign='center'
          {..._title}
        >
          {title}
        </Text>
      </View>
    </HStack>
  );
}
