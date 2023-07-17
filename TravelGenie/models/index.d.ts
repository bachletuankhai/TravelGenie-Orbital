import { ModelInit, MutableModel, __modelMeta__, ManagedIdentifier } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled, AsyncCollection } from "@aws-amplify/datastore";





type EagerPlanItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PlanItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly subtitle?: string | null;
  readonly date?: string | null;
  readonly start_time?: string | null;
  readonly end_time?: string | null;
  readonly place_id?: string | null;
  readonly longitude?: number | null;
  readonly latitude?: number | null;
  readonly created_at?: number | null;
  readonly updated_at?: number | null;
  readonly itineraryID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyPlanItem = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<PlanItem, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly subtitle?: string | null;
  readonly date?: string | null;
  readonly start_time?: string | null;
  readonly end_time?: string | null;
  readonly place_id?: string | null;
  readonly longitude?: number | null;
  readonly latitude?: number | null;
  readonly created_at?: number | null;
  readonly updated_at?: number | null;
  readonly itineraryID: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type PlanItem = LazyLoading extends LazyLoadingDisabled ? EagerPlanItem : LazyPlanItem

export declare const PlanItem: (new (init: ModelInit<PlanItem>) => PlanItem) & {
  copyOf(source: PlanItem, mutator: (draft: MutableModel<PlanItem>) => MutableModel<PlanItem> | void): PlanItem;
}

type EagerItinerary = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Itinerary, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly start_date?: string | null;
  readonly end_date?: string | null;
  readonly location?: string | null;
  readonly user_id?: string | null;
  readonly created_at?: number | null;
  readonly updated_at?: number | null;
  readonly photo_url?: string | null;
  readonly PlanItems?: (PlanItem | null)[] | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

type LazyItinerary = {
  readonly [__modelMeta__]: {
    identifier: ManagedIdentifier<Itinerary, 'id'>;
    readOnlyFields: 'createdAt' | 'updatedAt';
  };
  readonly id: string;
  readonly name?: string | null;
  readonly start_date?: string | null;
  readonly end_date?: string | null;
  readonly location?: string | null;
  readonly user_id?: string | null;
  readonly created_at?: number | null;
  readonly updated_at?: number | null;
  readonly photo_url?: string | null;
  readonly PlanItems: AsyncCollection<PlanItem>;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
}

export declare type Itinerary = LazyLoading extends LazyLoadingDisabled ? EagerItinerary : LazyItinerary

export declare const Itinerary: (new (init: ModelInit<Itinerary>) => Itinerary) & {
  copyOf(source: Itinerary, mutator: (draft: MutableModel<Itinerary>) => MutableModel<Itinerary> | void): Itinerary;
}