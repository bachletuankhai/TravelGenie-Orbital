import { Stack, useRouter } from "expo-router";
import NavBar from "../../components/NavBar";
import { useState, useCallback } from "react";
import {
  BookmarkIcon,
  LocationIcon,
  HomeIcon,
  MapIcon,
  ProfileIcon,
} from '../../components/icons/navbar';

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
    link: '/initerary',
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
  const [currentPageID, setCurrentPageID] = useState(0);
  const [animationType, setAnimationType] = useState('push');
  const router = useRouter();

  const handleItemPress = useCallback((id) => {
    if (id === currentPageID) {
      // TODO: Scroll to top or do sth here
    } else {
      const link = pages[id].link;
      if (id < currentPageID) {
        setAnimationType('pop');
      } else {
        setAnimationType('push');
      }
      setCurrentPageID(id);
      try {
        router.replace(link);
      } catch (error) {
        console.log(`Name: ${id}`);
        console.log(`Link: ${link}`);
        console.log(`NavBar error: ${error}`);
      }
    }
  }, [currentPageID, router]);


  return (
    <>
      <Stack
        screenOptions={{
          animation: "slide_from_right",
          animationTypeForReplace: animationType,
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <NavBar
        currentSelection={currentPageID}
        onItemPressed={handleItemPress}
      />
    </>
  );
}
