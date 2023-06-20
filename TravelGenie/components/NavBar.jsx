import {
  BookmarkIcon,
  LocationIcon,
  HomeIcon,
  MapIcon,
  ProfileIcon,
} from '../assets/icons/navbar';
import {
  HStack,
  IconButton,
  Box,
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

  const PageIcon = useCallback(() => {
    const Ic = pages[page.id].icon;
    return (
      <Ic size={size} color={color} />
    );
  }, [page, size, color]);

  const handleItemPress = useCallback(() => {
    onItemPressed(page.id);
  }, [page, onItemPressed]);

  return (
    <IconButton
      icon={<PageIcon />}
      size='sm'
      onPress={handleItemPress}
      variant='unstyled'
      py='8'
    />
  );
}

export default function NavBar({ currentSelection, onItemPressed, ...props }) {
  return (
    <Box {...props}>
      <HStack alignItems='center' w='100%' bg='white' justifyContent='space-around' px='4'>
        {pages.map((page) => (
          <NavBarButton
            page={page}
            key={page.id}
            isSelected={page.id === currentSelection}
            size='xl'
            onItemPressed={onItemPressed}
          />
        ))}
      </HStack>
    </Box>
  );
}
