import React, { useState } from 'react'
import { Button, Select, Stack, TextInput } from '@mantine/core'
import type { NewWorker, Worker, WorkerStatus } from '../../types/Worker'

interface WorkerFormProps { workers: Worker[]; onCreateWorker: (value: NewWorker) => void }
function WorkerForm({ onCreateWorker }: WorkerFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState<NewWorker['role']>('worker')
  const [status, setStatus] = useState<WorkerStatus>('available')
  function handleSubmit(event: React.FormEvent) { event.preventDefault(); if (!name || !email) return; onCreateWorker({ name, email, role, status }); setName(''); setEmail(''); setRole('worker'); setStatus('available') }
  return <form onSubmit={handleSubmit}><Stack><TextInput required label="Name" value={name} onChange={(event) => setName(event.currentTarget.value)} placeholder="Worker name" /><TextInput required type="email" label="Email" value={email} onChange={(event) => setEmail(event.currentTarget.value)} placeholder="name@company.com" /><Select required label="Role" value={role} data={['worker', 'manager', 'admin', 'accountant', 'owner']} onChange={(value) => setRole((value ?? 'worker') as NewWorker['role'])} /><Select required label="Status" value={status} data={['available', 'sick', 'holiday', 'inactive']} onChange={(value) => setStatus((value ?? 'available') as WorkerStatus)} /><Button type="submit">Create worker</Button></Stack></form>
}
export default WorkerForm
