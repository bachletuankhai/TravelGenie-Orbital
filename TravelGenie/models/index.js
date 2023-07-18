// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { User, PlanItem, Itinerary } = initSchema(schema);

export {
  User,
  PlanItem,
  Itinerary
};