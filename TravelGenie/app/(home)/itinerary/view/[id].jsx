import { View, Text } from 'react-native';
import React from 'react';
import { useSearchParams } from 'expo-router';
import ItineraryView from '../../../../components/ItineraryPage/ItineraryView';

const Plan = () => {
  const params = useSearchParams();
  console.log(params);
  return (
    <ItineraryView />
  );
};

export default Plan;
