import { View, Text } from 'react-native';
import React from 'react';
import { useSearchParams } from 'expo-router';

const Plan = () => {
  const params = useSearchParams();
  console.log(params);
  return (
    <View>
      <Text>Plan</Text>
    </View>
  );
};

export default Plan;
