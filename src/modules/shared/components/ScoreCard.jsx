import { CheckIcon } from '@chakra-ui/icons';
import { Box, Image, Input } from '@chakra-ui/react';
import React from 'react';
import FormInput from './FormInput';
import { useField } from 'formik';

const image =
  'https://images.unsplash.com/photo-1600486913747-55e5470d6f40?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

const ScoreCard = ({ title, caption, name }) => {
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
