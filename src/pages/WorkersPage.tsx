import useWorker from "../hooks/useWorker"
import { useState } from "react"
import WorkerSort from "../components/workers/WorkerSort"
import WorkerDetail from "../components/workers/WorkerDetail"
import WorkerList from "../components/workers/WorkerList"
import WorkerEdit from "../components/workers/WorkerEdit"
import WorkerForm from "../components/workers/WorkerForm"
import useApp from "../hooks/useApp"
import type { Worker } from "../types/Worker"
import PlannerWeekControls from "../components/planner/PlannerWeekControls"
import Search from "../components/Search"
import { useDisclosure } from '@mantine/hooks';
import { Badge, Box, Button, Group, LoadingOverlay, Modal, Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core';

function WorkersPage() {
  const [search,setSearch]=useState<string>('')
  const [workerSelection,setSelectedWorker] = useState<Worker | null>(null)
  const [createOpened, { open: openCreate, close: closeCreate }] = useDisclosure(false)
  const {
        sortedWorkers,
        setSortOrderWorker,
        sortOrderWorker
  } = useWorker(search)
      const {workers,
          stations,
          assignments,
          createWorker,
          removeWorker,
          updateWorker,
          loadingWorkers,
          workersError
      } = useApp()
  const selectedWorker = workers.find(w => w.id === workerSelection?.id) ?? null
  async function handleUpdateWorker(worker:Worker) {
    return await updateWorker(worker)
  }
  return (
    <Box pos="relative" className="page-container">
          {workersError &&  <Text color="red">Could not load workers</Text>}
          {!workersError && workers.length === 0 && !loadingWorkers && (
            <Text>No workers found</Text>
          )}  
          <LoadingOverlay visible={loadingWorkers} loaderProps={{ children: 'Loading...' }} />
          <Stack gap="lg">
            <Group justify="space-between" align="flex-end">
              <div>
                <Group gap="xs">
                  <Title order={1}>Workers</Title>
                  <Badge variant="light">{workers.length}</Badge>
                </Group>
                <Text c="dimmed">Manage your team, availability, and workload.</Text>
                <Text size="sm" c="dimmed">Availability changes clear assignments only in the week selected below.</Text>
              </div>
              <Button onClick={openCreate}>Add worker</Button>
            </Group>
            <Paper withBorder p="md">
              <PlannerWeekControls />
              <SimpleGrid cols={{ base: 1, sm: 2 }}>
                <Search search={search} onSearch={setSearch}/>
                <WorkerSort sortOrder={sortOrderWorker} onSort={setSortOrderWorker} />
              </SimpleGrid>
            </Paper>
            {workers.length > 0 &&
            <SimpleGrid cols={{ base: 1, md: selectedWorker ? 2 : 1 }} spacing="lg">
              {!workersError && workers.length > 0 && sortedWorkers.length === 0 && (
                <Text>No workers match your search.</Text>
              )} 
              <WorkerList selectedWorker={selectedWorker} setSelectedWorker={setSelectedWorker} workers={sortedWorkers} />
              {selectedWorker && (
                <Stack>
                  <WorkerDetail worker={selectedWorker} setSelectedWorker={setSelectedWorker}
                    onRemoveWorker={removeWorker} onChangeOfStatus={handleUpdateWorker}
                    assignments={assignments} updateWorkerState={handleUpdateWorker} />
                  <WorkerEdit key={JSON.stringify(selectedWorker)} selectedWorker={selectedWorker} stations={stations} onUpdateWorker={updateWorker} />
                </Stack>
              )}
            </SimpleGrid>
            }
          </Stack>
          <Modal opened={createOpened} onClose={closeCreate} title="Add worker" centered>
          <WorkerForm
          workers={workers}
          stations={stations}
          onCreateWorker={async worker => { const ok = await createWorker(worker); if (ok) closeCreate(); return ok }}
          />
          </Modal>
        </Box>
  )
}

export default WorkersPage
