import { Avatar, Box, Button, Grid, Text } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useAuthentication } from '../../../../hooks/useAuthentication';
import { toast } from 'sonner';

const OrganizationRequestListItem = ({
  name,
  email,
  institution,
  image,
  id,
  userId
}) => {
  const [btnText, setBtnText] = useState('Approve');
  const { userInfo } = useAuthentication();
  const mutation = useMutation({
    mutationFn: () => {
      const requestData = {
        organization_id: id,
        user_id: userId
      };
      console.log(requestData);

      return axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/organization/approve-membership`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`
          }
        }
      );
    }
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      setBtnText('Approved');
      toast.success('Request approved Successfully!');
    }
  }, [mutation.isSuccess]);
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
        <Avatar name={''} src={image} />
      </Box>
      <Text>{name}</Text>
      <Text>{email}</Text>
      <Text>{institution}</Text>
      <Button
        colorScheme="primary"
        maxW={'160px'}
        onClick={() => mutation.mutate()}
        isLoading={mutation.isLoading}
        loadingText="Approving"
      >
        {btnText}
      </Button>
    </Grid>
  );
};

export default OrganizationRequestListItem;
