import { Button, Group } from '@mantine/core'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import navLinks from '../../data/navigation'
function TopNavigation() {
  const location = useLocation()
  const { user } = useAuth()
  if (!user) return null
  return <Group gap={4} visibleFrom="md">{navLinks.filter((link) => link.roles.includes(user.role)).map((link) => <Button component={Link} to={link.to} key={link.to} size="compact-sm" variant={location.pathname === link.to ? 'light' : 'subtle'} color="blue">{link.label}</Button>)}</Group>
}
export default TopNavigation
