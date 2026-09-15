import { Badge, Button, Group, Paper, Stack, Text, Title, useMantineColorScheme } from '@mantine/core'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import useApp from '../hooks/useApp'
import { toDateKey } from '../lib/dateUtils'
export default function SettingsPage() {
  const { user } = useAuth()
  const { setColorScheme } = useMantineColorScheme()
  const app = useApp()
  const csv = (rows: (string | number | null | undefined)[][]) => rows.map(row => row.map(value => `"${String(value ?? '').replaceAll('"', '""')}"`).join(',')).join('\n')
  function download(name: string, contents: string) { const url = URL.createObjectURL(new Blob([contents], { type: 'text/csv;charset=utf-8' })); const link = document.createElement('a'); link.href = url; link.download = name; link.click(); URL.revokeObjectURL(url) }
  function exportWorkers() { download('shiftplanner-workers.csv', csv([['Name','Email','Status','Role','Main station'], ...app.workers.map(worker => [worker.name,worker.email,worker.status,worker.role,app.stations.find(station => station.id === worker.preferredStationId)?.name])])) }
  function exportWeek() { download(`shiftplanner-${toDateKey(app.monday)}.csv`, csv([['Date','Station','Worker','Start','End','Note'], ...app.assignments.map(assignment => [toDateKey(assignment.date),app.stations.find(station => station.id === assignment.stationId)?.name,app.workers.find(worker => worker.id === assignment.workerId)?.name,assignment.startTime,assignment.endTime,assignment.note])])) }
  return <Stack className="page-container">
    <Title order={1}>Settings</Title><Text c="dimmed">Your account and workspace preferences.</Text>
    <Paper withBorder p="lg"><Stack><Group justify="space-between"><Text fw={600}>{user?.name}</Text><Badge variant="light">{user?.role}</Badge></Group><Text>{user?.email}</Text><Text size="sm" c="dimmed">Worker records describe people on the schedule. Login accounts control access to this workspace.</Text><Button component={Link} to="/forgot-password" variant="light">Request password reset</Button></Stack></Paper>
    <Paper withBorder p="lg"><Stack><Text fw={600}>Appearance</Text><Group><Button variant="default" onClick={() => setColorScheme('light')}>Light</Button><Button variant="default" onClick={() => setColorScheme('dark')}>Dark</Button><Button variant="default" onClick={() => setColorScheme('auto')}>Use device setting</Button></Group></Stack></Paper>
    <Paper withBorder p="lg"><Stack><Text fw={600}>Data exports</Text><Text size="sm" c="dimmed">Download portable CSV copies for reporting or backup checks.</Text><Group><Button variant="light" onClick={exportWeek}>Export selected week</Button><Button variant="default" onClick={exportWorkers}>Export workers</Button></Group></Stack></Paper>
    <Paper withBorder p="lg"><Text fw={600}>Scheduling rules</Text><Text size="sm" c="dimmed">Monday to Friday, multiple workers per station, but only one station per worker each day. Dated sick leave and vacation clear assignments only inside their date range. Managers, admins, and owners can edit the schedule.</Text></Paper>
  </Stack>
}
