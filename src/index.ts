// Grammar (pure OBP abstract operation vocabulary — implementation-agnostic)
export type {
  OBPBase,
  OBPBeingOperation,
  OBPResourceOperation,
  OBPFlowOperation,
  OBPContextOperation,
  OBPCoreOperation,
  OBPISADeclaration,
  FlowAsResource,
} from './grammar.js'

// Base
export { BaseAtom, VECTOR_DIMENSION, OBP_NAMESPACES } from './atom.js'
export type { OBPLayerType, OBPNamespaceValue, OBPMeta, OBPSource, VectorSlots } from './atom.js'

// Extensions
export type {
  RelationType, AtomRef,
  Vectorizable, MultiVector,
  Versioned, Temporal, Hierarchical,
  Identifiable, Linkable,
  OBPNamespace, ConcreteNamespace,
  GoalNamespace, DecisionNamespace, KnowledgeNamespace,
  NoteNamespace, TaskNamespace, ScheduleNamespace,
} from './extensions.js'

// Abstract classes
export { StatementAtom } from './abstracts/statement.js'
export type { StatementStatus } from './abstracts/statement.js'
export { SubjectAtom } from './abstracts/subject.js'
export { CaptureAtom } from './abstracts/capture.js'
export type { ElevationStatus, ElevationTarget } from './abstracts/capture.js'
export { ActivityAtom } from './abstracts/activity.js'
export type { ActivityStatus } from './abstracts/activity.js'
export { RelationAtom } from './abstracts/relation.js'

// Concrete namespaces
export { GoalAtom } from './namespaces/goal.js'
export type { GoalContent, GoalStatus, GoalScope } from './namespaces/goal.js'
export { DecisionAtom } from './namespaces/decision.js'
export type { DecisionContent, DecisionStatus } from './namespaces/decision.js'
export { KnowledgeAtom } from './namespaces/knowledge.js'
export type { KnowledgeContent } from './namespaces/knowledge.js'
export { NoteAtom } from './namespaces/note.js'
export type { NoteContent } from './namespaces/note.js'
export { TaskAtom } from './namespaces/task.js'
export type { TaskContent, TaskPriority } from './namespaces/task.js'
export { ScheduleAtom } from './namespaces/schedule.js'
export type { ScheduleContent, ScheduleStatus } from './namespaces/schedule.js'

// Alignment calculator
export {
  cosineSimilarity,
  measureAlignment,
  computeIntensity,
  rankStatements,
  DEFAULT_ALIGNMENT_THRESHOLD,
} from './alignment-calculator.js'
export type { AlignmentResult, RankedStatement } from './alignment-calculator.js'

// Tool Keys (canonical OBP tool key taxonomy — Step Type = Tool Key)
export {
  OBP_TOOL_KEYS,
  OBP_TOOL_META,
  getToolMeta,
  getToolKeysByCategory,
  getGaToolKeys,
} from './tool-keys.js'
export type {
  OBPToolKey,
  OBPToolCategory,
  OBPToolMeta,
  OBPToolExecution,
  OBPToolRisk,
  OBPToolType,
  OBPToolPhase,
  OBPDataToolKey,
  OBPAiToolKey,
  OBPNotifyToolKey,
  OBPWebToolKey,
  OBPFlowToolKey,
  OBPAgentToolKey,
  OBPMemoryToolKey,
  OBPConnectorToolKey,
  OBPSocialToolKey,
  OBPMediaToolKey,
  OBPImportToolKey,
  OBPWorkspaceToolKey,
  OBPBuilderToolKey,
  OBPOrchestratorToolKey,
  OBPContextToolKey,
} from './tool-keys.js'

// Canvas Layout (Auto Layout — no DnD)
export {
  LAYOUT_PRESETS,
  createLayout,
} from './canvas-layout.js'
export type {
  LayoutTrigger,
  LayoutPreset,
  ZoomLevel,
  SlotComponent,
  CanvasSlot,
  CanvasLayout,
} from './canvas-layout.js'
