import { supabase } from '../lib/supabase'
import { toDateKey } from '../lib/dateUtils'
import type { Assignment, NewAssignment } from '../types/Assignment'

function toDatabaseAssignment(assignment: Assignment | NewAssignment) {
  return { ...assignment, date: toDateKey(assignment.date) }
}

function toAssignment(record: Assignment) {
  return { ...record, date: new Date(`${record.date}T00:00:00`) }
}

export async function createAssignment(newAssignment: NewAssignment) {
  const { error } = await supabase.from('assignments').insert(toDatabaseAssignment(newAssignment)).select().single()
  if (error) throw error
}

export async function removeAssignment(assignment: Assignment) {
  const { error } = await supabase.from('assignments').delete().eq('id', assignment.id)
  if (error) throw error
}

export async function updateAssignment(assignment: Assignment) {
  const { error } = await supabase.from('assignments').update(toDatabaseAssignment(assignment)).eq('id', assignment.id)
  if (error) throw error
}

export async function loadAssignments() {
  const { data, error } = await supabase.from('assignments').select('*')
  if (error) throw error
  return (data ?? []).map((record) => toAssignment(record as Assignment))
}
