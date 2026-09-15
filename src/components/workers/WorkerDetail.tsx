import type { Worker, WorkerStatus } from '../../types/Worker'
import type { Assignment } from '../../types/Assignment'
import { useState } from 'react'
import { Badge, Button, Divider, Group, NumberInput, Paper, Select, SimpleGrid, Stack, Text, Title } from '@mantine/core'

interface WorkerDetailProps {
  worker: Worker | null
  onRemoveWorker: (value: Worker) => void
  setSelectedWorker: (value: Worker | null) => void
  onChangeOfStatus: (value: Worker) => void
  assignments: Assignment[]
  updateWorkerState: (value: Worker) => void
}

function WorkerDetail({ worker, onRemoveWorker, setSelectedWorker, assignments, onChangeOfStatus, updateWorkerState }: WorkerDetailProps) {
  const [vacationDays, setVacationDays] = useState('')
  const [plusHours, setPlusHours] = useState('')
  if (!worker) return null
  const currentWorker = worker
  function updateNumber(field: 'vacationDays' | 'plusHours', amountText: string, operation: 'add' | 'remove') {
    const amount = Number(amountText)
    if (!amount || amount < 0) return
    const next = (currentWorker[field] ?? 0) + (operation === 'add' ? amount : -amount)
    if (field === 'vacationDays' && next < 0) return
    updateWorkerState({ ...currentWorker, [field]: next })
  }
  const assignmentCount = assignments.filter((assignment) => assignment.workerId === worker.id).length
  return <Paper withBorder p="lg"><Stack>
    <Group justify="space-between"><div><Title order={3}>{worker.name}</Title><Text size="sm" c="dimmed">{worker.email}</Text></div><Badge variant="light">{worker.role}</Badge></Group>
    <Select label="Availability" value={worker.status} data={['available', 'late', 'sick', 'holiday', 'inactive']} onChange={(value) => onChangeOfStatus({ ...worker, status: (value ?? 'available') as WorkerStatus })} />
    {!['available', 'late'].includes(worker.status) && <Text size="sm" c="orange">Changing this worker to unavailable removes their assignments from the selected week.</Text>}
    <SimpleGrid cols={3}><div><Text size="xs" c="dimmed">Assignments</Text><Text fw={700}>{assignmentCount}</Text></div><div><Text size="xs" c="dimmed">Vacation days</Text><Text fw={700}>{worker.vacationDays ?? 0}</Text></div><div><Text size="xs" c="dimmed">Overtime</Text><Text fw={700}>{worker.plusHours ?? 0}h</Text></div></SimpleGrid>
    <Divider />
    <NumberInput label="Adjust vacation days" min={1} value={vacationDays} onChange={(value) => setVacationDays(String(value))} /><Group grow><Button variant="light" onClick={() => updateNumber('vacationDays', vacationDays, 'add')}>Add</Button><Button variant="light" color="gray" onClick={() => updateNumber('vacationDays', vacationDays, 'remove')}>Remove</Button></Group>
    <NumberInput label="Adjust overtime hours" min={1} value={plusHours} onChange={(value) => setPlusHours(String(value))} /><Group grow><Button variant="light" onClick={() => updateNumber('plusHours', plusHours, 'add')}>Add</Button><Button variant="light" color="gray" onClick={() => updateNumber('plusHours', plusHours, 'remove')}>Remove</Button></Group>
    <Divider /><Group justify="space-between"><Button color="red" variant="subtle" onClick={() => void onRemoveWorker(worker)}>Delete worker</Button><Button variant="default" onClick={() => setSelectedWorker(null)}>Close</Button></Group>
  </Stack></Paper>
}

export default WorkerDetail
