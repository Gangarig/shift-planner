
import Sidebar from '../components/layout/Sidebar'
import Header from '../components/layout/Header'
import TopNavigation from '../components/layout/TopNavigation'
import { AppShell, Burger, Drawer, Group, Text } from '@mantine/core'
import { Outlet } from 'react-router-dom'
import { useDisclosure } from '@mantine/hooks'

function AppLayout() {
  const [opened, { toggle, close }] = useDisclosure();
  return (
    <AppShell
      header={{ height: 58 }}
      padding={{ base: 'xs', sm: 'sm' }}
    >
      <AppShell.Header>
        <Group h="100%" px={{ base: 'md', sm: 'xl' }} justify="space-between" wrap="nowrap">
          <Group wrap="nowrap">
            <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
            <Text fw={700} size="lg">Shift Planner</Text>
          </Group>
          <TopNavigation />
          <Header/>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <Drawer opened={opened} onClose={close} title="Navigation" size="xs" hiddenFrom="md">
        <Sidebar onNavigate={close} />
      </Drawer>
    </AppShell>
  )
}

export default AppLayout
