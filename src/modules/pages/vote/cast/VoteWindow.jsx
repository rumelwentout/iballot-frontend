import { ArrowBackIcon, CheckCircleIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Skeleton,
  Spinner,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  Text,
  useSteps
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import WebCamComponent from '../../../shared/components/Webcam';
import { Form, Formik } from 'formik';
import Banner from './Banner';
import Position from './Position';
import { act } from 'react';
import axios from 'axios';
import { useAuthentication } from '../../../../hooks/useAuthentication';
import { useMutation } from 'react-query';
import { toast } from 'sonner';

const ImageUploader = () => {
  const [img, setImg] = useState('');

  const ImagePreview = () => {
    return <Box></Box>;
  };
  const UploadPlaceHolder = () => {
    return (
      <Box>
        <label
          htmlFor="selfie-image"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px'
          }}
        >
          <Box w={'100px'}>
            <UploadIcon />
          </Box>
        </label>
        <Text
          textAlign={'center'}
          fontWeight={'600'}
          textTransform={'capitalize'}
          fontSize={'14px'}
        >
          Click here to upload your selfie
        </Text>
        <Text textAlign={'center'} fontWeight={'500'} fontSize={'12px'}>
          Accepted file type- JPG, PNG
        </Text>
        <input
          hidden
          type="file"
          name="selfie-image"
          id="selfie-image"
          accept="image/png,image/jpg"
        />
      </Box>
    );
  };
  return (
    <Box
      h={'300px'}
      border={'1px'}
      borderStyle={'dashed'}
      rounded={'md'}
      my={'20px'}
      borderColor={'gray.400'}
    >
      {/* {img ? <ImagePreview /> : <UploadPlaceHolder />} */}
    </Box>
  );
};

