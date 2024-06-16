import { Avatar, Box, Button, Grid, Text } from '@chakra-ui/react';
import React from 'react';
const image = '';
const OrganizationRequestListItem = () => {
  return (
    <Grid
      templateColumns="repeat(5, 1fr)"
      //   gap={'20px'}
      borderBottom={'1px'}
      borderColor={'#e7e7e7'}
      py={'30px'}
      alignItems={'center'}
    >
      <Box
        rounded={'full'}
        bg={'none'}
        display={'flex'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Avatar name={''} src={''} />
      </Box>
      <Text>Fahmida Ara</Text>
      <Text>fahmida@gmail.com</Text>
      <Text>University of Dhaka</Text>
      <Button colorScheme="primary" maxW={'100px'}>
        Approve
      </Button>
    </Grid>
  );
};

export default OrganizationRequestListItem;
