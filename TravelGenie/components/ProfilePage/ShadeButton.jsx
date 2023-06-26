import { Button } from "native-base";

export default function ShadeButton({ title, onPress, ...props }) {
  return (
    <Button
      onPress={onPress}
      variant='solid'
      size='lg'
      h='70'
      borderRadius='2xl'
      shadow='5'
      bg='white'
      textAlign='left'
      justifyContent='flex-start'
      _text={{
        color: 'black',
        fontSize: 'md',
        fontWeight: '400',
        textAlign: 'left',
      }}
      _pressed={{
        bgColor: '#d4d4d4',
      }}
      {...props}
    >
      {title}
    </Button>
  );
}
