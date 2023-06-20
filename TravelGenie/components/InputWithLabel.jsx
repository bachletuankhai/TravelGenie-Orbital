import {
  FormControl,
  Input,
} from "native-base";

export default function InputWithLabel({
  value, onChangeText, label, placeholder, _label, _input, type, isReadOnly,
}) {
  return (
    <FormControl>
      <FormControl.Label
        left='2'
        _text={{
          color: 'greyText.400',
          fontSize: 'md',
          fontWeight: '700',
        }}
        {..._label}
      >
        {label}
      </FormControl.Label>
      <Input
        isReadOnly={isReadOnly}
        type={type}
        value={value}
        onChangeText={onChangeText}
        borderWidth='1'
        borderRadius='full'
        borderColor='greyBorder.400'
        fontSize='sm'
        fontWeight='400'
        h='12'
        color='greyText.400'
        _focus={{
          borderColor: 'greyText.300',
          bgColor: 'white',
        }}
        placeholder={placeholder}
        {..._input}
      />
    </FormControl>
  );
}
