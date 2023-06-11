import {
  IconButton,
  Input,
} from 'native-base';
import {
  SearchIcon,
  MicrophoneIcon,
} from './icons/searchbar';

const Microphone = ({ onPress }) => {
  return (
    <IconButton
      mr='2'
      variant="ghost"
      borderRadius='full'
      icon={<MicrophoneIcon />}
      onPress={onPress}
    />
  );
};

const SearchBar = ({ value, onChangeText, onVoice, enableVoice=false }) => {
  return (
    <Input
      bg='white'
      value={value}
      onChangeText={onChangeText}
      borderWidth='1'
      borderRadius='full'
      borderColor='greyBorder.400'
      fontSize='sm'
      fontWeight='400'
      h='52px'
      color='greyText.400'
      _focus={{
        borderColor: 'greyText.300',
        bgColor: 'white',
      }}
      placeholder='Search'
      InputLeftElement={<SearchIcon size={'xl'} color='black' />}
      InputRightElement={enableVoice && <Microphone onPress={onVoice} />}
    />
  );
};

export default SearchBar;
