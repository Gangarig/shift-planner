import { Badge, Button, Group, Paper, Stack, Text } from '@mantine/core'
import { Link } from 'react-router-dom'
import useApp from '../../hooks/useApp'
import { toDateKey } from '../../lib/dateUtils'
import { austrianPublicHoliday } from '../../lib/austrianHolidays'

const statusColors = { available: 'green', late: 'orange', sick: 'red', holiday: 'yellow', inactive: 'gray' } as const

function WorkerAvailability() {
  const { workers, assignments, stations, weekDays } = useApp()
  const dates = new Set(weekDays.map(day => toDateKey(day.date)))
  const weekAssignments = assignments.filter(assignment => dates.has(toDateKey(assignment.date)))
  const dateLabel = (date: Date) => date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })

  return <Stack gap="sm">
    <Group justify="space-between" align="flex-end">
      <div><Text fw={700} size="lg">This week’s plan</Text><Text size="sm" c="dimmed">The same clear schedule view, without editing controls.</Text></div>
      <Button component={Link} to="/planner" variant="light">Open planner</Button>
    </Group>
    <div className="schedule-layout dashboard-schedule-layout">
      <div className="schedule-scroll compact dashboard-schedule-scroll">
        <table className="schedule-table">
          <thead><tr><th scope="col">Station</th>{weekDays.map(day => {
            const holiday = austrianPublicHoliday(day.date)
            return <th scope="col" key={toDateKey(day.date)} className={holiday ? 'holiday-column' : ''}>{day.label.slice(0, 3)}<span>{dateLabel(day.date)}</span>{holiday && <small>Closed · {holiday}</small>}</th>
          })}</tr></thead>
          <tbody>{stations.map(station => <tr key={station.id}>
            <th scope="row">{station.name}{!station.active && <small>Inactive</small>}</th>
            {weekDays.map(day => {
              const date = toDateKey(day.date)
              const holiday = austrianPublicHoliday(day.date)
              if (holiday) return <td key={date} className="holiday-cell" aria-label={`${station.name}, ${date}, closed for ${holiday}`} />
              const cellAssignments = weekAssignments.filter(item => item.stationId === station.id && toDateKey(item.date) === date)
              return <td key={date}><div className={`schedule-cell dashboard-schedule-cell ${cellAssignments.length ? 'filled' : 'empty'}`}>{cellAssignments.length ? cellAssignments.map(assignment => <div className="cell-assignment" key={assignment.id}><strong>{workers.find(item => item.id === assignment.workerId)?.name ?? 'Unknown worker'}</strong>{(assignment.startTime || assignment.endTime) && <span>{assignment.startTime || '?'}–{assignment.endTime || '?'}</span>}{assignment.note && <span>{assignment.note}</span>}</div>) : <span>{station.active ? 'Open' : '—'}</span>}</div></td>
            })}
          </tr>)}</tbody>
        </table>
      </div>
      <Paper withBorder p="md" className="schedule-roster dashboard-roster">
        <Stack gap="sm"><Group justify="space-between"><Text fw={700}>Team</Text><Badge color="gray" variant="light">{workers.length}</Badge></Group>
          <div className="roster-list">{workers.map(worker => {
            const count = weekAssignments.filter(assignment => assignment.workerId === worker.id).length
            return <div className="roster-worker dashboard-roster-worker" key={worker.id}><span className="roster-avatar">{worker.name.slice(0, 2).toUpperCase()}</span><span><strong>{worker.name}</strong><small>{worker.status} · {count} {count === 1 ? 'shift' : 'shifts'}</small></span><Badge ml="auto" size="xs" variant="dot" color={statusColors[worker.status]}>{worker.status}</Badge></div>
          })}</div>
        </Stack>
      </Paper>
    </div>
  </Stack>
}

export default WorkerAvailability
