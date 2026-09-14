import Dashboard from "../components/dashboard/Dashboard"
import WorkerAvailability from "../components/workers/WorkerAvailbility"
import { Stack } from '@mantine/core'


function DashBoardPage() {
    
  return (
    <Stack gap="lg" className="page-container">
      <Dashboard/>
      <WorkerAvailability/>
    </Stack>
  )
}

export default DashBoardPage
