import { useState } from 'react'
import { Box, Button, Grid, Group, LoadingOverlay, Modal, Stack, Text, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import AssignmentDetail from '../components/planner/AssignmentDetail'
import PlannerGrid from '../components/planner/PlannerGrid'
import AssignmentControls from '../components/planner/AssignmentControls'
import PlannerWorkerList from '../components/planner/PlannerWorkerList'
import type { Assignment } from '../types/Assignment'
import useApp from '../hooks/useApp'

function PlannerPage() {
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null)
  const [createOpened, { open: openCreate, close: closeCreate }] = useDisclosure(false)
  const { workers, stations, assignments, createAssignment, updateAssignment, removeAssignment, loadingAssignments, assignmentsError, weekDays } = useApp()

  return <Box pos="relative" className="page-container">
    <LoadingOverlay visible={loadingAssignments} loaderProps={{ children: 'Loading...' }} />
    <Stack gap="lg">
      <Group justify="space-between" align="flex-end"><div><Title order={1}>Weekly planner</Title><Text c="dimmed">Drag an available worker onto an empty shift cell.</Text></div><Button onClick={openCreate}>New assignment</Button></Group>
      {assignmentsError && <Text c="red">Could not load assignments.</Text>}
      <Modal opened={createOpened} onClose={closeCreate} title="New assignment" size="sm" centered><AssignmentControls assignments={assignments} onCreateAssignment={createAssignment} onCreated={closeCreate} workers={workers} stations={stations} weekDays={weekDays} /></Modal>
      {selectedAssignment && <AssignmentDetail key={selectedAssignment.id} assignment={selectedAssignment} onEditAssignmentNote={updateAssignment} workers={workers} stations={stations} onClose={() => setSelectedAssignment(null)} />}
      <Grid align="flex-start" gap="lg"><Grid.Col span={{ base: 12, lg: 9 }}><PlannerGrid stations={stations} workers={workers} assignments={assignments} onCreateAssignment={createAssignment} onUpdateAssignment={updateAssignment} onRemoveAssignment={removeAssignment} onSelectAssignment={setSelectedAssignment} weekDays={weekDays} /></Grid.Col><Grid.Col span={{ base: 12, lg: 3 }}><PlannerWorkerList workers={workers} assignments={assignments} /></Grid.Col></Grid>
    </Stack>
  </Box>
}

export default PlannerPage
