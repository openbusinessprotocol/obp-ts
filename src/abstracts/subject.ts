import { BaseAtom } from '../atom.js'
import type { Identifiable } from '../extensions.js'

export abstract class SubjectAtom extends BaseAtom implements Identifiable {
  readonly layer = 'subject' as const
  abstract content: {
    display_name: string
    active: boolean
    external_refs?: Record<string, string>
    [key: string]: unknown
  }
}
