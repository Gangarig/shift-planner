import { Alert, Code, Container, Stack, Text, Title } from '@mantine/core'
import { configured } from './lib/supabase'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/router'
import { AuthProvider } from './context/AuthContext'
function App() {
  if (!configured) return <Container size="sm" py={80}><Stack><Title>Connect your workspace</Title><Alert title="Local setup needed" color="blue">Add the connection settings to start ShiftPlanner.</Alert><Text>Create .env.local beside package.json with your project values:</Text><Code block>{'VITE_SUPABASE_URL=your-project-url\nVITE_SUPABASE_ANON_KEY=your-publishable-key'}</Code><Text>Stop the development server and run npm run dev again. The local configuration is not included when cloning the repository.</Text></Stack></Container>
  return <AuthProvider><RouterProvider router={router} /></AuthProvider> }
export default App
