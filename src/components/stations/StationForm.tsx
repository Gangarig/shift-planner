import React, { useState } from 'react'
import type { Station, NewStation } from '../../types/Station'
import { Button, SegmentedControl, Stack, TextInput } from '@mantine/core'
interface StationFormProps {
    stations: Station[],
    onCreateStation:(value:NewStation)=>Promise<boolean>
}


function StationForm({onCreateStation}:StationFormProps) {
    const [saving,setSaving]=useState(false)
    const [stationsName,setStationName]=useState<string>('');
    const [stationStatus,setStationStatus]=useState<boolean>(true)

    async function handleSubmit (e:React.FormEvent) {
        e.preventDefault()
        if(!stationsName.trim()) return null

        const newStation :NewStation = {
            name:stationsName.trim(),
            active:stationStatus 
        }
        if (saving) return
        setSaving(true)
        const saved = await onCreateStation(newStation)
        setSaving(false)
        if (!saved) return
        setStationName('')
        setStationStatus(true)

    }

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput required label="Station name" value={stationsName} onChange={(e) => setStationName(e.currentTarget.value)} />
        <SegmentedControl fullWidth value={stationStatus ? 'active' : 'inactive'}
          onChange={(value) => setStationStatus(value === 'active')}
          data={[{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }]} />
        <Button type="submit" loading={saving}>Create station</Button>
      </Stack>
    </form>
  )
}

export default StationForm
