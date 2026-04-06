import { StatementAtom } from '../abstracts/statement.js'

export type DecisionStatus = 'active' | 'under_review' | 'superseded' | 'revoked'

export interface DecisionContent {
  status: DecisionStatus
  supersedes?: string
  decided_at: string           // ISO8601, immutable after creation
  decided_by: string[]         // user or agent uuids, immutable
  decision_body: string        // the actual decision text
  rationale?: string
  goal_id?: string
  source_refs?: string[]       // uuid[] of notes/discussions that led here
  impact_scope?: string[]      // namespaces affected
  [key: string]: unknown
}

export class DecisionAtom extends StatementAtom {
  readonly _v = '_v.decision' as const
  content: DecisionContent

  constructor(data: ConstructorParameters<typeof StatementAtom>[0] & { content: DecisionContent }) {
    super(data)
    this._meta.era = '1'
    this.content = data.content
  }
}
