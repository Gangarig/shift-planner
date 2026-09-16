import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css';
import { createTheme, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import './index.css'
import AppErrorBoundary from './components/AppErrorBoundary.tsx'

const theme = createTheme({
  primaryColor: 'blue',
  primaryShade: 7,
  colors: { blue: ['#f9eef2', '#f2d6e0', '#e8b5c8', '#da89a6', '#c75a80', '#ad315e', '#951947', '#810b38', '#68102f', '#541a1a'] },
  defaultRadius: 'md',
  fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Notifications position="top-right" />
      <AppErrorBoundary><App /></AppErrorBoundary>
    </MantineProvider>
  </StrictMode>,
)
