import { View, Text } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import {
  HomePage,
  DiscoverPage,
  IniteraryPage,
  MapPage,
  FavoritePage,
  ProfilePage,
  NavBar,
} from '.';
import {
  VStack,
  Box,
  Center,
} from 'native-base';

const pages = [
  {
    id: 0,
    component: HomePage,
  },
  {
    id: 1,
    component: IniteraryPage,
  },
  {
    id: 2,
    component: MapPage,
  },
  {
    id: 3,
    component: DiscoverPage,
  },
  {
    id: 4,
    component: ProfilePage,
  },
];

const Home = () => {
  const [currentPageID, setCurrentPageID] = useState(0);

  const onNavBarButtonPress = useCallback((id) => {
    if (id === currentPageID) {
      // TODO: Scroll to top or do sth here
    } else {
      if (id < currentPageID) {
      } else {
      }
      setCurrentPageID(id);
    }
  }, [currentPageID]);

  const PageComponent = useCallback((props) => {
    const Com = pages[currentPageID].component;
    return <Com {...props} />;
  }, [currentPageID]);

  return (
    <Center w='100%'>
      <Box w='100%' h='100%'>
        <VStack h='100%'>
          <PageComponent />
          <NavBar
            position='absolute'
            bottom='0'
            left='0'
            w='100%'
            currentSelection={currentPageID}
            onItemPressed={onNavBarButtonPress}
          />
        </VStack>
      </Box>
    </Center>
  );
};

export default Home;
