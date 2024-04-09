import React, { useState } from 'react';
import OnboardingShape from '../../shared/components/OnboardingShape';
import { Box, Button, useSteps } from '@chakra-ui/react';
import Nav from '../../shared/components/nav';
import UploadFrontFacingSelfie from './UploadSelfie';
import UploadSelfie from './UploadSelfie';

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
        <Box w={'105vw'} opacity={0.5} pos={'absolute'} top={'0'} left={'-5vw'} zIndex={-1}>
          <OnboardingShape />
        </Box>
        <UploadSelfie />
        
      </Box>
    </>
  );
};

export default index;
