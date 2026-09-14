import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { notifications } from '@mantine/notifications'
import { AppContext } from './AppContext'
import type { Worker, NewWorker } from '../types/Worker'
import type { Assignment, NewAssignment } from '../types/Assignment'
import type { Station, NewStation } from '../types/Station'
import { createWorker, updateWorker, removeWorker, loadWorkers } from '../services/workerService'
import { loadStations, createStation, updateStation, removeStation } from '../services/stationService'
import { loadAssignments, createAssignment, updateAssignment, removeAssignment } from '../services/assignmentService'
import { getMondayOfWeek, getWeekDays, toDateKey } from '../lib/dateUtils'

function AppProvider() {
  const [workers, setWorkers] = useState<Worker[]>([])
  const [stations, setStations] = useState<Station[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loadingWorkers, setLoadingWorkers] = useState(false)
  const [loadingStations, setLoadingStations] = useState(false)
  const [loadingAssignments, setLoadingAssignments] = useState(false)
  const [workersError, setWorkersError] = useState<string | null>(null)
  const [stationsError, setStationsError] = useState<string | null>(null)
  const [assignmentsError, setAssignmentsError] = useState<string | null>(null)
  const [selectedWeekDate, setSelectedWeekDate] = useState(new Date())
  const monday = getMondayOfWeek(selectedWeekDate)
  const weekDays = getWeekDays(monday)

  useEffect(() => {
    void Promise.all([refreshWorkers(), refreshStations(), refreshAssignments()])
  }, [])

  async function refreshWorkers() {
    try {
      setLoadingWorkers(true); setWorkersError(null)
      setWorkers(await loadWorkers())
    } catch {
      setWorkersError('Could not load workers')
      notifications.show({ color: 'red', title: 'Worker loading failed', message: 'The workers could not be loaded' })
    } finally { setLoadingWorkers(false) }
  }

  async function refreshStations() {
    try {
      setLoadingStations(true); setStationsError(null)
      setStations(await loadStations())
    } catch {
      setStationsError('Could not load stations')
      notifications.show({ color: 'red', title: 'Station loading failed', message: 'The stations could not be loaded' })
    } finally { setLoadingStations(false) }
  }

  async function refreshAssignments() {
    try {
      setLoadingAssignments(true); setAssignmentsError(null)
      setAssignments(await loadAssignments())
    } catch {
      setAssignmentsError('Could not load assignments')
      notifications.show({ color: 'red', title: 'Assignment loading failed', message: 'The assignments could not be loaded' })
    } finally { setLoadingAssignments(false) }
  }

  async function handleCreateAssignment(assignment: NewAssignment) {
    try {
      setAssignmentsError(null)
      await createAssignment(assignment)
      notifications.show({ color: 'green', title: 'Assignment created', message: 'The assignment was saved' })
      await refreshAssignments()
    } catch {
      setAssignmentsError('Could not create assignment')
      notifications.show({ color: 'red', title: 'Assignment failed', message: 'The assignment could not be saved' })
    }
  }

  async function handleUpdateAssignment(assignment: Assignment) {
    try {
      setAssignmentsError(null)
      await updateAssignment(assignment)
      notifications.show({ color: 'green', title: 'Assignment updated', message: 'The assignment was saved' })
      await refreshAssignments()
    } catch {
      setAssignmentsError('Could not update assignment')
      notifications.show({ color: 'red', title: 'Assignment failed', message: 'The assignment could not be updated' })
    }
  }

  async function handleRemoveAssignment(assignment: Assignment) {
    try {
      setAssignmentsError(null)
      await removeAssignment(assignment)
      notifications.show({ color: 'green', title: 'Assignment removed', message: 'The shift is now unassigned' })
      await refreshAssignments()
    } catch {
      setAssignmentsError('Could not remove assignment')
      notifications.show({ color: 'red', title: 'Assignment failed', message: 'The assignment could not be removed' })
    }
  }

  async function handleCreateStation(station: NewStation) {
    try { await createStation(station); await refreshStations(); notifications.show({ color: 'green', title: 'Station created', message: 'The station was added' }) }
    catch { setStationsError('Could not create station'); notifications.show({ color: 'red', title: 'Station failed', message: 'The station could not be added' }) }
  }

  async function handleUpdateStation(station: Station) {
    try { await updateStation(station); await refreshStations(); notifications.show({ color: 'green', title: 'Station updated', message: 'The station was saved' }) }
    catch { setStationsError('Could not update station'); notifications.show({ color: 'red', title: 'Station failed', message: 'The station could not be updated' }) }
  }

  async function handleRemoveStation(station: Station) {
    if (assignments.some((assignment) => assignment.stationId === station.id)) {
      setStationsError('Station has assignments')
      notifications.show({ color: 'red', title: 'Station cannot be deleted', message: 'Remove its assignments first' })
      return
    }
    try { await removeStation(station); await refreshStations(); notifications.show({ color: 'green', title: 'Station deleted', message: 'The station was removed' }) }
    catch { setStationsError('Could not remove station'); notifications.show({ color: 'red', title: 'Station failed', message: 'The station could not be deleted' }) }
  }

  async function handleCreateWorker(worker: NewWorker) {
    try { await createWorker(worker); await refreshWorkers(); notifications.show({ color: 'green', title: 'Worker created', message: 'The worker was added' }) }
    catch { setWorkersError('Could not create worker'); notifications.show({ color: 'red', title: 'Worker failed', message: 'The worker could not be added' }) }
  }

  async function handleUpdateWorker(worker: Worker) {
    const selectedWeek = new Set(weekDays.map((day) => toDateKey(day.date)))
    const workerAssignments = worker.status === 'available' ? [] : assignments.filter((assignment) => assignment.workerId === worker.id && selectedWeek.has(toDateKey(assignment.date)))
    try {
      setWorkersError(null)
      if (workerAssignments.length) await Promise.all(workerAssignments.map(removeAssignment))
      await updateWorker(worker)
      await Promise.all([refreshWorkers(), refreshAssignments()])
      notifications.show({
        color: 'green',
        title: 'Worker updated',
        message: workerAssignments.length ? `${workerAssignments.length} assignment(s) removed from this week because ${worker.name} is ${worker.status}` : 'The worker was saved',
      })
    } catch {
      setWorkersError('Could not update worker')
      notifications.show({ color: 'red', title: 'Worker update failed', message: 'The worker status could not be saved' })
    }
  }

  async function handleRemoveWorker(worker: Worker) {
    if (assignments.some((assignment) => assignment.workerId === worker.id)) {
      setWorkersError('Worker has assignments')
      notifications.show({ color: 'red', title: 'Worker cannot be deleted', message: 'Remove their assignments first' })
      return
    }
    try { await removeWorker(worker); await refreshWorkers(); notifications.show({ color: 'green', title: 'Worker deleted', message: 'The worker was removed' }) }
    catch { setWorkersError('Could not delete worker'); notifications.show({ color: 'red', title: 'Worker failed', message: 'The worker could not be deleted' }) }
  }

  return <AppContext.Provider value={{ workers, stations, assignments, createWorker: handleCreateWorker, updateWorker: handleUpdateWorker, removeWorker: handleRemoveWorker, createStation: handleCreateStation, updateStation: handleUpdateStation, removeStation: handleRemoveStation, createAssignment: handleCreateAssignment, updateAssignment: handleUpdateAssignment, removeAssignment: handleRemoveAssignment, monday, weekDays, selectedWeekDate, setSelectedWeekDate, loadingWorkers, workersError, loadingStations, stationsError, loadingAssignments, assignmentsError }}><Outlet /></AppContext.Provider>
}

export default AppProvider
