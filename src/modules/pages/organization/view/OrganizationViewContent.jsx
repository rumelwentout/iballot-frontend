import { Box, Grid, Skeleton, Text } from '@chakra-ui/react';
import OrganizationVoteCard from './OrganizationVoteCard';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useAuthentication } from '../../../../hooks/useAuthentication';

const OrganizationViewContent = ({ elections, loading }) => {
  const currentTime = new Date().getTime();

  return (
    <Box>
      <Text
        fontWeight={'700'}
        fontSize={'32px'}
        letterSpacing={-1}
        mt={'40px'}
        mb={'20px'}
      >
        Ongoing Elections
      </Text>

      {loading ? (
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
      )}

      <Text
        fontWeight={'700'}
        fontSize={'32px'}
        letterSpacing={-1}
        mt={'40px'}
        mb={'20px'}
      >
        Past Elections
      </Text>
      {loading ? (
        <Grid templateColumns="repeat(3, 1fr)" gap={'20px'} mt={'20px'}>
          <Skeleton h={'160px'} rounded={'lg'}></Skeleton>
          <Skeleton h={'160px'} rounded={'lg'}></Skeleton>
          <Skeleton h={'160px'} rounded={'lg'}></Skeleton>
        </Grid>
      ) : (
        <Grid gridTemplateColumns={'repeat(3,1fr)'} gap={'20px'}>
          {elections
            ?.filter(
              (election) => new Date(election.end_time).getTime() < currentTime
            )
            ?.map((election) => (
              <OrganizationVoteCard
                name={election.name}
                end_time={election.end_time}
                institution={election.organization_name}
                id={election.id}
                variant="result"
              />
            ))}
        </Grid>
      )}
    </Box>
  );
};

export default OrganizationViewContent;
