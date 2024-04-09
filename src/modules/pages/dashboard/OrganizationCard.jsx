import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import Logo from '../../shared/components/Logo';
import LogoIcon from '../../shared/components/LogoIcon';
import { useNavigate } from 'react-router-dom';

const BlobGenerator = ({ img }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      width="107"
      height="129"
      viewBox="0 0 107 129"
      fill="none"
    >
      <path
        d="M106.795 74.6442C106.795 128.039 82.8894 128.039 53.4004 128.039C23.9114 128.039 0.00585938 123.335 0.00585938 74.6442C0.00585938 45.1552 23.8005 25.9963 68.2171 1.89789C91.843 -6.60738 106.795 17.0185 106.795 74.6442Z"
        fill="#D9D9D9"
      />
      <path
        d="M106.795 74.6442C106.795 128.039 82.8894 128.039 53.4004 128.039C23.9114 128.039 0.00585938 123.335 0.00585938 74.6442C0.00585938 45.1552 23.8005 25.9963 68.2171 1.89789C91.843 -6.60738 106.795 17.0185 106.795 74.6442Z"
        fill="url(#pattern0)"
      />
      <defs>
        <pattern
          id="pattern0"
          patternContentUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <use
            xlink:href="#image0_1_616"
            transform="matrix(0.00332496 0 0 0.00277778 -0.297991 0)"
          />
        </pattern>
        <image id="image0_1_616" width="480" height="360" src={img} />
      </defs>
    </svg>
  );
};
const OrganizationCard = () => {
  const navigate = useNavigate();
  return (
    <Flex
      //   shadow={'0px 0px 4px 0px rgba(0, 0, 0, 0.15)'}
      backgroundColor={'white'}
      p={'20px'}
      rounded={'md'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <Box>
        <Text fontWeight={'600'} fontSize={'20px'}>
          Csedu Alumni Association
        </Text>
        <Text fontWeight={'600'} fontSize={'12px'} my={'2px'}>
          General Member
        </Text>
        <Text fontWeight={'400'} fontSize={'12px'}>
          Member since september 2024
        </Text>
        <Button
          colorScheme="primary"
          size={'sm'}
          mt={'20px'}
          onClick={() => navigate('/organization/view')}
        >
          View Organization
        </Button>
      </Box>
      <Box w="50px">
        <LogoIcon />
      </Box>
    </Flex>
  );
};

export default OrganizationCard;
