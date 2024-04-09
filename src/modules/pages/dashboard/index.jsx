import { Box, Button, Flex, Grid, Heading } from '@chakra-ui/react';
import React from 'react';
import MainLayout from '../../layout/MainLayout';
import ElectionCard from './ElectionCard';
import OrganizationCard from './OrganizationCard';
import VoteHistoryTable from './VoteHistoryTable';
import { useNavigate } from 'react-router-dom';

const index = () => {
  const navigate = useNavigate();
  return (
    <MainLayout>
      <Box pos={'relative'} minH={'100svh'} pt={'120px'} pb={'120px'}>
        <Heading letterSpacing={-1}>Ongoing Elections</Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={'20px'} mt={'20px'}>
          <ElectionCard />
          <ElectionCard />
          <ElectionCard />
        </Grid>

        <Flex
          mt={'40px'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Heading letterSpacing={-1}>Organizations</Heading>
          <Button
            colorScheme="primary"
            onClick={() => navigate('/organization/add')}
          >
            Add Organization
          </Button>
        </Flex>
        <Grid templateColumns="repeat(3, 1fr)" gap={'20px'} mt={'20px'}>
          <OrganizationCard />
          <OrganizationCard />
          <OrganizationCard />
          <OrganizationCard />
          <OrganizationCard />
        </Grid>

        <Heading letterSpacing={-1} mt={'40px'}>
          Your Past Votes
        </Heading>
        <VoteHistoryTable />
      </Box>
    </MainLayout>
  );
};

export default index;
