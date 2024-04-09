import { Box, Grid, Text } from '@chakra-ui/react';
import React from 'react';
import OrganizationVoteCard from './OrganizationVoteCard';

const OrganizationViewContent = () => {
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
      <Grid gridTemplateColumns={'repeat(3,1fr)'} gap={'20px'}>
        <OrganizationVoteCard />
        <OrganizationVoteCard />
        <OrganizationVoteCard />
        <OrganizationVoteCard />
      </Grid>

      <Text
        fontWeight={'700'}
        fontSize={'32px'}
        letterSpacing={-1}
        mt={'40px'}
        mb={'20px'}
      >
        Past Elections
      </Text>
      <Grid gridTemplateColumns={'repeat(3,1fr)'} gap={'20px'}>
        <OrganizationVoteCard variant='result'/>
        <OrganizationVoteCard variant='result'/>
        <OrganizationVoteCard variant='result'/>
        <OrganizationVoteCard variant='result'/>
      </Grid>
    </Box>
  );
};

export default OrganizationViewContent;
