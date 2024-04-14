import React, { useState } from 'react';
import MainLayout from '../../../layout/MainLayout';
import {
  Box,
  Flex,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text
} from '@chakra-ui/react';
import SearchIcon from '../../../shared/components/SearchIcon';
import OrganizationRequestCard from './OrganizationRequestCard';
import { orgsData } from './data';

const index = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredOrganizations = orgsData.filter((x) =>
    x.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          Are you already a part of an Organization?
        </Heading>
        <InputGroup
          size={'md'}
          position={'relative'}
          w={'70%'}
          //   mt={'40px'}
          h={'58px'}
          margin={'0 auto'}
          marginY={'30px'}
        >
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            rounded={'full'}
            bg={'white'}
            value={searchTerm}
            focusBorderColor="primary.500"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search organization for join request"
          />
        </InputGroup>
        <Grid templateColumns="repeat(3, 1fr)" gap={'20px'}>
          {filteredOrganizations.map((org) => (
            <OrganizationRequestCard name={org.name} />
          ))}
        </Grid>
      </Flex>
    </MainLayout>
  );
};

export default index;
