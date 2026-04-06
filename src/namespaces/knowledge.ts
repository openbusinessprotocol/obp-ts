import { StatementAtom } from '../abstracts/statement.js'

export interface KnowledgeContent {
  status: 'active' | 'superseded' | 'revoked'
  supersedes?: string
  body: string
  confidence?: number          // 0–1
  source_refs?: string[]
  domain_tags?: string[]
  wisdom_candidate?: boolean   // opt-in for shared wisdom (Era.3+)
  expires_at?: string
  [key: string]: unknown
}

export class KnowledgeAtom extends StatementAtom {
  readonly _v = '_v.knowledge' as const
  content: KnowledgeContent

  constructor(data: ConstructorParameters<typeof StatementAtom>[0] & { content: KnowledgeContent }) {
    super(data)
    this._meta.era = '1'
    this.content = data.content
  }
}
