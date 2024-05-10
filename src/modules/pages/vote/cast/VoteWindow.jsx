import { CloseIcon } from '@chakra-ui/icons';
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
import React from 'react';
import { useNavigate } from 'react-router-dom';
import WebCamComponent from '../../../shared/components/Webcam';
import { Form, Formik } from 'formik';

const steps = [
  { title: 'Verify Identity', description: 'Put the camera on your face' },
  {
    title: 'Choose Candidate',
    description: 'Select the candidate(s) of your choice'
  },
  { title: 'Cast Vote', description: 'Submit the vote' }
];

const stages = [
  {
    stageHeader: 'Identity Verification Required',
    stageDescription:
      'Please position your face within the frame to facilitate your identity verification process.'
  },
  {
    stageHeader: 'Candidate Selection',
    stageDescription:
      'Carefully select your preferred candidates for each designated position.'
  },
  {
    stageHeader: 'Finalize Your Vote',
    stageDescription:
      'Confirm your vote for the chosen candidate. Please note, after submission, modifications to your vote will not be permitted.'
  }
];

// const getOnboardingStage = (stage) => {
//   switch (stage) {
//     case stages.ON_BOARDING_FF_SELFIE:
//       return <FrontFacingSelfie />;
//     case stages.ON_BOARDING_RF_SELFIE:
//       return <RightFacingSelfie />;
//     case stages.ON_BOARDING_LF_SELFIE:
//       return <LeftFacingSelfie />;
//   }
// };

const OnboardingStepper = ({ step }) => {
  return (
    <Stepper index={step} colorScheme="primary" size={'sm'}>
      {steps.map((step, index) => (
        <Step key={index}>
          <StepIndicator>
            <StepStatus
              complete={<StepIcon />}
              incomplete={<StepNumber />}
              active={<StepNumber />}
            />
          </StepIndicator>

          <Box flexShrink="0">
            <StepTitle>{step.title}</StepTitle>
            {/* <StepDescription>{step.description}</StepDescription> */}
          </Box>

          <StepSeparator />
        </Step>
      ))}
    </Stepper>
  );
};

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
const VoteWindow = () => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: 3
  });
  const navigate = useNavigate();

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return <WebCamComponent />;
      case 1:
        return <WebCamComponent />;
    }
  };
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
        initialValues={{ photoID: '', selfie: '' }}
        onSubmit={(values, { setSubmitting }) => {}}
      >
        <Form>{getStepContent()}</Form>
      </Formik>
      <Flex justifyContent={'center'} mt={'20px'}>
        <Button
          colorScheme="primary"
          w={'100px'}
          onClick={() => {
            if (activeStep < 2) {
              setActiveStep((prev) => prev + 1);
            } else {
              navigate('/dashboard');
            }
          }}
        >
          {activeStep === 2 ? 'Finish' : 'Next'}
        </Button>
      </Flex>
    </Box>
  );
};

export default VoteWindow;
