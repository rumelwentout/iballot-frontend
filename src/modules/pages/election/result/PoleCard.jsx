import { Box, Text } from '@chakra-ui/react';
import React from 'react';

const PoleCard = () => {
  return (
    <Box
      bg="white"
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      px="40px"
      py="40px"
    >
      <Box>
        <img src="" width={'100px'} height={'100px'} />
      </Box>
      <Box>
        <Text>Candidate Name</Text>
        <Text>Candidate org</Text>
        <Text>Candidate org</Text>
      </Box>
    </Box>
  );
};

export default PoleCard;
