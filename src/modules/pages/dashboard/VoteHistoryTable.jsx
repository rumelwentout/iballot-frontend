import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react';
import React from 'react';
import SearchIcon from '../../shared/components/SearchIcon';

const DropdownIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="15"
      viewBox="0 0 8 15"
      fill="none"
    >
      <path
        d="M0.400241 5.98947H7.60045C7.67334 5.98924 7.7448 5.96914 7.80712 5.93132C7.86944 5.8935 7.92027 5.8394 7.95413 5.77484C7.988 5.71029 8.00361 5.63772 7.9993 5.56494C7.99498 5.49217 7.97091 5.42196 7.92965 5.36185L4.32955 0.161705C4.18035 -0.0539015 3.82114 -0.0539015 3.67153 0.161705L0.0714315 5.36185C0.0297603 5.42183 0.00532331 5.49208 0.000775592 5.56498C-0.00377212 5.63787 0.0117434 5.71061 0.0456364 5.77531C0.0795294 5.84 0.130504 5.89417 0.193021 5.93193C0.255538 5.96968 0.327207 5.98959 0.400241 5.98947Z"
        fill="#B8B8B8"
      />
      <path
        d="M0.400241 8.4003H7.60045C7.67334 8.40053 7.7448 8.42063 7.80712 8.45845C7.86944 8.49627 7.92027 8.55037 7.95413 8.61493C7.988 8.67948 8.00361 8.75205 7.9993 8.82483C7.99498 8.8976 7.97091 8.96781 7.92965 9.02792L4.32955 14.2281C4.18035 14.4437 3.82114 14.4437 3.67153 14.2281L0.0714315 9.02792C0.0297603 8.96794 0.00532331 8.89769 0.000775592 8.82479C-0.00377212 8.7519 0.0117434 8.67916 0.0456364 8.61446C0.0795294 8.54977 0.130504 8.4956 0.193021 8.45784C0.255538 8.42009 0.327207 8.40019 0.400241 8.4003Z"
        fill="#B8B8B8"
      />
    </svg>
  );
};
const VoteHistoryTable = () => {
  return (
    <Box
    //   shadow={'0px 0px 4px 0px rgba(0, 0, 0, 0.15)'}
      backgroundColor={'white'}
      p={'20px'}
      rounded={'md'}
      mt={'20px'}
    >
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <InputGroup colorScheme="primary" w={'300px'} size={'md'}>
          <InputLeftElement pointerEvents="none">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search voting history"
            rounded={'md'}
          />
        </InputGroup>

        <Select
          icon={<DropdownIcon />}
          colorScheme="primary"
          placeholder="Filter by Organization"
          w={'300px'}
          size={'md'}
          rounded={'md'}
        >
          <option>Alumni Association Oxford</option>
          <option>Alumni Association Du</option>
        </Select>
      </Flex>
      <TableContainer mt={'20px'}>
        <Table variant={'simple'} colorScheme="primary" size={'md'}>
          <Thead>
            <Tr>
              <Th>To convert</Th>
              <Th>into</Th>
              <Th isNumeric>multiply by</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>inches</Td>
              <Td>millimetres (mm)</Td>
              <Td isNumeric>25.4</Td>
            </Tr>
            <Tr>
              <Td>feet</Td>
              <Td>centimetres (cm)</Td>
              <Td isNumeric>30.48</Td>
            </Tr>
            <Tr>
              <Td>yards</Td>
              <Td>metres (m)</Td>
              <Td isNumeric>0.91444</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default VoteHistoryTable;
