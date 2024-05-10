import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React, { useCallback, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { toast } from 'sonner';
import Reload from '../../pages/onboarding/Reload';
import { useField } from 'formik';

const FacePlaceholder = () => {
  return (
    <Flex
      pos={'absolute'}
      color={'white'}
      top={'20px'}
      flexDirection={'column'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Text textAlign={'center'} fontSize={'10px'} textShadow={'lg'}>
        Put your face inside the oval and capture
      </Text>

      <svg
        width="200px"
        height="300px"
        viewBox="0 0 257 305"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginTop: '-10px' }}
      >
        <path
          d="M254 152.5C254 235.568 197.351 302 128.5 302C59.6491 302 3 235.568 3 152.5C3 69.4315 59.6491 3 128.5 3C197.351 3 254 69.4315 254 152.5Z"
          stroke="white"
          stroke-width="3"
        />
      </svg>
    </Flex>
  );
};
const Camera = () => {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 155 117"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M101.719 62.9688C101.719 69.392 99.1671 75.5521 94.6252 80.094C90.0833 84.6359 83.9232 87.1875 77.5 87.1875C71.0768 87.1875 64.9167 84.6359 60.3748 80.094C55.8329 75.5521 53.2813 69.392 53.2812 62.9688C53.2813 56.5455 55.8329 50.3854 60.3748 45.8435C64.9167 41.3016 71.0768 38.75 77.5 38.75C83.9232 38.75 90.0833 41.3016 94.6252 45.8435C99.1671 50.3854 101.719 56.5455 101.719 62.9688Z"
        fill="white"
      />
      <path
        d="M19.375 19.375C14.2364 19.375 9.30832 21.4163 5.67481 25.0498C2.04129 28.6833 0 33.6114 0 38.75L0 96.875C0 102.014 2.04129 106.942 5.67481 110.575C9.30832 114.209 14.2364 116.25 19.375 116.25H135.625C140.764 116.25 145.692 114.209 149.325 110.575C152.959 106.942 155 102.014 155 96.875V38.75C155 33.6114 152.959 28.6833 149.325 25.0498C145.692 21.4163 140.764 19.375 135.625 19.375H124.271C119.133 19.3739 114.206 17.3319 110.573 13.6981L102.552 5.67687C98.9192 2.04311 93.9919 0.00109735 88.8537 0H66.1463C61.0081 0.00109735 56.0808 2.04311 52.4481 5.67687L44.4269 13.6981C40.7942 17.3319 35.8669 19.3739 30.7287 19.375H19.375ZM24.2188 38.75C22.9341 38.75 21.7021 38.2397 20.7937 37.3313C19.8853 36.4229 19.375 35.1909 19.375 33.9062C19.375 32.6216 19.8853 31.3896 20.7937 30.4812C21.7021 29.5728 22.9341 29.0625 24.2188 29.0625C25.5034 29.0625 26.7354 29.5728 27.6438 30.4812C28.5522 31.3896 29.0625 32.6216 29.0625 33.9062C29.0625 35.1909 28.5522 36.4229 27.6438 37.3313C26.7354 38.2397 25.5034 38.75 24.2188 38.75ZM111.406 62.9688C111.406 71.9612 107.834 80.5854 101.475 86.9441C95.1167 93.3027 86.4925 96.875 77.5 96.875C68.5075 96.875 59.8833 93.3027 53.5247 86.9441C47.166 80.5854 43.5938 71.9612 43.5938 62.9688C43.5938 53.9763 47.166 45.3521 53.5247 38.9934C59.8833 32.6348 68.5075 29.0625 77.5 29.0625C86.4925 29.0625 95.1167 32.6348 101.475 38.9934C107.834 45.3521 111.406 53.9763 111.406 62.9688Z"
        fill="white"
      />
    </svg>
  );
};
const WebCamComponent = ({ name = 'selfie' }) => {
  const webcamRef = useRef(null);
  const [field, meta, helpers] = useField({ name });

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    toast.success('Captured');

    helpers.setValue(imageSrc);
  }, [webcamRef]);
  const clearImage = () => {
    helpers.setValue(null);
  };

  return (
    <Box
      pos="relative"
      h={'400px'}
      bg={'primary.500'}
      my="20px"
      display={'flex'}
      justifyContent={'center'}
    >
      {field.value ? (
        <Box
          style={{ backgroundImage: `url(${field.value})` }}
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
      ) : (
        <>
          <Webcam height={600} width={560} ref={webcamRef} />
          <FacePlaceholder />
          <Button
            pos={'absolute'}
            colorScheme="primary"
            bottom={'40px'}
            fontSize={'20px'}
            onClick={capture}
            size={'sm'}
          >
            <Camera />
          </Button>
        </>
      )}
    </Box>
  );
};

export default WebCamComponent;
