import { ArrowBackIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  IconButton,
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
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WebCamComponent from '../../../shared/components/Webcam';
import { Form, Formik } from 'formik';
import { act } from 'react';
import ElectionDetails from './ElectionDetails';
import Candidates from './Candidates';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useAuthentication } from '../../../../hooks/useAuthentication';
import { toast } from 'sonner';

const stages = [
  {
    stageHeader: 'Create Elections',
    stageDescription: 'Please provide the necessary election informations.',
    buttonLabel: 'Next:Select Candidates'
  },
  {
    stageHeader: 'Select Candidates',
    stageDescription: 'Please select candidates for this election.',
    buttonLabel: 'Create Election'
  }
  // {
  //   stageHeader: 'Submit your Ballot',
  //   stageDescription:
  //     'Confirm your vote for the chosen candidate. Please note, after submission, modifications to your vote will not be permitted.',
  //   buttonLabel: 'Submit'
  // }
];

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
const CreateElectionWindow = () => {
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

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return <ElectionDetails />;
      case 1:
        return <Candidates radioOptions={radioOptions} />;
    }
  };

  const { userInfo } = useAuthentication();

  const mutation = useMutation({
    mutationFn: (data) => {
      const requestData = {
        name: data.name,
        candidates: data.candidates,
        organization_id: data.organization.id,
        organization_name: data.organization.name,
        start_time: data.start_time,
        end_time: data.end_time,
        election_type: data.votingSystem.name
      };

      console.log(requestData);
      return axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/elections/create`,
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
      toast.success('Election Created Successfully!');
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
      <Text textAlign={'center'} fontWeight={'700'} fontSize={'24px'}>
        {stages[activeStep].stageHeader}
      </Text>
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
      <Text
        textAlign={'center'}
        fontSize={'14px'}
        w={'70%'}
        margin={'0 auto'}
        mb={'20px'}
      >
        {stages[activeStep].stageDescription}
      </Text>
      <Formik
        initialValues={{
          name: '',
          start_time: '',
          end_time: '',
          organization: '',
          votingSystem: 'Single Vote',
          candidates: []
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
          mutation.mutate(values);
        }}
      >
        <Form>
          {getStepContent()}
          <Flex
            justifyContent={activeStep === 1 ? 'space-between' : 'center'}
            mt={'20px'}
            gap={'20px'}
          >
            {activeStep === 1 && (
              <Button
                colorScheme="primary"
                variant={'outline'}
                min-w={'140px'}
                leftIcon={<ArrowBackIcon />}
                isDisabled={activeStep === 0 ? true : false}
                onClick={() =>
                  setActiveStep((prev) => (activeStep >= 1 ? prev - 1 : prev))
                }
              >
                Prev:Election Details
              </Button>
            )}
            <Button
              colorScheme="primary"
              min-w={'100px'}
              type={activeStep === 1 && 'submit'}
              onClick={() => {
                if (activeStep < 1) {
                  setActiveStep((prev) => prev + 1);
                }
              }}
            >
              {stages[activeStep].buttonLabel}
            </Button>
          </Flex>
        </Form>
      </Formik>
    </Box>
  );
};

export default CreateElectionWindow;
