import React, { Children } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { useAuthentication } from '../hooks/useAuthentication';

const Home = React.lazy(() => import('../modules/pages/home'));
const Register = React.lazy(() => import('../modules/pages/auth/register'));
const AdminRegister = React.lazy(() =>
  import('../modules/pages/auth/admin/register')
);
const Login = React.lazy(() => import('../modules/pages/auth/login'));
const Onboarding = React.lazy(() => import('../modules/pages/onboarding'));
const Dashboard = React.lazy(() => import('../modules/pages/dashboard'));
const OrganizationAdd = React.lazy(() =>
  import('../modules/pages/organization/add')
);

const OrganizationRequest = React.lazy(() =>
  import('../modules/pages/organization/request')
);

const OrganizationView = React.lazy(() =>
  import('../modules/pages/organization/view')
);

const CreateOrganization = React.lazy(() =>
  import('../modules/pages/organization/create')
);

const CastVote = React.lazy(() => import('../modules/pages/vote/cast'));
const Settings = React.lazy(() => import('../modules/pages/settings'));
const CreateElection = React.lazy(() =>
  import('../modules/pages/election/create')
);

const ViewElection = React.lazy(() => import('../modules/pages/election/view'));
const ElectionResult = React.lazy(() =>
  import('../modules/pages/election/result')
);

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

const adminRegister = {
  path: '/auth/admin/register',
  exact: true,
  name: 'Admin Register component',
  component: AdminRegister,
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

const createElection = {
  path: '/election/create',
  exact: true,
  name: 'Create Election component',
  component: () => (
    <ProtectedRoute>
      <CreateElection />
    </ProtectedRoute>
  ),
  roles: ['User'],
  route: Route
};

const viewElection = {
  path: '/election/view',
  exact: true,
  name: 'View Election component',
  component: () => (
    <ProtectedRoute>
      <ViewElection />
    </ProtectedRoute>
  ),
  roles: ['User'],
  route: Route
};

const electionResult = {
  path: '/election/result/:id',
  exact: true,
  name: 'Election Result component',
  component: () => (
    <ProtectedRoute>
      <ElectionResult />
    </ProtectedRoute>
  ),
  roles: ['User'],
  route: Route
};

const createOrganization = {
  path: '/organization/create',
  exact: true,
  name: 'Create Organization component',
  component: () => (
    <ProtectedRoute>
      <CreateOrganization />
    </ProtectedRoute>
  ),
  roles: ['User'],
  route: Route
};

const settings = {
  path: '/settings',
  exact: true,
  name: 'Settings component',
  component: () => (
    <ProtectedRoute>
      <Settings />
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

const organizationRequest = {
  path: '/organization/request',
  exact: true,
  name: 'Organization Request component',
  component: OrganizationRequest,
  roles: ['User'],
  route: Route
};

const organizationView = {
  path: '/organization/:id/view',
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
  organizationRequest,
  castVote,
  settings,
  createElection,
  createOrganization,
  viewElection,
  adminRegister,
  electionResult
];
