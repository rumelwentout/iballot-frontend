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
import WebCamComponent from './Webcam';
import { Form, Formik, useField } from 'formik';
import Reload from './Reload';

const steps = [
  { title: 'Upload Photo ID', description: 'Front Facing Selfie' },
  { title: 'Take Selfie', description: 'Right Facing Selfie' },
  { title: 'Get Verified', description: 'Left Facing Selfie' }
];

const stages = [
  {
    stageHeader: 'Upload Your Photo ID',
    stageDescription:
      'We will use this to verify your identity in the future for your voting security.'
  },
  {
    stageHeader: 'Take a Front Facing Selfie',
    stageDescription:
      'We will use this to match your identity with the provided photo ID.'
  },
  {
    stageHeader: 'Submit for Verification',
    stageDescription:
      'We will cross check the documents and verify your account.'
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

const ImageUploader = ({
  title = 'Click here to upload your image',
  acceptedType = 'Accepted file type- JPG, PNG',
  name = 'photoID'
}) => {
  // const [img, setImg] = useState('');
  const [field, meta, helpers] = useField({ name });

  const ImagePreview = () => {
    const clearImage = () => {
      helpers.setValue('');
    };
    return (
      <Box
        backgroundImage={`url(${URL.createObjectURL(field.value)})`}
        h={'100%'}
        w="100%"
        backgroundPosition={'center'}
        bgSize={'cover'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'end'}
        padding={'20px 0px'}
      >
        <Box cursor={'pointer'} onClick={clearImage}>
          <Reload />
        </Box>
      </Box>
    );
  };
  const uploadhandler = (e) => {
    e.preventDefault();
    helpers.setValue(e.target.files[0]);
    // setImg(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files[0]);
  };
  console.log(field.value);
  const UploadPlaceHolder = () => {
    return (
      <Box>
        <label
          htmlFor="photoID"
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
          {title}
        </Text>
        <Text textAlign={'center'} fontWeight={'500'} fontSize={'12px'}>
          {acceptedType}
        </Text>
        <input
          hidden
          type="file"
          name="photoID"
          id="photoID"
          onChange={uploadhandler}
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
      {field.value ? <ImagePreview /> : <UploadPlaceHolder />}
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

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return <ImageUploader />;
      case 1:
        return <WebCamComponent />;
      case 2:
        return <ImageUploader />;
    }
  };
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
      <Formik
        initialValues={{ photoID: '', selfie: '' }}
        onSubmit={(values, { setSubmitting }) => {
          // mutation.mutate({
          //   fullname: values.fullName,
          //   email: values.email,
          //   password: values.password,
          //   institution: values.institution
          // });
        }}
      >
        {({ values }) => {
          const getNextBtnState = () => {
            if (values?.selfie && activeStep == 1) return false;
            if (values?.photoID?.name && activeStep == 0) return false;
            return true;
          };
          return (
            <Form>
              {getStepContent()}
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
                  isDisabled={getNextBtnState()}
                >
                  {activeStep === 2 ? 'Finish' : 'Next'}
                </Button>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
};

export default UploadSelfie;
