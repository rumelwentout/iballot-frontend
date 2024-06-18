import {
  Avatar,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../Logo';
import { useAuthentication } from '../../../../hooks/useAuthentication';
import { ChevronDownIcon } from '@chakra-ui/icons';

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
const NavRightItems = () => {
  const { isLoggedIn, logout, userInfo } = useAuthentication();
  const navigate = useNavigate();

  const rightItems = [
    // {
    //   type: 'LINK_BTN',
    //   label: 'Caste Vote',
    //   component: NavItem,
    //   link: '/'
    // },
    // {
    //   type: 'LINK_BTN',
    //   label: 'Create Organization',
    //   component: NavItem,
    //   link: '/'
    // },
    {
      type: 'LINK_BTN',
      label: 'Dashboard',
      requiredAuth: true,
      component: NavItem,
      link: '/dashboard'
    },
    {
      type: 'LINK_BTN',
      label: 'Join Organization',
      requiredAuth: true,
      component: NavItem,
      link: '/organization/add'
    },
    {
      type: 'LINK_BTN',
      label: 'Elections',
      requiredAuth: true,
      component: NavItem,
      link: '/election/view'
    },
    {
      type: 'LINK_BTN',
      label: 'Create Election',
      requiredAuth: true,
      component: NavItem,
      link: '/election/create'
    },
    {
      type: 'LINK_BTN',
      label: 'Create Organization',
      requiredAuth: true,
      component: NavItem,
      link: '/organization/create'
    },
    {
      type: 'LINK_BTN',
      label: 'Sign up',
      requiredAuth: false,
      component: NavItem,
      link: '/auth/register'
    },

    {
      type: 'PRIMARY_BTN',
      requiredAuth: false,
      label: 'Sign in',
      component: NavItem,
      link: '/auth/login'
    }
  ];

  const menuList = [
    // {
    //   label: 'Profile',
    //   action: '',
    //   link: ''
    // },
    {
      label: 'Settings',
      action: '',
      link: '/settings'
    },
    {
      label: 'Logout',
      action: () => logout(),
      link: ''
    }
  ];
  const menuItemStyle = { bg: 'primary.50', color: 'Black' };

  return (
    <Flex gap={'32px'} alignItems={'center'}>
      {rightItems.map((item) => {
        const shouldRender =
          (isLoggedIn && item.requiredAuth) ||
          (!isLoggedIn && !item.requiredAuth);

        return shouldRender ? (
          <Link to={item.link} key={item.label}>
            <item.component
              label={item.label}
              type={item.type === 'LINK_BTN' ? 'link' : 'solid'}
            />
          </Link>
        ) : null;
      })}
      {isLoggedIn && (
        <Menu>
          <MenuButton rightIcon={<ChevronDownIcon />}>
            <Box as={Button} rounded={'full'} bg={'none'}>
              <Avatar name={userInfo?.fullName} src={userInfo?.userImage} />
            </Box>
          </MenuButton>
          <MenuList>
            {menuList.map((menu, index) => {
              if (index === menuList.length - 1)
                return (
                  <MenuItem
                    _hover={{ bg: 'none', cursor: 'default' }}
                    _active={{ bg: 'none', cursor: 'default' }}
                    _focus={{ bg: 'none', cursor: 'default' }}
                    key={index}
                  >
                    <Button
                      size={'sm'}
                      colorScheme="primary"
                      onClick={() => {
                        menu.link ? navigate(menu.link) : menu.action();
                      }}
                    >
                      Logout
                    </Button>
                  </MenuItem>
                );
              return (
                <MenuItem
                  fontSize="14px"
                  _hover={menuItemStyle}
                  _active={menuItemStyle}
                  _focus={menuItemStyle}
                  key={index}
                  onClick={() => {
                    menu.link ? navigate(menu.link) : menu.action();
                  }}
                >
                  {menu.label}
                </MenuItem>
              );
            })}
          </MenuList>
        </Menu>
      )}
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
