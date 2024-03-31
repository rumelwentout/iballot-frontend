import React from 'react';
import DesktopNav from './DesktopNav';
import { Box, Flex } from '@chakra-ui/react';

const Nav = () => {
  return (
    <Flex minH={'80px'} alignItems={'center'} boxShadow={'sm'} pos={'fixed'} left={0} right={0} zIndex={999} bg={'white'}>
      <Box m={'0 auto'} w={['90vw', '70vw', '80vw', '80vw', '80vw', '60vw']}>
        <DesktopNav />
      </Box>
    </Flex>
  );
};

export default Nav;
