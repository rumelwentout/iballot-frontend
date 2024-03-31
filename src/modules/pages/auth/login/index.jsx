import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import FormInput from '../../../shared/components/FormInput';
import LogoIcon from '../../../shared/components/LogoIcon';
import { Link } from 'react-router-dom';
import MainLayout from '../../../layout/MainLayout';

const initialValues = {
  name: '',
  email: ''
};

const validationSchema = {};

const index = () => {
  return (
    <MainLayout>
      <Box
        minH={'100svh'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box w={'100px'}>
          <LogoIcon />
        </Box>
        <Box
          w={'450px'}
          bg={'white'}
          // shadow={'2xl'}
          px={'20px'}
          py={'20px'}
          rounded={'12px'}
        >
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                // props.handleSubmit(values);
                setSubmitting(false);
              }, 400);
            }}
          >
            <Form>
              <Heading as={'h3'} textAlign={'center'} mb={'10px'}>
                Sign in to your account
              </Heading>
              <Text textAlign={'center'} mt={'10px'} mb={'30px'}>
                Don't have an account?{' '}
                <Link to={'/auth/register'}>
                  <Button variant={'link'} colorScheme="primary">
                    Sign up for free
                  </Button>
                </Link>
              </Text>
              <FormInput
                label="Name"
                name="name"
                type={'text'}
                placeholder={'Enter your name'}
              />
              <FormInput
                label="Password"
                type={'text'}
                name="name"
                placeholder={'Enter your name'}
              />
              <FormInput
                label="Institution"
                type={'select'}
                name="institution"
                options={['Option 1', 'Option 2', 'Option 3']}
                placeholder={'Enter your name'}
              />
              <Button variant={'link'} colorScheme="primary" mb={'20px'}>
                Forgot your password?
              </Button>
              <Button colorScheme="primary" w={'100%'}>
                Sign In
              </Button>
            </Form>
          </Formik>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default index;
