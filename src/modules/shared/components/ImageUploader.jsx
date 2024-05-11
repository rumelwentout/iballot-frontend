import { Box, Spinner, Text } from '@chakra-ui/react';
import Reload from '../../pages/onboarding/Reload';
import { useField } from 'formik';
import UploadIcon from './UploadIcon';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { useMutation } from 'react-query';
import axios from 'axios';
import { DeleteIcon, EditIcon, RepeatIcon } from '@chakra-ui/icons';

export const ImageUploader = ({
  title = 'Click here to upload your image',
  acceptedType = 'Accepted file type- JPG, PNG',
  name = 'photoID'
}) => {
  const [field, meta, helpers] = useField({ name });

  const mutation = useMutation({
    mutationFn: (data) => {
      return axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/files/upload`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );
    }
  });

  useEffect(() => {
    if (mutation.isError) {
      toast.error(mutation.error);
    }
  }, [mutation.isError]);

  useEffect(() => {
    if (mutation.isSuccess) {
      helpers.setValue(mutation?.data?.data?.url);
      toast.success('Image uploaded is successful!');
    }
  }, [mutation.isSuccess]);

  const uploadhandler = async (e) => {
    e.preventDefault();

    // helpers.setValue(e.target.files[0]);

    const formData = new FormData();
    formData.append('file', e.target.files[0]);

    mutation.mutate(formData);
  };
  console.log(field.value);

  const clearImage = () => {
    helpers.setValue('');
  };
  const ImagePreview = () => {
    return (
      <Box
        backgroundImage={`url(${mutation.data?.data?.url ?? field.value})`}
        h={'100%'}
        w="100%"
        rounded={'full'}
        backgroundPosition={'center'}
        bgSize={'cover'}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'end'}
        padding={'20px 0px 0px px'}
      >
        <Box cursor={'pointer'} onClick={clearImage}>
          <DeleteIcon color={'black'} />
        </Box>
      </Box>
    );
  };
  const UploadPlaceHolder = () => {
    return (
      <Box>
        <label
          htmlFor={name}
          className="h-[100px] cursor-pointer rounded-full w-[100px] bg-gray-200"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Box cursor={'pointer'}>
            <EditIcon color={'black'} />
          </Box>
        </label>
        <input
          hidden
          type="file"
          name={name}
          id={name}
          onChange={uploadhandler}
          accept="image/png,image/jpg"
        />
      </Box>
    );
  };
  return (
    <Box
      h={'100px'}
      w={'100px'}
      //   border={'1px'}
      //   borderStyle={'dashed'}
      rounded={'full'}
      my={'20px'}
      borderColor={'gray.400'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={mutation.isLoading ? 'center' : 'start'}
    >
      {!mutation.isLoading ? (
        mutation.data?.data?.url || field.value ? (
          <ImagePreview />
        ) : (
          <UploadPlaceHolder />
        )
      ) : (
        <Spinner />
      )}
    </Box>
  );
};
