import { StatementAtom } from '../abstracts/statement.js'

export type GoalStatus = 'active' | 'achieved' | 'failed' | 'paused'
export type GoalScope = 'workspace' | 'project'

export interface GoalContent {
  status: GoalStatus
  supersedes?: string
  due_at: string               // ISO8601 date, required
  scope: GoalScope
  target_metric?: string
  progress_pct?: number        // 0–100, updated by agents
  parent_goal_id?: string      // +hierarchical (self-reference)
  [key: string]: unknown
}

export class GoalAtom extends StatementAtom {
  readonly _v = '_v.goal' as const
  content: GoalContent

  constructor(data: ConstructorParameters<typeof StatementAtom>[0] & { content: GoalContent }) {
    super(data)
    this._meta.era = '1'
    this.content = data.content
  }
}
