import { Stack, Tabs, useRouter } from "expo-router";
import { useState, useCallback } from "react";
import {
  BookmarkIcon,
  LocationIcon,
  HomeIcon,
  MapIcon,
  ProfileIcon,
} from '../../assets/icons/navbar';
import { iconColors } from "../../assets/colors/iconColors";
import { LocationProvider } from "../../contexts/homeLocation";

const pages = [
  {
    id: 0,
    name: "Home",
    icon: HomeIcon,
    link: '/',
  },
  {
    id: 1,
    name: "Itinerary",
    icon: MapIcon,
    link: '/itinerary',
  },
  {
    id: 2,
    name: "Map",
    icon: LocationIcon,
    link: '/map',
  },
  {
    id: 3,
    name: "Saved",
    icon: BookmarkIcon,
    link: '/discover',
  },
  {
    id: 4,
    name: "Profile",
    icon: ProfileIcon,
    link: '/profile',
  },
];

export default function HomeLayout() {
  return (
    <LocationProvider>
      <Tabs screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0,
          height: 90,
          position: 'absolute',
        },
        tabBarItemStyle: {
        },
        tabBarActiveTintColor: iconColors.dark,
        tabBarInactiveTintColor: iconColors.unselected,
        tabBarHideOnKeyboard: true,
      }}>
        <Tabs.Screen
          name="index"
          options={{
            tabBarIcon: HomeIcon,
          }}
        />
        <Tabs.Screen
          name="discover"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="itinerary"
          options={{
            tabBarIcon: MapIcon,
          }}
        />
        <Tabs.Screen
          name="map"
          options={{
            tabBarIcon: LocationIcon,
          }}
        />
        <Tabs.Screen
          name="favorite"
          options={{
            href: null,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarIcon: ProfileIcon,
          }}
        />
      </Tabs>
    </LocationProvider>
  );
}
