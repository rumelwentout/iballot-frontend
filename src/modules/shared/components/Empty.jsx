import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const Empty = ({
  title = 'Empty',
  subtitle = 'There is nothing to show here',
  action,
  actionTitle
}) => {
  return (
    <Box
      rounded={'14px'}
      px={'40px'}
      my={'20px'}
      py="40px"
      bg={'white'}
      display={'flex'}
      flexDir={'column'}
      alignItems={'center'}
      justifyContent={'center'}
    >
      <Box>
        <svg
          width="93"
          height="83"
          viewBox="0 0 93 83"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.1187 29.8428L48.9447 10.5137L77.8998 27.0594C79.3797 27.9048 80.6098 29.1265 81.4652 30.6006C82.3207 32.0747 82.7711 33.7488 82.7708 35.4531V58.0586C82.7711 59.763 82.3207 61.4371 81.4652 62.9112C80.6098 64.3853 79.3797 65.607 77.8998 66.4523L53.7383 80.2582C52.2784 81.0921 50.6261 81.5308 48.9447 81.5308C47.2633 81.5308 45.6111 81.0921 44.1511 80.2582L19.9896 66.4523C18.5097 65.607 17.2796 64.3853 16.4242 62.9112C15.5688 61.4371 15.1184 59.763 15.1187 58.0586V44.5185"
            stroke="black"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M44.3638 46.7076C45.7717 47.4655 47.3458 47.8623 48.9448 47.8623C50.5438 47.8623 52.1178 47.4655 53.5258 46.7076L80.3547 32.259M48.9448 49.1721V80.582"
            stroke="black"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.119 29.8429L48.945 49.1721L34.4481 54.0044L0.62207 34.6752L15.119 29.8429ZM48.945 10.5137L82.7711 29.8429L92.4357 20.1783L58.6096 0.849121L48.945 10.5137Z"
            stroke="black"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </Box>
      <Box mt={'40px'}>
        <Text fontSize={'20px'} textAlign={'center'} fontWeight={'semibold'}>
          {title}
        </Text>
        <Text fontSize={'14px'} textAlign="center" mt={'10px'}>
          {subtitle}
        </Text>
      </Box>
      {action && actionTitle && (
        <Link to={action}>
          <Button colorScheme="primary" mt={'40px'}>
            {actionTitle}
          </Button>
        </Link>
      )}
    </Box>
  );
};

export default Empty;
