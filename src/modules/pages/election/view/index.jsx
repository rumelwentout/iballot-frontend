import React, { useEffect, useState } from 'react';
import MainLayout from '../../../layout/MainLayout';
import {
  Box,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Skeleton,
  Text
} from '@chakra-ui/react';
import axios from 'axios';
import { useAuthentication } from '../../../../hooks/useAuthentication';
import ElectionCard from './ElectionCard';
import Empty from '../../../shared/components/Empty';

const index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { userInfo } = useAuthentication();

  const [orgsLoading, setOrgsLoading] = useState(true);

  const [orgs, setOrgs] = useState([]);
  const getOrganizations = async () => {
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
  };

  console.log(orgs);

  useEffect(() => {
    if (userInfo) getOrganizations();
  }, [userInfo]);

  //   const filteredOrganizations = orgs.filter((x) =>
  //     x.name.toLowerCase().includes(searchTerm.toLowerCase())
  //   );

  const [elections, setElections] = useState([]);
  const [org, setOrg] = useState('');
  const [loading, setLoading] = useState(true);
  const getElections = async () => {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND_URI}/elections/by-organization/${org}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`
        }
      }
    );
    setElections(data.data);
    setLoading(false);
  };

  useEffect(() => {
    if (org) getElections();
    else {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [org]);

  console.log(elections);
  if (loading)
    return (
      <MainLayout>
        <Flex
          flexDir={'column'}
          alignItems={'center'}
          justifyContent={'center'}
          minH={'100svh'}
          pt={'180px'}
          pb={'120px'}
        >
          <Skeleton rounded="lg" h={'200px'} w={'600px'}></Skeleton>
        </Flex>
      </MainLayout>
    );

  return (
    <MainLayout>
      <Flex flexDir={'column'} minH={'100svh'} pt={'80px'} pb={'120px'}>
        <Heading
          letterSpacing={-1}
          fontSize={'32px'}
          textAlign={'center'}
          mt={'50px'}
        >
          Ongoing Elections
        </Heading>
        <Select
          colorScheme="primary"
          margin={'0 auto'}
          rounded={'28px'}
          maxWidth="600px"
          marginTop={'40px'}
          onChange={(e) => setOrg(e.target.value)}
        >
          <option>Select Organization</option>
          {orgs.map((org) => (
            <option value={org.id}>{org.name}</option>
          ))}
        </Select>

        {/* <Grid templateColumns="repeat(1, 1fr)" gap={'20px'}> */}
        {loading ? (
          <Grid
            templateColumns="repeat(3, 1fr)"
            gap={'20px'}
            //   bg={'#F0F4F8'}
            py={'10px'}
            fontWeight={'semibold'}
            alignItems={'center'}
            mt={'50px'}
          >
            <Skeleton h={'160px'} rounded={'lg'}></Skeleton>
            <Skeleton h={'160px'} rounded={'lg'}></Skeleton>
            <Skeleton h={'160px'} rounded={'lg'}></Skeleton>
            <Skeleton h={'160px'} rounded={'lg'}></Skeleton>
          </Grid>
        ) : elections.length > 0 ? (
          <Grid
            templateColumns="repeat(3, 1fr)"
            gap={'20px'}
            //   bg={'#F0F4F8'}
            py={'10px'}
            fontWeight={'semibold'}
            alignItems={'center'}
            mt={'50px'}
          >
            {elections?.map((election) => (
              <ElectionCard
                name={election.name}
                end_time={election.end_time}
                institution={election.organization_name}
                id={election.id}
              />
            ))}
          </Grid>
        ) : (
          <Empty
            title="No elections found!"
            subtitle="When your organization creates an election it will be able to see them here."
            //   action="/organization/add"
            //   actionTitle="Add Organization Now"
          />
        )}

        {/* </Grid> */}
      </Flex>
    </MainLayout>
  );
};

export default index;
