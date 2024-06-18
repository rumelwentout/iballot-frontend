import { CheckIcon } from '@chakra-ui/icons';
import { Box, Image, Input } from '@chakra-ui/react';
import React from 'react';
import FormInput from './FormInput';
import { useField } from 'formik';

const ScoreCard = ({ title, caption, name, image }) => {
  //   const { field, helper, meta } = useField({ name });
  return (
    <div className="overflow-hidden flex flex-col border-slate-100 relative  inline-flex justify-between w-full  text-black bg-white border border-[2px] rounded-lg">
      <Image
        objectFit="cover"
        minH={'160px'}
        maxH={'160px'}
        src={image}
        alt="Chakra UI"
      />

      <div className="block px-[20px] pt-[10px]">
        <p className={'font-semibold text-[16px] mb-1'}>{title}</p>
        <p className={'font-medium text-[12px]'}>{caption}</p>
      </div>

      <Box w={'100%'} p={'20px'}>
        <FormInput name={name} label={'Score'} type={'text'} />
      </Box>
    </div>
  );
};

export default ScoreCard;
