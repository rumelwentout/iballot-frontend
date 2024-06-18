import { Box, Flex, Grid, Skeleton } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useField } from 'formik';
import { useAuthentication } from '../../../../hooks/useAuthentication';
import { Radio } from './Radio';
import ScoreCard from '../../../shared/components/ScoreCard';

const Candidates = ({ radioOptions, type }) => {
  const name = 'organization';
  const [field, meta, helpers] = useField({ name });
  const [candidateList, setCandidateList] = useState([]);

  const { userInfo } = useAuthentication();
  const [loading, setLoading] = useState(true);

  const getOrganizationMembers = async () => {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND_URI}/organization/${
        field.value.id
      }/members`,
      {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`
        }
      }
    );
    setCandidateList(data.data);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    if (userInfo) getOrganizationMembers();
  }, [field.value, userInfo]);

  const getVotingForm = (type) => {
    if (loading)
      return <Skeleton h={'180px'} w="180px" rounded={'12px'}></Skeleton>;

    return (
      <Radio
        name="candidates"
        multi={true}
        radioOptions={candidateList}
      ></Radio>
    );
  };
  return <Box>{getVotingForm(type)}</Box>;
};

export default Candidates;
