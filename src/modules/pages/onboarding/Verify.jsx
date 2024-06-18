import { CheckCircleIcon } from '@chakra-ui/icons';
import { Box, Flex, Spinner, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const Verify = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  return (
    <Flex
      alignItems={'center'}
      justifyContent={'center'}
      w={'100%'}
      h={'400px'}
    >
      {loading ? (
        <Flex
          flexDirection="column"
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Spinner></Spinner>
          <Text textAlign={'center'}>Verifying...</Text>
        </Flex>
      ) : (
        <Flex
          flexDirection="column"
          alignItems={'center'}
          justifyContent={'center'}
        >
          <CheckCircleIcon />
          <Text textAlign={'center'}>Verified</Text>
        </Flex>
      )}
    </Flex>
  );
};

export default Verify;
