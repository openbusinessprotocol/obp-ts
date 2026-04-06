import { ActivityAtom } from '../abstracts/activity.js'

export type ScheduleStatus = 'scheduled' | 'completed' | 'cancelled'
export type RecurrenceType = 'weekly' | 'monthly' | 'custom' | null

export interface ScheduleContent {
  status: ScheduleStatus
  start_at: string             // ISO8601 datetime, required
  end_at?: string
  due_at?: string              // alias: deadline for this schedule item
  started_at?: string
  completed_at?: string
  parent_id?: string
  recurrence?: RecurrenceType
  recurrence_rule?: string     // RFC 5545 RRULE — internal only, not exposed to UI
  goal_id?: string
  task_id?: string
  participants?: string[]      // user uuids
  [key: string]: unknown
}

export class ScheduleAtom extends ActivityAtom {
  readonly _v = '_v.schedule' as const
  content: ScheduleContent

  constructor(data: ConstructorParameters<typeof ActivityAtom>[0] & { content: ScheduleContent }) {
    super(data)
    this._meta.era = '1'
    this.content = data.content
  }
}
