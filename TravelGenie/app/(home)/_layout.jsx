import { Stack } from "expo-router";
import NavBar from "../../components/NavBar";
import { useState, useCallback } from "react";

const pages = [
  {
    id: 0,
    name: "Home",
    
  }
]

export default function HomeLayout() {
  const [currentPage, setCurrentPage] = useState("Home");

  const handleItemPress = useCallback((name) => {
    if (name === currentPage) {
      // TODO: Scroll to top or do sth here
    } else {
      setCurrentPage(name);
    }
  }, [currentPage]);


  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <NavBar currentSelection={currentPage} onItemPressed={handleItemPress} />
    </>
  );
}
