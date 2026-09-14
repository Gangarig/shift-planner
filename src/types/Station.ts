export interface Station {
    id:string,
    name:string,
    active:boolean,
}

export type NewStation = Omit<Station, "id">;