import Dashboard from "../components/dashboard/Dashboard"
import WorkerAvailability from "../components/workers/WorkerAvailbility"
import { Stack } from '@mantine/core'


function DashBoardPage() {
    
  return (
    <Stack gap="sm" className="page-container dashboard-page">
      <Dashboard/>
      <WorkerAvailability/>
    </Stack>
  )
}

export default DashBoardPage
