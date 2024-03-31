import { Box, Button, Heading, Input, Select, Text } from '@chakra-ui/react';
import { Form, Formik } from 'formik';
import React from 'react';
import Shapes from './Shapes';
import FormInput from '../../shared/components/FormInput';
import { Link } from 'react-router-dom';

const initialValues = {};
const validationSchema = {};

const HeroRight = () => {
  return (
    <Box position={'relative'}>
      <Box pos={'absolute'} top={-100} zIndex={-1} left={-100}>
        <Shapes />
      </Box>
      <Box
        w={'350px'}
        bg={'white'}
        shadow={'2xl'}
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
            <Heading as={'h3'} textAlign={'center'} mb={'30px'}>
              Register Now
            </Heading>
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
            <Button colorScheme="primary" w={'100%'}>
              Register
            </Button>
            <Text textAlign={'center'} mt={'20px'} mb={'10px'}>
              Already have an account?{' '}
              <Link to="/auth/login">
              <Button variant={'link'} colorScheme="primary">
                Login
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
