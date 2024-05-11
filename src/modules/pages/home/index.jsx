import React, { useEffect } from 'react';
import MainLayout from '../../layout/MainLayout';
import { Badge, Box, Button, Heading, Stack } from '@chakra-ui/react';
import Hero from './Hero';
import { useAuthentication } from '../../../hooks/useAuthentication';
import { useNavigate } from 'react-router-dom';
import Nav from '../../shared/components/nav';

const Home = () => {
  return (
    // <MainLayout>
    <>
      <Nav />
      <Hero />
    </>
  );
};

export default Home;
