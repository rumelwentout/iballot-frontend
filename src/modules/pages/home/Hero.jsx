import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import HeroLeft from './HeroLeft';
import HeroRight from './HeroRight';

const Hero = () => {
  return (
    <Flex
      minH={'100svh'}
      className="hero-bg"
      paddingTop={'100px'}
      position={'relative'}
      alignItems={'center'}
    >
      <Flex m={'0 auto'} w={['90vw', '70vw', '80vw', '80vw', '80vw', '60vw']}>
        <HeroLeft />
        <HeroRight />
      </Flex>
    </Flex>
  );
};

export default Hero;
