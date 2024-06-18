import { Box, Flex, Grid } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Radio } from '../../../shared/components/Radio';
import { Form, Formik } from 'formik';
import Alert from '../../../shared/components/Alert';
import ScoreCard from '../../../shared/components/ScoreCard';
import { useAuthentication } from '../../../../hooks/useAuthentication';
import axios from 'axios';

const Position = ({ radioOptions, id, type }) => {
  //   console.log(createInitialValues(radioOptions));

  const { userInfo } = useAuthentication();
  const [candidates, setCandidates] = useState([]);
  const getCandidates = async () => {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND_URI}/elections/${id}/candidates`,
      {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`
        }
      }
    );
    setCandidates(data.data);
  };

  useEffect(() => {
    if (id && userInfo) getCandidates();
  }, [id, userInfo]);

  console.log(candidates);

  const candidatesOptions = candidates.map((x) => ({
    title: x.fullname,
    caption: x.institution,
    value: x.id,
    image: x.userImage
  }));

  const getVotingForm = (type) => {
    switch (type) {
      case 'Multiple':
        return (
          <Radio
            name="positions"
            multi={true}
            radioOptions={candidatesOptions}
          ></Radio>
        );
      case 'Single':
        return <Radio name="positon" radioOptions={candidatesOptions}></Radio>;

      case 'Score':
        return (
          <Grid templateColumns={'repeat(3,1fr)'} pt="20px" className="gap-2">
            {candidatesOptions?.map((x, key) => (
              <ScoreCard
                title={x.title}
                caption={x.caption}
                name={`score_${key + 1}`}
                image={x.image}
              />
            ))}
          </Grid>
        );
    }
  };
  return (
    <Box>
      {/* <Alert
        title="This is an approval voting"
        description="You can select multiple candidates to show your approval of them."
      /> */}
      {getVotingForm(type)}
    </Box>
  );
};

export default Position;
