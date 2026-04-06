import { ActivityAtom } from '../abstracts/activity.js'

export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface TaskContent {
  status: 'open' | 'in_progress' | 'done' | 'cancelled'
  assignee_id?: string
  due_at?: string
  started_at?: string
  completed_at?: string
  parent_id?: string           // subtask
  priority?: TaskPriority
  goal_id?: string
  decision_id?: string         // decision that spawned this task
  estimated_minutes?: number
  [key: string]: unknown
}

export class TaskAtom extends ActivityAtom {
  readonly _v = '_v.task' as const
  content: TaskContent

  constructor(data: ConstructorParameters<typeof ActivityAtom>[0] & { content: TaskContent }) {
    super(data)
    this._meta.era = '1'
    this.content = data.content
  }
}
