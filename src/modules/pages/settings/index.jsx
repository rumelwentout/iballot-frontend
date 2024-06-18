import { Box, Button, Flex, Heading, Skeleton, Stack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import MainLayout from '../../layout/MainLayout';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import FormInput from '../../shared/components/FormInput';
import { useAuthentication } from '../../../hooks/useAuthentication';
import { useMutation } from 'react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { ImageUploader } from '../../shared/components/ImageUploader';

const index = () => {
  const navigate = useNavigate();
  const { userInfo, token } = useAuthentication();

  console.log(userInfo);

  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.patch(
        `${import.meta.env.VITE_BACKEND_URI}/user/update`,
        data,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.token}`
          }
        }
      );
    }
  });

  useEffect(() => {
    if (mutation.isSuccess) {
      toast.success('Profile Updated Successfully!');
    }
  }, [mutation.isSuccess]);

  console.log(userInfo);
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
            Settings
          </Heading>
          {userInfo?.email ? (
            <Formik
              initialValues={{
                profile_pic: userInfo?.userImage,
                full_name: userInfo?.fullname,
                email: userInfo?.email,
                role: userInfo?.role
              }}
              onSubmit={(values, { setSubmitting }) => {
                mutation.mutate({
                  fullname: values.full_name,
                  email: values.email,
                  role: values.role,
                  userImage: values.profile_pic
                });
              }}
            >
              <Form>
                <ImageUploader name="profile_pic" />
                <FormInput label="Full Name" name="full_name" type={'text'} />
                <FormInput
                  isDisabled={true}
                  label="Role"
                  name="role"
                  type={'text'}
                />
                <FormInput
                  label="Email"
                  name="email"
                  type={'text'}
                  isDisabled={true}
                />
                <Button
                  colorScheme="primary"
                  type="submit"
                  isLoading={mutation.isLoading}
                >
                  Update Profile
                </Button>
              </Form>
            </Formik>
          ) : (
            <Stack>
              <Skeleton height="100px" w={'100px'} rounded={'8px'} />
              <Skeleton height="45px" rounded={'8px'} />
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
