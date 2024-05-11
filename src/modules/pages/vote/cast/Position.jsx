import { Box, Flex, Grid } from '@chakra-ui/react';
import React from 'react';
import { Radio } from '../../../shared/components/Radio';
import { Form, Formik } from 'formik';
import Alert from '../../../shared/components/Alert';
import ScoreCard from '../../../shared/components/ScoreCard';

const Position = ({ radioOptions, type }) => {
  //   console.log(createInitialValues(radioOptions));
  const getVotingForm = (type) => {
    switch (type) {
      case 'APPROVAL':
        return (
          <Radio
            name="positions"
            multi={true}
            radioOptions={radioOptions}
          ></Radio>
        );
      case 'RANKING':
        return <Radio name="positon" radioOptions={radioOptions}></Radio>;

      case 'SCORE':
        return (
          <Grid templateColumns={'repeat(3,1fr)'} pt="20px" className="gap-2">
            {radioOptions.map((x, key) => (
              <ScoreCard
                title={x.title}
                caption={x.caption}
                name={`score_${key + 1}`}
              />
            ))}
          </Grid>
        );
    }
  };
  return (
    <Box>
      <Alert
        title="This is an approval voting"
        description="You can select multiple candidates to show your approval of them."
      />
      {getVotingForm(type)}
    </Box>
  );
};

export default Position;
