import {
  Box,
  Button,
  Flex,
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
import React, { useState } from 'react';
import UploadIcon from '../../shared/components/UploadIcon';
import { useNavigate } from 'react-router-dom';

const steps = [
  { title: 'Onboarding 01', description: 'Front Facing Selfie' },
  { title: 'Onboarding 02', description: 'Right Facing Selfie' },
  { title: 'Onboarding 03', description: 'Left Facing Selfie' }
];

const stages = [
  {
    stageHeader: 'Upload Front Facing Selfie',
    stageDescription:
      'We will use this to verify your identity in the future for your voting security.'
  },
  {
    stageHeader: 'Upload Right Facing Selfie',
    stageDescription:
      'We will use this to verify your identity in the future for your voting security.'
  },
  {
    stageHeader: 'Upload Left Facing Selfie',
    stageDescription:
      'We will use this to verify your identity in the future for your voting security.'
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
            <StepDescription>{step.description}</StepDescription>
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
      {img ? <ImagePreview /> : <UploadPlaceHolder />}
    </Box>
  );
};

const UploadSelfie = () => {
  // const [currentStg, setCurrentStg] = useState(0);
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: 3
  });
  const navigate = useNavigate();
  return (
    <Box
      bg={'white'}
      w={'600px'}
      // shadow={'2xl'}
      rounded={'20px'}
      padding={'30px'}
    >
      <Text textAlign={'center'} fontWeight={'700'} fontSize={'24px'}>
        {stages[activeStep].stageHeader}
      </Text>
      <Text
        textAlign={'center'}
        fontSize={'14px'}
        w={'70%'}
        margin={'0 auto'}
        mb={'20px'}
      >
        {stages[activeStep].stageDescription}
      </Text>
      <OnboardingStepper step={activeStep} />
      <ImageUploader />
      <Flex justifyContent={'space-between'} mt={'20px'}>
        <Button
          colorScheme="primary"
          variant={'outline'}
          w={'100px'}
          isDisabled={activeStep === 0 ? true : false}
          onClick={() =>
            setActiveStep((prev) => (activeStep >= 1 ? prev - 1 : prev))
          }
        >
          Prev
        </Button>
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

export default UploadSelfie;
