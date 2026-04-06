export type RelationType = 'REFERENCES' | 'PRODUCES' | 'SUPERSEDES' | 'IS-A' | 'VIEWS-AS'

export interface AtomRef {
  id: string
  type: RelationType
  weight?: number       // 0–1, for Era.2 relation vectors
}

// +vectorizable — primary semantic search vector (required before persistence)
export interface Vectorizable {
  v_semantic: number[]
}

// +multi-vector (extends vectorizable) — intentional + stylistic layers
export interface MultiVector {
  v_intent?: number[]   // intentional alignment — required for statement atoms
  v_style?: number[]    // tone / manner — set when stylistic search is needed
}

// +versioned
export interface Versioned {
  content: { supersedes?: string }
}

// +temporal
export interface Temporal {
  content: {
    due_at?: string
    started_at?: string
    completed_at?: string
  }
}

// +hierarchical
export interface Hierarchical {
  content: { parent_id?: string }
}

// +identifiable (for subjects)
export interface Identifiable {
  content: {
    display_name: string
    active: boolean
    external_refs?: Record<string, string>
  }
}

// +linkable (Era.1 relation mechanism — typed links on any atom)
export interface Linkable {
  content: { refs?: AtomRef[] }
}

// ── Namespace string literals ──

export type AtomNamespace = '_v.atom'
export type StatementNamespace = '_v.statement'
export type SubjectNamespace = '_v.subject'
export type CaptureNamespace = '_v.capture'
export type ActivityNamespace = '_v.activity'
export type RelationNamespace = '_v.relation'

export type GoalNamespace = '_v.goal'
export type DecisionNamespace = '_v.decision'
export type KnowledgeNamespace = '_v.knowledge'
export type NoteNamespace = '_v.note'
export type TaskNamespace = '_v.task'
export type ScheduleNamespace = '_v.schedule'

/** All Era.1 concrete namespaces */
export type ConcreteNamespace =
  | GoalNamespace
  | DecisionNamespace
  | KnowledgeNamespace
  | NoteNamespace
  | TaskNamespace
  | ScheduleNamespace

/** All known OBP namespaces (abstract + concrete) */
export type OBPNamespace =
  | AtomNamespace
  | StatementNamespace
  | SubjectNamespace
  | CaptureNamespace
  | ActivityNamespace
  | RelationNamespace
  | ConcreteNamespace
