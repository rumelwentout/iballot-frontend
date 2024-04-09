import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';

const HeroLeft = () => {
  return (
    <Flex
      h={'100%'}
      flexDirection="column"
      justifyContent={'center'}
      alignItems={'start'}
      w={'60%'}
    >
      <Heading
        as={'h1'}
        w={'85%'}
        fontSize={'96px'}
        letterSpacing={-3}
        fontWeight={'800'}
      >
        iballot
      </Heading>
      <Heading as={'h3'} w={'60%'} mt={-2} fontSize={'20px'} fontWeight={'600'}>
        Seamlessly Exercise Your Electoral Rights Regardless of Your Location
      </Heading>
      <Text w={'60%'} marginTop={'20px'} fontWeight={'500'} letterSpacing={-0.5}>
        Register and verify your account on our user-friendly platform to cast
        your vote effortlessly, from anywhere. Secure, quick, and designed to
        uphold the democratic process.
      </Text>
      <Button colorScheme="primary" marginTop={'40px'}>
        Sign Up
      </Button>
    </Flex>
  );
};

export default HeroLeft;
