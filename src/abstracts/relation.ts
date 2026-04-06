import { BaseAtom } from '../atom.js'
import type { RelationType } from '../extensions.js'

/**
 * Era.2 class — not instantiable yet.
 * In Era.1, relations are expressed via the +linkable extension (content.refs[]).
 */
export abstract class RelationAtom extends BaseAtom {
  readonly layer = 'relation' as const

  abstract content: {
    from_id: string
    to_id: string
    relation_type: RelationType
    weight?: number
    [key: string]: unknown
  }
}
