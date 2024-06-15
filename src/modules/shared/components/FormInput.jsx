import { Box, Input, Select, Text } from '@chakra-ui/react';
import { ErrorMessage, useField } from 'formik';
import React, { useState } from 'react';

const TextInput = ({ name, placeholder, ...props }) => {
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
      {...props}
    ></Input>
  );
};
const SelectInput = ({ name, placeholder, options }) => {
  const [field, meta, helpers] = useField({ name });
  return (
    <Select
      // onChange={(e) => helpers.setValue(e.target.value)}
      size={'md'}
      name={name}
      focusBorderColor="primary.500"
      placeholder={placeholder}
      defaultValue={placeholder}
    >
      {options?.map((option, index) => (
        <option disabled={index === 0} value={option}>
          {option}
        </option>
      ))}
    </Select>
  );
};
const FormInput = ({
  name,
  label,
  type,
  inputType,
  options,
  placeholder,
  ...props
}) => {
  const getInput = () => {
    switch (type) {
      case 'text':
        return (
          <TextInput
            type={inputType}
            {...props}
            name={name}
            placeholder={placeholder}
          />
        );
      case 'select':
        return (
          <SelectInput
            name={name}
            placeholder={placeholder}
            options={options}
            {...props}
          />
        );
    }
  };
  return (
    <Box mb={'10px'} w="100%">
      <Text fontWeight={'600'} mb={'4px'}>
        {label}
      </Text>
      {getInput(type)}
      <Text color={'red.500'} fontSize={'14px'} mt={'5px'} fontWeight={'500'}>
        <ErrorMessage name={name} />
      </Text>
    </Box>
  );
};

export default FormInput;
