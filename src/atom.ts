// ── OBP Layer type (mirrored from @flapbase/base-definition to keep this pkg dep-free) ──

/** Abstract layer type of an OBP atom — maps to the 4+1 class hierarchy */
export type OBPLayerType =
  | 'statement'  // Why  — goals, decisions, axioms
  | 'subject'    // Who  — people, orgs, agents, places
  | 'capture'    // What — notes, drafts, artifacts
  | 'activity'   // How/When — tasks, schedules, events
  | 'relation'   // +1   — causal links, dependencies (Era.2)

/**
 * OBP namespace prefix constants.
 * All atom namespaces begin with `_v.` (virtual namespace).
 * Mirrored in @flapbase/base-definition/src/obp-layer.ts — keep in sync.
 */
export const OBP_NAMESPACES = {
  ATOM:       '_v.atom',
  SYS:        '_v.sys',
  STATEMENT:  '_v.statement',
  SUBJECT:    '_v.subject',
  CAPTURE:    '_v.capture',
  ACTIVITY:   '_v.activity',
  RELATION:   '_v.relation',
  GOAL:       '_v.goal',
  DECISION:   '_v.decision',
  KNOWLEDGE:  '_v.knowledge',
  NOTE:       '_v.note',
  TASK:       '_v.task',
  SCHEDULE:   '_v.schedule',
} as const

export type OBPNamespaceValue = (typeof OBP_NAMESPACES)[keyof typeof OBP_NAMESPACES]

// ── Vector dimensions ────────────────────────────────────────────────────────

export const VECTOR_DIMENSION = 1536 as const

/**
 * Opt-in vector slots (v2 schema — flat number[] for JSON transport).
 *
 * Upgrade path from v1 Float32Array slots:
 *   v_intent → v_semantic  (primary; renamed to reflect semantic search purpose)
 *   v_style  → v_style     (unchanged)
 *   v_intent (new) — intentional alignment vector (statement atoms)
 *   v_sentiment, v_fact    — removed in v2; use v_semantic + _meta tags instead
 */
export interface VectorSlots {
  /** Primary semantic vector — what the atom means. Used for similarity search. */
  v_semantic?: number[]
  /** Intentional layer — why/what-for. Set on statement atoms for alignment scoring. */
  v_intent?: number[]
  /** Style/tone vector — how it is expressed. Set when +multi-vector trait is declared. */
  v_style?: number[]
}

// ── Provenance ───────────────────────────────────────────────────────────────

export type OBPSource = 'human' | 'agent' | 'import'

export interface OBPMeta {
  era: string
  created_at: string     // ISO8601, immutable
  updated_at: string
  creator_id: string     // uuid, immutable
  source: OBPSource
  v_version: string      // e.g. "2.0"
  tags?: string[]
}

// ── BaseAtom ─────────────────────────────────────────────────────────────────

export abstract class BaseAtom {
  abstract readonly _v: string          // namespace, e.g. "_v.goal"
  abstract readonly layer: OBPLayerType // 4+1 layer this atom belongs to

  readonly id: string                   // uuid, immutable
  readonly workspace_id: string         // sovereignty anchor, immutable
  project_id?: string
  title: string
  description?: string
  abstract content: Record<string, unknown>
  readonly _meta: OBPMeta

  // Opt-in vector slots (undefined if trait not declared on the subclass)
  v_semantic?: number[]
  v_intent?: number[]
  v_style?: number[]

  constructor(data: {
    id?: string
    workspace_id: string
    project_id?: string
    title: string
    description?: string
    _meta?: Partial<OBPMeta>
  }) {
    this.id = data.id ?? crypto.randomUUID()
    this.workspace_id = data.workspace_id
    this.project_id = data.project_id
    this.title = data.title
    this.description = data.description
    this._meta = {
      era: '1',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      creator_id: '',
      source: 'human',
      v_version: '2.0',
      ...data._meta,
    }
  }
}
