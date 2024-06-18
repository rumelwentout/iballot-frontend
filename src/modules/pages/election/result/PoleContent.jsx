import { Box, Grid, Skeleton, Text } from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import PoleCard from './PoleCard';

const PoleContent = ({ result, loading }) => {
  const currentTime = new Date().getTime();
  console.log(result);
  return (
    <Box>
      <Text
        fontWeight={'700'}
        fontSize={'32px'}
        letterSpacing={-1}
        mt={'40px'}
        mb={'20px'}
      >
        Election Result
      </Text>

      {loading ? (
        <Grid templateColumns="repeat(3, 1fr)" gap={'20px'} mt={'20px'}>
          <Skeleton h={'160px'} rounded={'lg'}></Skeleton>
          <Skeleton h={'160px'} rounded={'lg'}></Skeleton>
          <Skeleton h={'160px'} rounded={'lg'}></Skeleton>
        </Grid>
      ) : (
        <Grid gridTemplateColumns={'repeat(1,1fr)'} gap={'20px'}>
          {result?.candidates?.map((election, index) => (
            <PoleCard
              name={election.fullname}
              votes={election.votes}
              image={election.userImage}
              key={index}
              serial={index}
            />
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default PoleContent;