const Verify = ({ setActiveStep }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setActiveStep(3);
    }, 1000);
  }, []);
  return (
    <Flex
      alignItems={'center'}
      justifyContent={'center'}
      w={'100%'}
      h={'400px'}
    >
      {loading ? (
        <Flex
          flexDirection="column"
          alignItems={'center'}
          justifyContent={'center'}
        >
          <Spinner></Spinner>
          <Text textAlign={'center'}>Verifying...</Text>
        </Flex>
      ) : (
        <Flex
          flexDirection="column"
          alignItems={'center'}
          justifyContent={'center'}
        >
          <CheckCircleIcon />
          <Text textAlign={'center'}>Verified</Text>
        </Flex>
      )}
    </Flex>
  );
};
const VoteWindow = () => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: 3
  });
  const navigate = useNavigate();

  const createInitialValues = (options) => {
    return options.reduce(
      (acc, option, index) => {
        const scoreKey = `score_${index + 1}`;
        acc[scoreKey] = 0;
        return acc;
      },
      {
        positions: [],
        position: '',
        selfie: ''
      }
    );
  };

  const radioOptions = [
    {
      title: 'President',
      caption: 'Asst. Professor Department of Computer Science & Engineering',
      value: 'president'
    },
    {
      title: 'Vice President',
      caption: 'Asst. Professor Department of Computer Science & Engineering',
      value: 'vice_president'
    },
    {
      title: 'Senior Manager',
      caption: 'Asst. Professor Department of Computer Science & Engineering',
      value: 'senior_manager'
    },
    {
      title: 'Senior Manager',
      caption: 'Asst. Professor Department of Computer Science & Engineering',
      value: 'senior_manager2'
    },
    {
      title: 'Senior Manager',
      caption: 'Asst. Professor Department of Computer Science & Engineering',
      value: 'senior_manager3'
    },
    {
      title: 'Senior Manager',
      caption: 'Asst. Professor Department of Computer Science & Engineering',
      value: 'senior_manager4'
    },
    {
      title: 'Senior Manager',
      caption: 'Asst. Professor Department of Computer Science & Engineering',
      value: 'senior_manager5'
    }
  ];

  const [election, setElection] = useState([]);

  const { id } = useParams();

  const { userInfo } = useAuthentication();
  const [loading, setLoading] = useState(true);
  const getElectionDetails = async () => {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND_URI}/elections/${id}`,
      {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`
        }
      }
    );
    setElection(data.data);
    setLoading(false);
  };

  useEffect(() => {
    if (id && userInfo) getElectionDetails();
  }, [id, userInfo]);

  console.log(election);
  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return <Banner end_time={election.end_time} loading={loading} />;
      case 1:
        return <WebCamComponent />;
      case 2:
        return <Verify setActiveStep={setActiveStep} />;
      case 3:
        return <Position id={election.id} type={election.election_type} />;
    }
  };

  const stages = [
    {
      stageHeader: election?.name,
      stageDescription: election.organization_name,
      buttonLabel: 'Vote Now'
    },
    {
      stageHeader: 'Verify your Identity',
      stageDescription:
        'Please put your face inside the circle to verify your identity.',
      buttonLabel: 'Verify Now'
    },
    {
      stageHeader: 'Verify your Identity',
      stageDescription:
        'Please put your face inside the circle to verify your identity.',
      buttonLabel: 'Verify Now'
    },
    {
      stageHeader: 'Caste Ballot',
      stageDescription:
        'Please select which which candidate you want to cast vote.',
      buttonLabel: 'Submit'
    }
    // {
    //   stageHeader: 'Submit your Ballot',
    //   stageDescription:
    //     'Confirm your vote for the chosen candidate. Please note, after submission, modifications to your vote will not be permitted.',
    //   buttonLabel: 'Submit'
    // }
  ];

  const mutation = useMutation({
    mutationFn: async (data) => {
      for (const position of data) {
        const res = await axios.post(
          `${import.meta.env.VITE_BACKEND_URI}/elections/vote`,
          {
            candidate_user_id: position,
            election_id: election.id
          },
          {
            headers: {
              Authorization: `Bearer ${userInfo?.token}`
            }
          }
        );
        console.log(res);
      }
    }
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success('Ballot Casted Successfully!');
    }
  }, [mutation.isSuccess]);
  return (
    <Box
      bg={'white'}
      w={'600px'}
      // shadow={'2xl'}
      rounded={'20px'}
      padding={'30px'}
      pos={'relative'}
    >
      {loading ? (
        <Skeleton
          w={'100%'}
          mb={'20px'}
          h="50px"
          rounded={'lg'}
          mx={'0 auto'}
        ></Skeleton>
      ) : (
        <Text textAlign={'center'} fontWeight={'700'} fontSize={'24px'}>
          {stages[activeStep]?.stageHeader}
        </Text>
      )}
      <IconButton
        onClick={() => navigate('/organization/view')}
        size={'sm'}
        pos={'absolute'}
        right={'20px'}
        top={'20px'}
        variant={'icon'}
        border={'1px'}
        color={'gray.600'}
        borderColor={'gray.200'}
        rounded={'full'}
        icon={<CloseIcon />}
      />
      {loading ? (
        <Skeleton
          w={'100%'}
          mb={'20px'}
          h="50px"
          rounded={'lg'}
          mx={'0 auto'}
        ></Skeleton>
      ) : (
        <Text
          textAlign={'center'}
          fontSize={'14px'}
          w={'70%'}
          margin={'0 auto'}
          mb={'20px'}
        >
          {stages[activeStep]?.stageDescription}
        </Text>
      )}
      <Formik
        initialValues={createInitialValues(radioOptions)}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          mutation.mutate(values.positions);
        }}
      >
        <Form>
          {userInfo && id && getStepContent()}
          <Flex
            justifyContent={activeStep === 3 ? 'space-around' : 'center'}
            mt={'20px'}
          >
            {activeStep === 0 && (
              <Button
                colorScheme="primary"
                w={'100px'}
                onClick={() => {
                  if (activeStep < 2) {
                    setActiveStep((prev) => prev + 1);
                  }
                }}
              >
                {stages[activeStep].buttonLabel}
              </Button>
            )}
            {activeStep === 1 && (
              <Button
                colorScheme="primary"
                w={'100px'}
                onClick={() => {
                  if (activeStep < 2) {
                    setActiveStep((prev) => prev + 1);
                  }
                }}
              >
                {stages[activeStep].buttonLabel}
              </Button>
            )}
            {activeStep === 3 && (
              <Button
                colorScheme="primary"
                w={'100px'}
                type={'submit'}
                onClick={() => {
                  if (activeStep < 2) {
                    setActiveStep((prev) => prev + 1);
                  }
                }}
                isLoading={mutation.isLoading}
              >
                {stages[activeStep].buttonLabel}
              </Button>
            )}
          </Flex>
        </Form>
      </Formik>
    </Box>
  );
};

export default VoteWindow;
