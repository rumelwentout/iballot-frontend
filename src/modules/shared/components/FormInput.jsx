import { Box, Input, Select, Text } from '@chakra-ui/react';
import React from 'react'

const FormInput = ({ name, label, type,options, placeholder }) => {
    const TextInput = () => {
      return (
        <Input
          name={name}
          colorScheme="primary"
          placeholder={placeholder}
        ></Input>
      );
    };
    const SelectInput = () => {
      return (
        <Select name={name} colorScheme="primary" placeholder={placeholder}>
          {options?.map((option) => (
            <option>{option}</option>
          ))}
        </Select>
      );
    };
    const getInput = () => {
      switch (type) {
        case 'text':
          return <TextInput />;
        case 'select':
          return <SelectInput />;
      }
    };
    return (
      <Box mb={'20px'}>
        <Text fontWeight={'600'} mb={'4px'}>
          {label}
        </Text>
        {getInput(type)}
      </Box>
    );
  };

export default FormInput