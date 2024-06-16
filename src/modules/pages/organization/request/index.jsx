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
  Text
} from '@chakra-ui/react';
import axios from 'axios';
import { useAuthentication } from '../../../../hooks/useAuthentication';
import OrganizationRequestListItem from './OrganizationRequestListItem';

const index = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { userInfo } = useAuthentication();

  const [orgs, setOrgs] = useState([]);
  const getOrganizations = async () => {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND_URI}/organization`,
      {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`
        }
      }
    );
    setOrgs(data.data);
  };

  useEffect(() => {
    if (userInfo) getOrganizations();
  }, [userInfo]);
  const filteredOrganizations = orgs.filter((x) =>
    x.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [reqs, setReqs] = useState([]);
  const [org, setOrg] = useState('');
  const getRequests = async () => {
    const data = await axios.get(
      `${
        import.meta.env.VITE_BACKEND_URI
      }/organization/${org}/membership-requests`,
      {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`
        }
      }
    );
    setReqs(data.data);
  };

  useEffect(() => {
    if (org) getRequests();
  }, [org]);

  console.log(reqs);

  return (
    <MainLayout>
      <Flex flexDir={'column'} minH={'100svh'} pt={'80px'} pb={'120px'}>
        <Heading
          letterSpacing={-1}
          fontSize={'32px'}
          textAlign={'center'}
          mt={'50px'}
        >
          Organization Join Requests
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
          {filteredOrganizations.map((org) => (
            <option value={org.id}>{org.name}</option>
          ))}
        </Select>

        {/* <Grid templateColumns="repeat(1, 1fr)" gap={'20px'}> */}
        <Box className="mt-[50px]">
          <Grid
            templateColumns="repeat(5, 1fr)"
            // gap={'20px'}
            bg={'#F0F4F8'}
            py={'10px'}
            fontWeight={'semibold'}
            alignItems={'center'}
          >
            <Box></Box>
            <Text>Name</Text>
            <Text>Email</Text>
            <Text>Institution</Text>
            <Text>Action</Text>
          </Grid>
          {reqs?.map((org) => (
            <OrganizationRequestListItem name={org.name} />
          ))}
        </Box>
        {/* </Grid> */}
      </Flex>
    </MainLayout>
  );
};

export default index;
