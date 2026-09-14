import { createContext } from 'react'
import type { Worker, NewWorker } from '../types/Worker'
import type { Station, NewStation } from '../types/Station'
import type { Assignment, NewAssignment } from '../types/Assignment'

export interface AppContextValue {
  workers: Worker[]
  stations: Station[]
  assignments: Assignment[]
  createWorker: (worker: NewWorker) => Promise<void>
  updateWorker: (worker: Worker) => Promise<void>
  removeWorker: (worker: Worker) => Promise<void>
  createStation: (station: NewStation) => Promise<void>
  updateStation: (station: Station) => Promise<void>
  removeStation: (station: Station) => Promise<void>
  createAssignment: (assignment: NewAssignment) => Promise<void>
  updateAssignment: (assignment: Assignment) => Promise<void>
  removeAssignment: (assignment: Assignment) => Promise<void>
  monday: Date
  weekDays: { label: string; date: Date }[]
  selectedWeekDate: Date
  setSelectedWeekDate: (date: Date) => void
  loadingWorkers: boolean
  workersError: string | null
  loadingStations: boolean
  stationsError: string | null
  loadingAssignments: boolean
  assignmentsError: string | null
}

export const AppContext = createContext<AppContextValue | null>(null)
