import { Box, Grid, Skeleton, Text } from '@chakra-ui/react';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const PoleContent = ({ result }) => {
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

      {/* {loading ? (
        <Grid templateColumns="repeat(3, 1fr)" gap={'20px'} mt={'20px'}>
          <Skeleton h={'160px'} rounded={'lg'}></Skeleton>
          <Skeleton h={'160px'} rounded={'lg'}></Skeleton>
          <Skeleton h={'160px'} rounded={'lg'}></Skeleton>
        </Grid>
      ) : (
        <Grid gridTemplateColumns={'repeat(3,1fr)'} gap={'20px'}>
          {elections
            ?.filter(
              (election) => new Date(election.end_time).getTime() > currentTime
            )
            ?.map((election) => (
              <OrganizationVoteCard
                name={election.name}
                end_time={election.end_time}
                institution={election.organization_name}
                id={election.id}
              />
            ))}
        </Grid>
      )} */}
    </Box>
  );
};

export default PoleContent;
