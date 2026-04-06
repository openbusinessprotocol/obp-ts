import { BaseAtom } from '../atom.js'
import type { Vectorizable, Versioned } from '../extensions.js'

export type StatementStatus = 'active' | 'superseded' | 'revoked'

export abstract class StatementAtom extends BaseAtom implements Vectorizable, Versioned {
  readonly layer = 'statement' as const

  declare v_semantic: number[]   // required — must be set before persistence

  abstract content: {
    supersedes?: string
    [key: string]: unknown
  }
}
