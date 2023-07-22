import { View, Text } from 'react-native';
import { useSearchParams } from 'expo-router';
import ItineraryView from '../../../../components/ItineraryPage/ItineraryView';

const Plan = () => {
  // TODO: pass id to itinerary view for api call
  return (
    <ItineraryView />
  );
};

export default Plan;
