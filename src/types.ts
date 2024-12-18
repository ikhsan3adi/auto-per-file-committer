export type CustomFileStat = {
  path: string
  name: string
  birthtime: number
  mtime: number
}

export enum CommitOrder {
  BirthAsc,
  BirthDsc,
  MTimeAsc,
  MTimeDsc,
  Random,
  NoDate,
}

export interface CommitOptions {
  dir: string
  order: CommitOrder
  fromDate?: Date
  toDate?: Date
}
