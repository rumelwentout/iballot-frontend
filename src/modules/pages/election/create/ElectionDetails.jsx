import { Box, Button, Select, Text, useStatStyles } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Form, Formik, useField } from 'formik';
import FormInput from '../../../shared/components/FormInput';
import axios from 'axios';
import { useAuthentication } from '../../../../hooks/useAuthentication';

const SelectInput = ({ label, name, placeholder, options }) => {
  const [field, meta, helpers] = useField({ name });
  return (
    <>
      <Text fontWeight={'600'} mb={'4px'}>
        {label}
      </Text>
      <Select
        onChange={(e) => {
          console.log(options);
          console.log(e.target.value);
          helpers.setValue(options[e.target.value]);
        }}
        size={'md'}
        name={name}
        focusBorderColor="primary.500"
        placeholder={placeholder}
        defaultValue={placeholder}
      >
        {options?.map((option, index) => (
          <option value={index}>{option.name}</option>
        ))}
      </Select>
    </>
  );
};
const ElectionDetails = () => {
  const { userInfo } = useAuthentication();

  const [orgs, setOrgs] = useState([]);
  const getOrganizations = async () => {
    const data = await axios.get(
      `${import.meta.env.VITE_BACKEND_URI}/organization/getbyuser`,
      {
        headers: {
          Authorization: `Bearer ${userInfo?.token}`
        }
      }
    );
    setOrgs(data.data);
  };

  useEffect(() => {
    if (userInfo) getOrganizations();
  }, [userInfo]);

  return (
    <Box>
      <FormInput label="Election Name" name="name" type={'text'} />
      <FormInput
        label="Start Time"
        name="start_time"
        type={'text'}
        inputType={'datetime-local'}
      />
      <FormInput
        label="End Time"
        name="end_time"
        type={'text'}
        inputType={'datetime-local'}
      />
      <SelectInput
        label="Organization"
        name="organization"
        type={'select'}
        options={[{ name: 'Select Organization' }, ...orgs]}
      />
      <SelectInput
        label="Voting System"
        name="votingSystem"
        type={'select'}
        options={[
          { name: 'Select Voting System' },
          { name: 'Single', value: 0 },
          { name: 'Multi', value: 1 },
          { name: 'Score', value: 2 }
        ]}
      />
    </Box>
  );
};

export default ElectionDetails;
