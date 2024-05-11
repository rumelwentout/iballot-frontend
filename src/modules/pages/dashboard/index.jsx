import { Box, Button, Flex, Grid, Heading } from '@chakra-ui/react';
import React from 'react';
import MainLayout from '../../layout/MainLayout';
import ElectionCard from './ElectionCard';
import OrganizationCard from './OrganizationCard';
import VoteHistoryTable from './VoteHistoryTable';
import { useNavigate } from 'react-router-dom';

import AWS from 'aws-sdk';

AWS.config.update({
  region: 'us-east-1',
  accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_SECRET_ACCESS_KEY
});

const index = () => {
  const navigate = useNavigate();

  const rekognition = new AWS.Rekognition();

  const params = {
    SourceImage: {
      S3Object: {
        Bucket: 'iballot',
        Name: 'BWDP.png'
      }
    },
    TargetImage: {
      S3Object: {
        Bucket: 'iballot',
        Name: 'Shahriar-Rumel.png'
      }
    },
    SimilarityThreshold: 90
  };
  const handleMatchFaces = () => {
    rekognition.compareFaces(params, (err, response) => {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(response);
      }
    });
  };
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
        <Button onClick={handleMatchFaces}>Check Match Score</Button>
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
