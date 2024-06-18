import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import LogoIcon from '../../../shared/components/LogoIcon';
import { AddIcon, CheckCircleIcon } from '@chakra-ui/icons';
import { useAuthentication } from '../../../../hooks/useAuthentication';
import { useMutation } from 'react-query';
import axios from 'axios';
import { toast } from 'sonner';

const OrganizationRequestCard = ({ id, name }) => {
  // const [loading, setLoading] = useState(false);

  const { userInfo } = useAuthentication();
  const mutation = useMutation({
    mutationFn: () => {
      const requestData = {
        organization_id: id
      };

      return axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/organization/request-membership`,
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
      toast.success('Request sent Successfully!');
    }
  }, [mutation.isSuccess]);
  return (
    <Flex
      //   shadow={'0px 0px 4px 0px rgba(0, 0, 0, 0.15)'}
      bg={'white'}
      p={'20px'}
      rounded={'md'}
      flexDirection={'column'}
      justifyContent={'space-between'}
    >
      <Flex justifyContent={'space-between'}>
        <Box w={'60px'}>
          <LogoIcon />
        </Box>
        <Button
          colorScheme="primary"
          variant={'outline'}
          size={'sm'}
          rounded={'full'}
          leftIcon={mutation.isSuccess ? <CheckCircleIcon /> : <AddIcon />}
          onClick={() => mutation.mutate()}
          loadingText="Requesting to join"
          isLoading={mutation.isLoading}
        >
          {mutation.isSuccess ? 'Request Sent' : 'Add organization'}
        </Button>
      </Flex>
      <Box mt={'20px'}>
        <Text fontWeight={'600'} fontSize={'20px'}>
          {name}
        </Text>
        {/* <Flex alignItems={'center'} gap={'10px'}>
          <Text fontWeight={'500'} fontSize={'12px'} my={'2px'}>
            Vote for presidential candidate
          </Text>
          <Box w={'6px'} h={'6px'} bg={'gray.300'} rounded={'full'}></Box>
          <Text fontWeight={'500'} fontSize={'12px'}>
            Ends in 05:05:09
          </Text>
        </Flex> */}
      </Box>
    </Flex>
  );
};

export default OrganizationRequestCard;
