import { Box, Button, Heading, Skeleton, Stack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import MainLayout from '../../../layout/MainLayout';
import { Formik, Form } from 'formik';
import { ImageUploader } from '../../../shared/components/ImageUploader';
import FormInput from '../../../shared/components/FormInput';
import { useAuthentication } from '../../../../hooks/useAuthentication';
import { useMutation } from 'react-query';
import axios from 'axios';
import { toast } from 'sonner';

const index = () => {
  const { userInfo, token } = useAuthentication();

  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/organization/create-organization`,
        { name: data.name },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`
          }
        }
      );
    }
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success('Organization Created Successfully!');
    }
  }, [mutation.isSuccess]);
  return (
    <MainLayout>
      <Box
        minH={'100svh'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Box w={['97vw', '450px']} px={'20px'} py={'20px'} rounded={'12px'}>
          <Heading letterSpacing={-1} mb={'20px'}>
            Create Organization
          </Heading>
          {userInfo?.email ? (
            <Formik
              initialValues={{
                name: ''
              }}
              onSubmit={(values, { setSubmitting }) => {
                mutation.mutate({
                  name: values.name
                });
              }}
            >
              <Form>
                <FormInput
                  label="Organization Name"
                  name="name"
                  type={'text'}
                />
                <Button
                  colorScheme="primary"
                  type="submit"
                  isLoading={mutation.isLoading}
                >
                  Create
                </Button>
              </Form>
            </Formik>
          ) : (
            <Stack>
              <Skeleton height="45px" rounded={'8px'} />
              <Skeleton height="45px" w={'140px'} rounded={'8px'} />
            </Stack>
          )}
        </Box>
      </Box>
    </MainLayout>
  );
};

export default index;
