import React from 'react';
import { Route } from 'react-router-dom';

const Home = React.lazy(() => import('../modules/pages/home'));
const Register = React.lazy(() => import('../modules/pages/auth/register'));
const Login = React.lazy(() => import('../modules/pages/auth/login'));

const home = {
  path: '/',
  exact: true,
  name: 'Home component',
  component: Home,
  roles: ['User'],
  route: Route
};

const register = {
  path: '/auth/register',
  exact: true,
  name: 'Register component',
  component: Register,
  roles: ['User'],
  route: Route
};

const login = {
  path: '/auth/login',
  exact: true,
  name: 'Login component',
  component: Login,
  roles: ['User'],
  route: Route
};

export const appRoutes = [home, register, login];
