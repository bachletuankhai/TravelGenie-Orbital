import { Button } from "native-base";

export default function BlueButton({
  isDisabled,
  isLoading,
  onPress,
  title,
  loadingText,
  ...props
}) {
  return (
    <Button
      isDisabled={isDisabled}
      isLoading={isLoading}
      isLoadingText={loadingText}
      onPress={onPress}
      variant='solid'
      size='lg'
      h='63'
      borderRadius='2xl'
      bg='primary.400'
      _text={{
        color: 'white',
        fontSize: 'sm',
        fontWeight: '700',
      }}
      _pressed={{
        bgColor: 'primary.600',
      }}
      {...props}
    >
      {title}
    </Button>
  );
}
