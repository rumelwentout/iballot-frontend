import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

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
const ElectionCard = ({ initialTime = 3500, title }) => {
  const [time, setTime] = useState(initialTime);

  useEffect(() => {
    if (time === 0) return;

    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const formatTime = (unit) => unit.toString().padStart(2, '0');
  return (
    <Flex
      backgroundColor={'white'}
      p={'20px'}
      rounded={'md'}
      justifyContent={'space-between'}
    >
      <Box>
        <Text fontWeight={'600'} fontSize={'20px'}>
          {title}
        </Text>
        <Text fontWeight={'600'} fontSize={'14px'} my={'2px'}>
          CSEDU
        </Text>
        <Flex alignItems={'center'} gap={'10px'}>
          <Text fontWeight={'600'} fontSize={'12px'} my={'2px'}>
            Ends in
          </Text>
          <Box fontWeight={'400'} fontSize={'12px'}>
            <span className="countdown font-mono font-bold text-[12px]">
              <span style={{ '--value': formatTime(hours) }}></span>:
              <span style={{ '--value': formatTime(minutes) }}></span>:
              <span style={{ '--value': formatTime(seconds) }}></span>
            </span>
          </Box>
        </Flex>
      </Box>
      <VotingIcon />
    </Flex>
  );
};

export default ElectionCard;
