import { Box, Skeleton } from '@chakra-ui/react';
import React from 'react';
import Countdown from './Countdown';

const Banner = ({ end_time, loading }) => {
  if (loading) return <Skeleton w={'100%'} h="100px" rounded={'lg'}></Skeleton>;
  return <Box>{end_time && <Countdown end_time={end_time} />}</Box>;
};

export default Banner;
