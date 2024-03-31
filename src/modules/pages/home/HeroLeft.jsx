import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const HeroLeft = () => {
  return (
    <Flex h={'100%'} flexDirection="column" justifyContent={'center'} alignItems={'start'}>
      <Heading as={'h1'} w={'50%'}>Quickly Cast Vote From Anywhere</Heading>
      <Text w={'70%'} marginTop={'20px'}>
        Create a free account and cast your vote by verifying your identity with
        facial recognition.
      </Text>
      <Button colorScheme='primary' marginTop={'100px'}>Get Started</Button>
    </Flex>
  );
};

export default HeroLeft;
