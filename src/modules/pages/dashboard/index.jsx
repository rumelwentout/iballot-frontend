import { Box, Button, Flex, Grid, Heading, Skeleton } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import MainLayout from '../../layout/MainLayout';
import ElectionCard from './ElectionCard';
import OrganizationCard from './OrganizationCard';
import VoteHistoryTable from './VoteHistoryTable';
import { useNavigate } from 'react-router-dom';

import AWS from 'aws-sdk';
import axios from 'axios';
import { useAuthentication } from '../../../hooks/useAuthentication';
import { toast } from 'sonner';
import Empty from '../../shared/components/Empty';

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

  const { userInfo } = useAuthentication();

  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const getOrganizations = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/organization/${
          userInfo.role === 'admin' ? 'getbyuser' : 'getbymember'
        }`,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`
          }
        }
      );
      setOrgs(data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      // toast.error("Couldn't fetch any organizations,try adding one first!");
    }
  };

  useEffect(() => {
    if (userInfo) getOrganizations();
  }, [userInfo]);

  console.log(orgs);
  return (
    <MainLayout>
      <Box pos={'relative'} minH={'100svh'} pt={'120px'} pb={'120px'}>
        <Heading letterSpacing={-1}>Ongoing Elections</Heading>
        <Grid templateColumns="repeat(3, 1fr)" gap={'20px'} mt={'20px'}>
          <ElectionCard title="President Election" />
          <ElectionCard title="Executive Election 2024" />
          <ElectionCard title="Vice president Election 2024" />
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
        {/* <Button onClick={handleMatchFaces}>Check Match Score</Button> */}
        {loading ? (
          <Grid templateColumns="repeat(3, 1fr)" gap={'20px'} mt={'20px'}>
            <Skeleton h={'160px'} rounded={'lg'}></Skeleton>
            <Skeleton h={'160px'} rounded={'lg'}></Skeleton>
            <Skeleton h={'160px'} rounded={'lg'}></Skeleton>
          </Grid>
        ) : orgs.length > 0 ? (
          <Grid templateColumns="repeat(3, 1fr)" gap={'20px'} mt={'20px'}>
            {orgs.map((org) => (
              <OrganizationCard org={org} />
            ))}
          </Grid>
        ) : (
          <Empty
            title="No organization found!"
            subtitle="You are not in any Organization. xAdd your organization first to view them here."
            action="/organization/add"
            actionTitle="Add Organization Now"
          />
        )}

        {/* <Heading letterSpacing={-1} mt={'40px'}>
          Your Past Votes
        </Heading>
        <VoteHistoryTable /> */}
      </Box>
    </MainLayout>
  );
};

export default index;
