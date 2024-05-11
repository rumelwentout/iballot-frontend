import React from 'react';
import { Box } from '@chakra-ui/react';
import OnboardingShape from '../../../shared/components/OnboardingShape';
import Nav from '../../../shared/components/nav';
import VoteWindow from './VoteWindow';
import MainLayout from '../../../layout/MainLayout';

const index = () => {
  return (
    <MainLayout MainLayout>
      {/* <Nav /> */}
      <Box
        pos={'relative'}
        minH={'100svh'}
        // overflow={'hidden'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
        py={'150px'}
      >
        <VoteWindow />
      </Box>
    </MainLayout>
  );
};

export default index;
