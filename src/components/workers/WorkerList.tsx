import type { Worker } from '../../types/Worker'
import StatusPanel from './StatusPanel'
import { Paper, Stack, Text } from '@mantine/core'
interface WorkerListProps {
    workers : Worker[],
    selectedWorker:Worker |null,
    setSelectedWorker:(value:Worker)=>void | undefined
}

function WorkerList({workers,selectedWorker,setSelectedWorker}:WorkerListProps) {
    const availableWorkers = workers.filter(worker => worker.status === 'available')
    const notAvailableWorkers = workers.filter(worker => worker.status !== 'available')
    
  return (
    <Paper withBorder p="lg">
      <Stack gap="xl">
        <StatusPanel title={'available'} workers={availableWorkers} selectedWorker={selectedWorker} onSelectWorker={setSelectedWorker} />
        <StatusPanel title={'not available'} workers={notAvailableWorkers} selectedWorker={selectedWorker} onSelectWorker={setSelectedWorker} />
        {workers.length === 0 && <Text c="dimmed" ta="center" py="xl">No workers found.</Text>}
      </Stack>
    </Paper>
  )
}

export default WorkerList
