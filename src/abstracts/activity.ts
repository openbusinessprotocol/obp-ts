import { BaseAtom } from '../atom.js'
import type { Temporal, Hierarchical } from '../extensions.js'

export type ActivityStatus = 'open' | 'in_progress' | 'done' | 'cancelled'

export abstract class ActivityAtom extends BaseAtom implements Temporal, Hierarchical {
  readonly layer = 'activity' as const

  abstract content: {
    assignee_id?: string     // user uuid OR agent uuid
    due_at?: string
    started_at?: string
    completed_at?: string
    parent_id?: string       // subtask / sub-schedule
    [key: string]: unknown
  }
}
