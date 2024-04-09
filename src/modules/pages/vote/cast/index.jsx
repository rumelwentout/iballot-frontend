import React from 'react';
import { Box } from '@chakra-ui/react';
import OnboardingShape from '../../../shared/components/OnboardingShape';
import Nav from '../../../shared/components/nav';
import VoteWindow from './VoteWindow';

const index = () => {
  return (
    <>
      <Nav />
      <Box
        pos={'relative'}
        h={'100svh'}
        overflow={'hidden'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box
          w={'105vw'}
          opacity={0.5}
          pos={'absolute'}
          top={'0'}
          left={'-5vw'}
          zIndex={-1}
        >
          <OnboardingShape />
        </Box>
        <VoteWindow />
      </Box>
    </>
  );
};

export default index;
