import {
  BookmarkIcon,
  LocationIcon,
  HomeIcon,
  MapIcon,
  ProfileIcon,
} from './icons/navbar';
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
    <Pressable flex={1} onPress={handleItemPress} pt='7' pb='2'>
      <Center>
        <page.icon size={size} color={color} />
      </Center>
    </Pressable>
  );
}

export default function NavBar({ currentSelection, onItemPressed }) {
  return (
    <HStack safeAreaBottom alignItems='center' px='2'>
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
