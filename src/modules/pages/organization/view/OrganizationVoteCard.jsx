import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import LogoIcon from '../../../shared/components/LogoIcon';
import { AddIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const OrganizationVoteCard = ({ variant }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
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
          variant={variant === 'result' ? 'outline' : 'solid'}
          size={'sm'}
          rounded={'full'}
          rightIcon={<ArrowForwardIcon />}
          onClick={()=>navigate('/vote/cast/:id')}
          loadingText="Preparing"
          isLoading={loading}
        >
          {variant === 'result' ? 'View Result' : 'Cast Vote'}
        </Button>
      </Flex>
      <Box mt={'20px'}>
        <Text fontWeight={'600'} fontSize={'20px'}>
          Vote for presidential candidate
        </Text>
        <Flex alignItems={'center'} gap={'10px'}>
          <Text fontWeight={'500'} fontSize={'12px'} my={'2px'}>
            Csedu Alumni Association
          </Text>
          <Box w={'6px'} h={'6px'} bg={'gray.300'} rounded={'full'}></Box>
          <Text fontWeight={'500'} fontSize={'12px'}>
            Ends in 05:05:09
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default OrganizationVoteCard;
