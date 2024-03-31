import { Box, Button, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo';

const NavLeftItems = () => {
  const leftItems = [
    {
      type: 'IMG',
      component: (
        <Box w={'100px'}>
          <Logo />
        </Box>
      ),
      link: '/'
    }
  ];
  return (
    <Flex>
      {leftItems.map((item, index) => (
        <Link to={item.link} key={index}>
          {item.component}
        </Link>
      ))}
    </Flex>
  );
};

const NavRightItems = () => {
  const NavItem = ({ label, type }) => {
    return (
      <Button
        variant={type}
        fontWeight={'500'}
        fontSize={'14px'}
        colorScheme={type === 'solid' && 'primary'}
      >
        {label}
      </Button>
    );
  };
  const rightItems = [
    {
      type: 'LINK_BTN',
      label: 'Caste Vote',
      component: NavItem,
      link: '/'
    },
    {
      type: 'LINK_BTN',
      label: 'Create Organization',
      component: NavItem,
      link: '/'
    },
    {
      type: 'LINK_BTN',
      label: 'Sign up',
      component: NavItem,
      link: '/auth/register'
    },
    {
      type: 'PRIMARY_BTN',
      label: 'Sign in',
      component: NavItem,
      link: '/auth/login'
    }
  ];
  return (
    <Flex gap={'32px'} alignItems={'center'}>
      {rightItems.map((item) => (
        <Link to={item.link} key={item.label}>
          <item.component
            label={item.label}
            type={item.type === 'LINK_BTN' ? 'link' : 'solid'}
          />
        </Link>
      ))}
    </Flex>
  );
};
const DesktopNav = () => {
  return (
    <Flex justifyContent={'space-between'} alignItems={'center'}>
      <NavLeftItems />
      <NavRightItems />
    </Flex>
  );
};

export default DesktopNav;
