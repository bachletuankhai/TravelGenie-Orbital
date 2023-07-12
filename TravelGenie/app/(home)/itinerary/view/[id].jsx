import { View, Text } from 'react-native';
import { useSearchParams } from 'expo-router';
import ItineraryView from '../../../../components/ItineraryPage/ItineraryView';

const Plan = () => {
  const params = useSearchParams();
  console.log(params.id);

  // TODO: pass id to itinerary view for api call
  return (
    <ItineraryView itemId={params.id} />
  );
};

export default Plan;
