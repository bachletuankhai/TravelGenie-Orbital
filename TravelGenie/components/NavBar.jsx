import BookmarkIcon from "./icons/navbar/BookmarkIcon";
import HomeIcon from "./icons/navbar/HomeIcon";
import LocationIcon from "./icons/navbar/LocationIcon";
import MapIcon from "./icons/navbar/MapIcon";
import ProfileIcon from "./icons/navbar/ProfileIcon";
import {
  Center,
  HStack,
  Pressable,
} from 'native-base';
import { iconColors } from "../assets/colors/iconColors";
import { useCallback } from "react";

const pages = [
  {
    id: 0,
    name: "Home",
    icon: HomeIcon,
  },
  {
    id: 1,
    name: "Itinerary",
    icon: MapIcon,
  },
  {
    id: 2,
    name: "Map",
    icon: LocationIcon,
  },
  {
    id: 3,
    name: "Saved",
    icon: BookmarkIcon,
  },
  {
    id: 4,
    name: "Profile",
    icon: ProfileIcon,
  },
];

function NavBarButton({ page, isSelected, size, onItemPressed }) {
  const color = isSelected ? iconColors.dark : iconColors.unselected;

  const handleItemPress = useCallback(() => {
    onItemPressed(page.name);
  }, [page, onItemPressed]);

  return (
    <Pressable cursor="pointer" flex={1} onPress={handleItemPress} py='3'>
      <Center>
        <page.icon size={size} color={color} />
      </Center>
    </Pressable>
  );
}

export default function NavBar({ currentSelection, onItemPressed }) {
  return (
    <HStack alignItems='center' justifyContent='space-around'>
      {pages.map((page) => (
        <NavBarButton
          page={page}
          key={page.id}
          isSelected={page.name === currentSelection}
          size='xl'
          onItemPressed={onItemPressed}
        />
      ))}
    </HStack>
  );
}
