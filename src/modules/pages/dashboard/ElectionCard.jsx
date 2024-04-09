import { Box, Flex, Text } from '@chakra-ui/react';
import React from 'react';

const VotingIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="56"
      height="58"
      viewBox="0 0 56 58"
      fill="none"
    >
      <rect
        x="2.5542"
        y="21.4185"
        width="39.6301"
        height="9.5651"
        rx="4.78255"
        transform="rotate(-31.4248 2.5542 21.4185)"
        fill="#83CB16"
      />
      <rect
        x="10.6494"
        y="49.8107"
        width="39.6301"
        height="9.5651"
        rx="4.78255"
        transform="rotate(-31.4248 10.6494 49.8107)"
        fill="#83CB16"
      />
      <rect
        x="16.5571"
        y="34.8602"
        width="39.6301"
        height="9.5651"
        rx="4.78255"
        transform="rotate(-31.4248 16.5571 34.8602)"
        fill="#85B6FF"
      />
      <rect
        x="0.496338"
        y="33.8254"
        width="38.4673"
        height="9.5651"
        rx="4.78255"
        transform="rotate(-31.4248 0.496338 33.8254)"
        fill="#DA2777"
      />
      <rect
        x="24.5874"
        y="41.1385"
        width="30.7029"
        height="9.5651"
        rx="4.78255"
        transform="rotate(-31.4248 24.5874 41.1385)"
        fill="#DA2777"
      />
      <rect
        x="15.6365"
        y="24.5427"
        width="39.6301"
        height="9.5651"
        rx="4.78255"
        transform="rotate(-31.4248 15.6365 24.5427)"
        fill="#000000"
      />
      <rect
        x="1.22119"
        y="44.4265"
        width="39.6301"
        height="9.5651"
        rx="4.78255"
        transform="rotate(-31.4248 1.22119 44.4265)"
        fill="#000000"
      />
    </svg>
  );
};
const ElectionCard = () => {
  return (
    <Flex backgroundColor={'white'} p={'20px'} rounded={'md'} justifyContent={'space-between'}>
      <Box>
        <Text fontWeight={'600'} fontSize={'20px'}>Csedu Alumni Association</Text>
        <Text fontWeight={'600'} fontSize={'12px'} my={'2px'}>
          Vote for presidential candidate
        </Text>
        <Text fontWeight={'400'} fontSize={'12px'}>
          Ends in 05:05:09
        </Text>
      </Box>
      <VotingIcon />
    </Flex>
  );
};

export default ElectionCard;
