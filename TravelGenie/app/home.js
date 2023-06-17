import { useCallback, useState } from "react";
import NavBar from "../components/NavBar";
import {
  Box,
  Center,
} from 'native-base';

export default function HomePage() {
  const [currentPage, setCurrentPage] = useState("Home");

  const handleItemPress = useCallback((name) => {
    if (name === currentPage) {
      // TODO: Scroll to top or do sth here
    } else {
      setCurrentPage(name);
    }
  }, [currentPage]);

  return (
    <Center>
      <Box
        flex={1} bg="white" safeArea
        w="100%" maxW="420px" px="15px" alignItems='center'
      >
        <NavBar currentSelection={currentPage} onItemPressed={handleItemPress}/>
      </Box>
    </Center>
  );
}
