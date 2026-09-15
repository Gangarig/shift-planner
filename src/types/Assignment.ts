export interface Assignment { 
    id:string,
    workerId:string,
    stationId:string,
    date:Date,
    note?:string | null,
    source?: 'manual' | 'preferred',
}

export type NewAssignment = Omit<Assignment,"id">

export type Weekdays = { label: string; date: Date }[]
