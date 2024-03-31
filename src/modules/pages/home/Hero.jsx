import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import HeroLeft from './HeroLeft';
import HeroRight from './HeroRight';

const Hero = () => {
  return (
    <Flex minH={'100svh'} paddingTop={'100px'} position={'relative'} alignItems={'center'}>
      <HeroLeft />
      <HeroRight />
    </Flex>
  );
};

export default Hero;
