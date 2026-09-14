import React, { useState } from 'react'
import type { Station, NewStation } from '../../types/Station'
import { Button, SegmentedControl, Stack, TextInput } from '@mantine/core'
interface StationFormProps {
    stations: Station[],
    onCreateStation:(value:NewStation)=>void
}


function StationForm({onCreateStation}:StationFormProps) {
    const [stationsName,setStationName]=useState<string>('');
    const [stationStatus,setStationStatus]=useState<boolean>(true)

    function handleSubmit (e:React.FormEvent) {
        e.preventDefault()
        if(stationsName === '') return null

        const newStation :NewStation = {
            name:stationsName,
            active:stationStatus 
        }
        setStationName('')
        setStationStatus(true)
        onCreateStation(newStation);
    }

  return (
    <form onSubmit={handleSubmit}>
      <Stack>
        <TextInput required label="Station name" value={stationsName} onChange={(e) => setStationName(e.currentTarget.value)} />
        <SegmentedControl fullWidth value={stationStatus ? 'active' : 'inactive'}
          onChange={(value) => setStationStatus(value === 'active')}
          data={[{ label: 'Active', value: 'active' }, { label: 'Inactive', value: 'inactive' }]} />
        <Button type="submit">Create station</Button>
      </Stack>
    </form>
  )
}

export default StationForm
