import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css';
import { MantineProvider, type MantineColorsTuple } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import './index.css'

const theme = {
  primaryColor: 'sky',
  defaultRadius: 'md',
  fontFamily: 'Inter, ui-sans-serif, system-ui, sans-serif',
  colors: {
    sky: ['#f1f8fe', '#e4f3fc', '#c7e7f8', '#a5d8f2', '#7cc5e9', '#57afe0', '#3299d6', '#1d7fc2', '#176ba7', '#145a8b'] as MantineColorsTuple,
  },
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="light">
      <Notifications position="top-right" />
      <App />
    </MantineProvider>
  </StrictMode>,
)
