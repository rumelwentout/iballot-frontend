import React, { useEffect } from 'react';
import MainLayout from '../../layout/MainLayout';
import { Badge, Box, Button, Heading, Stack } from '@chakra-ui/react';
import Hero from './Hero';
import { useAuthentication } from '../../../hooks/useAuthentication';
import { useNavigate } from 'react-router-dom';

const Home = () => {
 
  return (
    <MainLayout>
      <Hero />
    </MainLayout>
  );
};

export default Home;
