import { Avatar, Badge, Button, Group, Stack, Switch, Text, useMantineColorScheme } from '@mantine/core'
import { useAuth } from '../../context/AuthContext'
import NotificationMenu from './NotificationMenu'
function Header() {
  const { user, signOut } = useAuth()
  const { colorScheme, setColorScheme } = useMantineColorScheme()
  if (!user) return null
  return <Group className="header-actions" gap="sm" wrap="nowrap"><Switch checked={colorScheme === 'dark'} onChange={(event) => setColorScheme(event.currentTarget.checked ? 'dark' : 'light')} label={colorScheme === 'dark' ? 'Dark' : 'Light'} aria-label="Toggle color scheme" /><NotificationMenu /><Avatar visibleFrom="sm" color="blue" radius="xl">{user.name.slice(0, 2).toUpperCase()}</Avatar><Stack gap={1} visibleFrom="sm"><Text size="sm" fw={600}>{user.name}</Text><Badge size="xs" variant="light">{user.role}</Badge></Stack><Button className="logout-button" size="compact-sm" variant="subtle" color="gray" onClick={() => void signOut()}>Log out</Button></Group>
}
export default Header
