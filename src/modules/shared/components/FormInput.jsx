import { Box, Input, Select, Text } from '@chakra-ui/react';
import { ErrorMessage, useField } from 'formik';
import React, { useState } from 'react';

const TextInput = ({ name, placeholder }) => {
  const [field, meta, helpers] = useField({ name });
  return (
    <Input
      name={name}
      focusBorderColor="primary.500"
      size={'md'}
      bg={'white'}
      color={'black'}
      value={field.value}
      onChange={(e) => {
        helpers.setValue(e.target.value);
      }}
      placeholder={placeholder}
    ></Input>
  );
};
const SelectInput = ({ name, placeholder,options }) => {
  const [field, meta, helpers] = useField({ name });
  return (
    <Select
      // onChange={(e) => helpers.setValue(e.target.value)}
      size={'md'}
      name={name}
      focusBorderColor="primary.500"
      placeholder={placeholder}
      // value={field.value}
    >
      {options?.map((option) => (
        <option>{option}</option>
      ))}
    </Select>
  );
};
const FormInput = ({ name, label, type, options, placeholder }) => {
  const getInput = () => {
    switch (type) {
      case 'text':
        return <TextInput name={name} placeholder={placeholder} />;
      case 'select':
        return <SelectInput name={name} placeholder={placeholder} options={options}/>;
    }
  };
  return (
    <Box mb={'10px'} w="100%">
      <Text fontWeight={'600'} mb={'4px'}>
        {label}
      </Text>
      {getInput(type)}
      <Text color={'red.500'}>
        <ErrorMessage name={name} />
      </Text>
    </Box>
  );
};

export default FormInput;
