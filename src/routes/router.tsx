import { createBrowserRouter } from 'react-router-dom'
import AppLayout from '../layout/AppLayout'
import PlannerPage from '../pages/PlannerPage'
import DashboardPage from '../pages/DashboardPage'
import WorkersPage from '../pages/WorkersPage'
import StationsPage from '../pages/StationsPage'
import SettingsPage from '../pages/SettingsPage'
import LoginPage from '../pages/Auth/LoginPage'
import RegisterPage from '../pages/Auth/RegisterPage'
import ForgotPasswordPage from '../pages/Auth/ForgotPasswordPage'
import ResetPasswordPage from '../pages/Auth/ResetPasswordPage'
import ProtectedRoute from '../components/layout/ProtectedRoute'
import Unauthorized from '../pages/Unauthorized'
import AppProvider from '../context/AppProvider'

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
  { path: '/forgot-password', element: <ForgotPasswordPage /> },
  { path: '/reset-password', element: <ResetPasswordPage /> },
  { element: <ProtectedRoute allowedRoles={['worker', 'manager', 'admin', 'owner']} />, children: [
    { element: <AppProvider />, children: [
      { path: '/', element: <AppLayout />, children: [
        { index: true, element: <DashboardPage /> },
        { path: 'planner', element: <PlannerPage /> },
        { element: <ProtectedRoute allowedRoles={['manager', 'admin', 'owner']} />, children: [
          { path: 'workers', element: <WorkersPage /> }, { path: 'stations', element: <StationsPage /> },
        ] },
        { element: <ProtectedRoute allowedRoles={['admin', 'owner']} />, children: [{ path: 'settings', element: <SettingsPage /> }] },
        { path: 'unauthorized', element: <Unauthorized /> },
      ] },
    ] },
  ] },
])
