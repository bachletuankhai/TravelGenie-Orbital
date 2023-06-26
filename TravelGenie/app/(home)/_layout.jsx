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

  // return (
  //   <>
  //     <Stack
  //       screenOptions={{
  //         animationDuration: 100,
  //         animation: "slide_from_right",
  //         animationTypeForReplace: animationType,
  //         headerShown: false,
  //         gestureEnabled: false,
  //       }}
  //     />
  //   </>
  // );
  return (
    <Tabs screenOptions={{
      tabBarShowLabel: false,
      headerShown: false,
      tabBarStyle: {
        borderTopWidth: 1, // TODO: delete this line when front end done
        height: 90,
        position: 'absolute',
      },
      tabBarItemStyle: {
      },
      tabBarActiveTintColor: iconColors.dark,
      tabBarInactiveTintColor: iconColors.unselected,
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
        name="initerary/index"
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
          tabBarIcon: BookmarkIcon,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ProfileIcon,
        }}
      />
      <Tabs.Screen
        name="initerary/[id]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
