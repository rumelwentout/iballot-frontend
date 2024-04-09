import React from 'react';
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

const index = () => {
  return (
    <MainLayout>
      <Flex
        flexDir={'column'}
        minH={'100svh'}
        pt={'80px'}
        pb={'120px'}
      >
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
            focusBorderColor='primary.500'
            placeholder="Search organization for join request"
          />
        </InputGroup>
        <Grid templateColumns="repeat(3, 1fr)" gap={'20px'}>
          <OrganizationRequestCard />
          <OrganizationRequestCard />
          <OrganizationRequestCard />
          <OrganizationRequestCard />
        </Grid>
      </Flex>
    </MainLayout>
  );
};

export default index;
