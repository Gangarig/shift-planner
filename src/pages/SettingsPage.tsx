import { Badge, Button, Group, Paper, Stack, Text, Title, useMantineColorScheme } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
export default function SettingsPage() {
  const { user } = useAuth()
  const { setColorScheme } = useMantineColorScheme()
  return <Stack className="page-container">
    <Title order={1}>Settings</Title><Text c="dimmed">Your account and workspace preferences.</Text>
    <Paper withBorder p="lg"><Stack><Group justify="space-between"><Text fw={600}>{user?.name}</Text><Badge variant="light">{user?.role}</Badge></Group><Text>{user?.email}</Text><Text size="sm" c="dimmed">Worker records describe people on the schedule. Login accounts control access to this workspace.</Text><Button component={Link} to="/forgot-password" variant="light">Request password reset</Button></Stack></Paper>
    <Paper withBorder p="lg"><Stack><Text fw={600}>Appearance</Text><Group><Button variant="default" onClick={() => setColorScheme('light')}>Light</Button><Button variant="default" onClick={() => setColorScheme('dark')}>Dark</Button><Button variant="default" onClick={() => setColorScheme('auto')}>Use device setting</Button></Group></Stack></Paper>
    <Paper withBorder p="lg"><Text fw={600}>Scheduling rules</Text><Text size="sm" c="dimmed">Monday to Friday, one worker per station per day. Changing availability clears assignments only in the selected week. Managers, admins, and owners can edit the schedule.</Text></Paper>
  </Stack>
}
