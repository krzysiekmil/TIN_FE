export interface Event {
  id: number,
  title: string,
  description: string,
  startDateTime: Date,
  endDateTime: Date,
  host: string,
  hostId: string,
  owner: boolean,
  members: EventMember[]
}
export interface EventMember{
  attendingStatus: string,
  user: string,
  userId: number
}
