import { Box, Button, Heading, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import * as Yup from 'yup';
import { toast } from 'sonner';
import axios from 'axios';
import MainLayout from '../../../../layout/MainLayout';
import LogoIcon from '../../../../shared/components/LogoIcon';
import FormInput from '../../../../shared/components/FormInput';

const initialValues = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  institution: ''
};

const validationSchema = Yup.object({
  fullName: Yup.string().required('Full name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required')
});

const index = () => {
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

  const [orgs, setOrgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const getOrganizations = async () => {
    try {
      const data = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/organization/`
      );
      setOrgs(data.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      // toast.error("Couldn't fetch any organizations,try adding one first!");
    }
  };

  useEffect(() => {
    getOrganizations();
  }, []);
  console.log(orgs);

  return (
    <MainLayout>
      <Box
        minH={'100svh'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box w={'450px'} px={'20px'} py={'20px'} rounded={'12px'}>
          <Box w={'60px'} m={'0 auto'}>
            <LogoIcon />
          </Box>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              mutation.mutate({
                fullname: values.fullName,
                email: values.email,
                password: values.password,
                institution: values.institution,
                role: 'admin'
              });
            }}
          >
            <Form>
              <Heading
                as={'h3'}
                fontSize="32px"
                letterSpacing={-1}
                textAlign={'center'}
                mt={'20px'}
                mb={'5px'}
              >
                Create Admin account
              </Heading>
              <Text textAlign={'center'} mt={'10px'} mb={'30px'}>
                Already have an account?{' '}
                <Link to={'/auth/login'}>
                  <Button variant={'link'} colorScheme="primary">
                    Sign in
                  </Button>
                </Link>
              </Text>

              <FormInput label="Full Name*" name="fullName" type={'text'} />
              <FormInput label="Email*" name="email" type={'text'} />
              <FormInput
                label="Password*"
                inputType={'password'}
                type={'text'}
                name="password"
              />
              <FormInput
                label="Confirm Password*"
                type={'text'}
                name="confirmPassword"
                inputType={'password'}
              />
              {/* <FormInput
                label="Institution"
                type={'select'}
                name="institution"
                options={['Select', 'CSEDU']}
              /> */}

              <Button
                type="submit"
                isLoading={mutation.isLoading}
                colorScheme="primary"
                w={'100%'}
              >
                Sign Up
              </Button>
            </Form>
          </Formik>
        </Box>
      </Box>
    </MainLayout>
  );
};

export default index;
