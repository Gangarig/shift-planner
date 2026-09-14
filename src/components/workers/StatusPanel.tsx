import type { Worker } from '../../types/Worker'
import WorkerCard from './WorkerCard'
import { SimpleGrid, Stack, Text } from '@mantine/core'
interface StatusPanelProps {
    title:'available' | 'not available'
    workers:Worker [],
    selectedWorker:Worker |null,
    onSelectWorker : (value:Worker) => void
}
function StatusPanel({title,workers,selectedWorker,onSelectWorker}:StatusPanelProps) {
  return (
    <Stack gap="sm">
        <Text fw={700} tt="capitalize">{title} ({workers.length})</Text>
        <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }}>
        {workers.map(worker => <WorkerCard 
        key={worker.id}
        worker={worker} 
        selectedWorker={selectedWorker} 
        onSelectWorker={onSelectWorker} />)}
        </SimpleGrid>
    </Stack>
  )
}

export default StatusPanel
