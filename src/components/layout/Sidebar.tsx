import { Divider, NavLink, Stack, Text } from '@mantine/core';
import { Link, useLocation } from 'react-router-dom';
import currentUser from '../../data/mockCurrentUser';
import { Fragment } from 'react/jsx-runtime';
import navLinks from '../../data/navigation';
interface SidebarProps {
  onNavigate?: () => void
}

function Sidebar({ onNavigate }: SidebarProps) {
  const location = useLocation()
  const user = currentUser
  const items = navLinks
    .filter(link => link.roles.includes(user.role))
    .map((link) => (
    <Fragment key={link.to}>    
      {link.label === 'Settings' ? <Divider my={'sm'} size={'sm'}/> : null}
      <NavLink variant="light"
        component={Link}
        to={link.to}
        label={link.label}
        active={location.pathname === link.to}
        onClick={onNavigate}
        // leftSection={<link.icon size={16}/>
      />
    </Fragment>))

  return (
    <Stack gap="xs">
        <Text c="dimmed" fw={700} size="xs" tt="uppercase" px="sm" mt="sm">Workspace</Text>
        <Divider my="xs"/>
        {items}
    </Stack>
  )
}

export default Sidebar
