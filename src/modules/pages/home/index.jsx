import React from 'react';
import MainLayout from '../../layout/MainLayout';
import { Badge, Box, Button, Heading, Stack } from '@chakra-ui/react';
import Hero from './Hero';

const Home = () => {
  return (
    <MainLayout>
      <Hero/>
    </MainLayout>
  );
};

export default Home;
