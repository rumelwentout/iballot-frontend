import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const TimeBox = ({ time, unit }) => {
  return (
    <Box
      border={'1px'}
      display={'flex'}
      alignItems={'flex-end'}
      justifyContent={'center'}
      rounded={'12px'}
      p={'10px'}
      borderColor={'primary.50'}
    >
      <span className="countdown font-mono text-6xl">
        <span style={{ '--value': time }}></span>
      </span>
      {/* <Text>{unit}</Text> */}
    </Box>
  );
};
const Countdown = ({ end_time }) => {
  const [time, setTime] = useState(() => {
    const endTimeMs = new Date(end_time).getTime();
    console.log(endTimeMs);
    const currentTimeMs = Date.now();
    const timeRemainingMs = Math.max(endTimeMs - currentTimeMs, 0);
    return Math.round(timeRemainingMs / 1000);
  });

  useEffect(() => {
    if (time === 0) return;

    const intervalId = setInterval(() => {
      setTime((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time]);

  const days = Math.floor(time / 86400);
  const hours = Math.floor((time % 86400) / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  console.log(end_time);
  console.log(time);
  console.log(days, hours, minutes, seconds);

  const formatTime = (unit) =>
    unit === 0 ? '00' : unit.toString().padStart(2, '0');

  return (
    <Box>
      <Text fontSize="14px" fontWeight={'700'} textAlign={'center'}>
        Times remaining
      </Text>
      <Flex
        gap={'20px'}
        alignItems={'center'}
        justifyContent={'center'}
        mt={'10px'}
      >
        <TimeBox time={formatTime(days)} unit={'D'} />
        <TimeBox time={formatTime(hours)} unit={'H'} />
        <TimeBox time={formatTime(minutes)} unit={'M'} />
        <TimeBox time={formatTime(seconds)} unit={'S'} />
      </Flex>
    </Box>
  );
};

export default Countdown;
