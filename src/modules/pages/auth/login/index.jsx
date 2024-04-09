import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { ErrorMessage, Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import FormInput from '../../../shared/components/FormInput';
import LogoIcon from '../../../shared/components/LogoIcon';
import { Link, useNavigate } from 'react-router-dom';
import MainLayout from '../../../layout/MainLayout';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { toast } from 'sonner';
import * as Yup from 'yup';

const initialValues = {
  password: '',
  email: ''
};

const validationSchema = Yup.object({
  password: Yup.string().required('Password is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
});

const index = () => {
  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.post(`${import.meta.env.VITE_BACKEND_URI}/user/login`, data);
    }
  });

  const navigate = useNavigate()

  useEffect(() => {
    if (mutation.isError) {
      toast.error(mutation.error);
    }
  }, [mutation.isError]);

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success('Logged in successfully!');
      console.log(mutation.data.data.access_token)
      document.cookie = `token=${mutation.data.data.access_token}; path=/;`;
      navigate('/dashboard')
    }
  }, [mutation.isSuccess]);

  const tokenRegex = /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/;
  const tokenMatch = document.cookie.match(tokenRegex);
  const token = tokenMatch ? tokenMatch[1] : null;

  console.log('Document cookie:', document.cookie);
  console.log('Extracted token:', token);
  return (
    <MainLayout>
      <Box
        minH={'100svh'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box w={['97vw','450px']} px={'20px'} py={'20px'} rounded={'12px'}>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              console.log(values);
              mutation.mutate({
                username: values.email,
                password: values.password
              });
            }}
          >
            <Form>
              <Box w={'60px'} m={'0 auto'}>
                <LogoIcon />
              </Box>
              <Heading
                as={'h3'}
                fontSize="32px"
                letterSpacing={-1}
                textAlign={'center'}
                mt={'20px'}
                mb={'5px'}
              >
                Sign in to your account
              </Heading>
              <Text textAlign={'center'} mt={'10px'} mb={'30px'}>
                Don't have an account?{' '}
                <Link to={'/auth/register'}>
                  <Button variant={'link'} colorScheme="primary">
                    Sign up
                  </Button>
                </Link>
              </Text>
              <FormInput
                label="Email"
                name="email"
                type={'text'}
                // placeholder={'Enter your name'}
              />

              <FormInput
                label="Password"
                type={'text'}
                name="password"
                // placeholder={'Enter your name'}
              />

              <Button variant={'link'} colorScheme="primary" mb={'20px'}>
                Forgot your password?
              </Button>
              <Button
                type="submit"
                colorScheme="primary"
                w={'100%'}
                isLoading={mutation.isLoading}
              >
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
