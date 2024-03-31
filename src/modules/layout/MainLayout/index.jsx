import { Box } from '@chakra-ui/react';
import React from 'react';
import Nav from '../../shared/components/nav';

const MainLayout = ({ children }) => {
  return (
    <Box >
      <Nav />
      <Box m={'0 auto'} w={['90vw', '70vw', '80vw', '80vw', '80vw', '60vw']}>{children}</Box>
    </Box>
  );
};

export default MainLayout;
