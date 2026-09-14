import type { Worker, WorkerStatus } from '../../types/Worker'
import { Avatar, Badge, Group, Paper, Stack, Text } from '@mantine/core'
interface WorkerCardProps {
    worker :Worker,
    selectedWorker:Worker | null,
    onSelectWorker:(value:Worker)=>void 
}

function WorkerCard({worker,selectedWorker,onSelectWorker}:WorkerCardProps) {
    const isSelected = worker.id === selectedWorker?.id;
    const colors: Record<WorkerStatus, string> = { available: 'green', sick: 'red', holiday: 'orange', inactive: 'gray' };
  return (
    <Paper component="button" type="button" withBorder p="md" radius="md"
    onClick={() => onSelectWorker(worker)}
    bg={isSelected ? 'var(--mantine-color-blue-light)' : undefined}
    style={{ cursor: 'pointer', textAlign: 'left', width: '100%', borderColor: isSelected ? 'var(--mantine-color-blue-6)' : undefined }}>
      <Group wrap="nowrap">
        <Avatar color={colors[worker.status]}>{worker.name.slice(0, 2).toUpperCase()}</Avatar>
        <Stack gap={2} style={{ flex: 1, minWidth: 0 }}>
          <Text fw={600} truncate>{worker.name}</Text>
          <Text size="xs" c="dimmed" truncate>{worker.email}</Text>
        </Stack>
        <Badge color={colors[worker.status]} variant="light">{worker.status}</Badge>
      </Group>
    </Paper>
  )
}

export default WorkerCard
