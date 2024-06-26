import React, { useEffect, useState } from 'react';
import MainLayout from '../../../layout/MainLayout';
import { Box, Flex, Heading, Skeleton, Text } from '@chakra-ui/react';
import OrganizationViewContent from './OrganizationViewContent';
import { useParams } from 'react-router-dom';
import { useAuthentication } from '../../../../hooks/useAuthentication';
import axios from 'axios';

const BlueRect = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="232"
      height="200"
      viewBox="0 0 232 200"
      fill="none"
    >
      <path
        d="M-105.654 -133.145C-105.654 -158.56 -84.9378 -179.062 -59.5236 -179.062H185.221C210.636 -179.062 231.351 -158.56 231.351 -132.932V153.458C231.351 178.872 210.849 199.588 185.221 199.588H-59.5236C-84.9378 199.375 -105.654 178.659 -105.654 153.245V-133.145Z"
        fill="#3B81F5"
      />
    </svg>
  );
};
const GreenRect = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="351"
      height="153"
      viewBox="0 0 351 153"
      fill="none"
    >
      <path
        d="M0.702148 68.871C0.702148 30.9077 21.9927 0.537109 48.6058 0.537109H302.761C329.153 0.537109 350.665 30.9077 350.665 68.871V219.142C350.665 256.789 329.375 287.476 302.761 287.476H48.6058C22.2144 287.476 0.702148 257.105 0.702148 219.142V68.871Z"
        fill="#83CB16"
      />
    </svg>
  );
};

const PinkBlob = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="232"
      height="226"
      viewBox="0 0 232 226"
      fill="none"
    >
      <path
        d="M242.534 58.8515C242.534 26.7716 216.545 0.782715 184.465 0.782715C82.9464 0.782715 0.648438 83.0807 0.648438 184.6V201.926C0.648438 303.444 82.9464 385.742 184.465 385.742C216.545 385.742 242.534 359.754 242.534 327.674V58.8515Z"
        fill="#F33F5E"
      />
    </svg>
  );
};

const Header = ({ ongoing, title, members, loading }) => {
  return (
    <Flex
      alignItems={'center'}
      justifyContent={'center'}
      flexDirection={'column'}
      bg={'#F9CB15'}
      pos={'relative'}
      h={'400px'}
      // ml={['-10vw', '-30vw', '-20vw', '-20vw', '-20vw', '-40vw']}
      // w={['110vw', '130vw', '120vw', '120vw', '120vw', '140vw']}
      ml={['-10vw', '-10vw', '-10vw', '-10vw', '-10vw', '-10vw']}
      w={'100vw'}
    >
      <Box pos={'absolute'} left={0} top={0}>
        <BlueRect />
      </Box>
      <Box pos={'absolute'} left={0} bottom={0}>
        <GreenRect />
      </Box>
      <Box pos={'absolute'} right={0} bottom={0}>
        <PinkBlob />
      </Box>
      {loading ? (
        <Skeleton
          pos={'relative'}
          height={'80px]'}
          width={'200px'}
          zIndex={'999'}
        />
      ) : (
        <Heading letterSpacing={-1}>{title}</Heading>
      )}
      <Flex
        alignItems={'center'}
        justifyContent={'center'}
        border={'2px'}
        mt="20px"
        rounded={'full'}
        px={'20px'}
        py={'10px'}
        gap={'20px'}
      >
        <Flex>
          <Text>{ongoing} Ongoing Elections</Text>
        </Flex>
        <Flex>
          <Text>{members} Members</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};
const index = () => {
  const [elections, setElections] = useState([]);
  const { id } = useParams();
  const currentTime = new Date().getTime();

  const { userInfo } = useAuthentication();
  const [electionLoading, setElectionLoading] = useState(true);
  const getElections = async () => {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND_URI}/elections/by-organization/${id}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`
        }
      }
    );
    setElections(data.data);
    setElectionLoading(false);
  };

  useEffect(() => {
    if (id) getElections();
  }, [id]);

  const [loading, setLoading] = useState(true);
  const [org, setOrg] = useState({});

  const getOrganizationDetails = async () => {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND_URI}/organization/${id}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`
        }
      }
    );
    setOrg(data.data);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    if (userInfo) getOrganizationDetails();
  }, [id, userInfo]);

  console.log(org);
  return (
    <MainLayout>
      <Box minH={'100svh'} pt={'80px'} pb={'120px'}>
        <Header
          title={org.name}
          loading={loading}
          ongoing={
            elections?.filter(
              (election) => new Date(election.end_time).getTime() > currentTime
            ).length
          }
          members={org.member_ids?.length}
        />
        <OrganizationViewContent
          elections={elections}
          loading={electionLoading}
        />
      </Box>
    </MainLayout>
  );
};

export default index;
