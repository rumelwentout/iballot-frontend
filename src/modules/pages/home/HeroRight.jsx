import { Box, Button, Heading, Input, Select, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useEffect } from 'react';
import Shapes from './Shapes';
import FormInput from '../../shared/components/FormInput';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useMutation } from 'react-query';
import axios from 'axios';
import * as Yup from 'yup';

const initialValues = {
  // fullName: '',
  email: '',
  password: '',
  // confirmPassword: '',
  institution: ''
};

const validationSchema = Yup.object({
  // fullName: Yup.string().required('Full name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required')
  // confirmPassword: Yup.string()
  //   .oneOf([Yup.ref('password'), null], 'Passwords must match')
  //   .required('Confirm password is required')
});

const HeroRight = () => {
  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/user/signup`,
        data
      );
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (mutation.isError) {
      toast.error(mutation.error);
    }
  }, [mutation.isError]);

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success('Your registration is successful!');
      console.log(mutation.data.data.access_token);
      document.cookie = `token=${mutation.data.data.access_token}; path=/;`;
      navigate('/onboarding');
    }
  }, [mutation.isSuccess]);
  return (
    <Box position={'relative'} w={'40%'}>
      <Box pos={'absolute'} top={-100} zIndex={-1} left={-100}>
        <Shapes />
      </Box>
      <Box
        w={'380px'}
        bg={'white'}
        // shadow={'2xl'}
        px={'25px'}
        py={'25px'}
        rounded={'12px'}
      >
        <Formik
          enableReinitialize={true}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            mutation.mutate({
              fullname: '',
              email: values.email,
              password: values.password,
              institution: values.institution
            });
          }}
        >
          <Form>
            <Heading
              as={'h3'}
              fontSize={'32px'}
              letterSpacing={-1}
              textAlign={'center'}
              mb={'30px'}
            >
              Sign Up Now
            </Heading>
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
              inputType={'password'}
              // placeholder={'Enter your name'}
            />
            {/* <FormInput
              label="Institution"
              type={'select'}
              name="institution"
              options={['Option 1', 'Option 2', 'Option 3']}
              // placeholder={'Enter your name'}
            /> */}
            {/* <Link to="onboarding"> */}
            <Button
              colorScheme="primary"
              w={'100%'}
              type="submit"
              isLoading={mutation.isLoading}
            >
              Sign Up
            </Button>
            <Link to={'/auth/admin/register'}>
              <Button
                colorScheme="primary"
                w={'100%'}
                // type="submit"
                mt={'20px'}
                variant={'outline'}
                // isLoading={mutation.isLoading}
              >
                Register an admin account
              </Button>
            </Link>
            {/* </Link> */}
            <Text textAlign={'center'} mt={'20px'} mb={'10px'}>
              Already have an account?{' '}
              <Link to="/auth/login">
                <Button variant={'link'} colorScheme="primary">
                  Sign in
                </Button>
              </Link>
            </Text>
          </Form>
        </Formik>
      </Box>
    </Box>
  );
};

export default HeroRight;
