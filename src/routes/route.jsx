import React, { Children } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { useAuthentication } from '../hooks/useAuthentication';

const Home = React.lazy(() => import('../modules/pages/home'));
const Register = React.lazy(() => import('../modules/pages/auth/register'));
const Login = React.lazy(() => import('../modules/pages/auth/login'));
const Onboarding = React.lazy(() => import('../modules/pages/onboarding'));
const Dashboard = React.lazy(() => import('../modules/pages/dashboard'));
const OrganizationAdd = React.lazy(() =>
  import('../modules/pages/organization/add')
);

const OrganizationView = React.lazy(() =>
  import('../modules/pages/organization/view')
);

const CastVote = React.lazy(() => import('../modules/pages/vote/cast'));

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuthentication();
  const navigate = useNavigate();
  if (isLoggedIn) return <>{children}</>;
  return navigate('/auth/login');
};

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

const onBoarding = {
  path: '/onboarding',
  exact: true,
  name: 'Onboarding component',
  component: () => (
    <ProtectedRoute>
      <Onboarding />
    </ProtectedRoute>
  ),
  roles: ['User'],
  route: Route
};

const dashboard = {
  path: '/dashboard',
  exact: true,
  name: 'Dashboard component',
  component: () => (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  ),
  roles: ['User'],
  route: Route
};

const organizationAdd = {
  path: '/organization/add',
  exact: true,
  name: 'Organization Add component',
  component: OrganizationAdd,
  roles: ['User'],
  route: Route
};

const organizationView = {
  path: '/organization/view',
  exact: true,
  name: 'Organization View component',
  component: OrganizationView,
  roles: ['User'],
  route: Route
};

const castVote = {
  path: '/vote/cast/:id',
  exact: true,
  name: 'Cast vote component',
  component: CastVote,
  roles: ['User'],
  route: Route
};

export const appRoutes = [
  home,
  register,
  login,
  onBoarding,
  dashboard,
  organizationAdd,
  organizationView,
  castVote
];