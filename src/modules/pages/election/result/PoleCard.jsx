import { Box, Flex, Image, Text } from '@chakra-ui/react';
import React from 'react';

const PoleCard = ({ name, votes, image, serial }) => {
  return (
    <Box
      bg="white"
      display={'flex'}
      justifyContent={'space-between'}
      alignItems={'center'}
      px="20px"
      py="20px"
      rounded={'lg'}
    >
      <Flex alignItems={'center'} gap={'50px'}>
        <Image
          boxSize="100px"
          rounded="lg"
          objectFit="cover"
          src={image}
          alt={name}
        />
        <Box>
          <Text fontWeight={'700'} fontSize={'24px'}>
            {name}
          </Text>
        </Box>
      </Flex>
      <Box
        bg={serial === 0 ? '#83CB16' : serial === 1 ? '#C0C0C0' : 'CD7F32'}
        w="100px"
        h="100px"
        display={'flex'}
        alignItems={'center'}
        rounded={'full'}
        justifyContent={'center'}
      >
        <Box
          fontWeight={'800'}
          fontSize={'64px'}
          textColor={'white'}
          fontStyle={'italic'}
        >
          {serial === 0 ? '1' : serial === 1 ? '2' : '3'}
        </Box>
      </Box>
    </Box>
  );
};

export default PoleCard;
