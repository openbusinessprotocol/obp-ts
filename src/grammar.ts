/**
 * OBP Core Grammar — abstract operation vocabulary
 *
 * These types encode the spec-level grammar from OBP v1.0 §4.
 * They are deliberately free of any World Filter assumptions.
 *
 * World Filter implementors use `OBPISADeclaration` to document
 * their IS-A traceability as required by §4 ("IS-A traceability").
 *
 * Package: @obp/core (MIT)
 */

// ── Four Bases ─────────────────────────────────────────────────────────────────

/** The four irreducible primitives of OBP (§2). */
export type OBPBase = 'being' | 'resource' | 'flow' | 'context'

// ── Core operation sets (§4 namespace table) ──────────────────────────────────

/**
 * Operations on being — the Subject (Will).
 * Any World Filter concretization of being must trace to one of these.
 */
export type OBPBeingOperation =
  | 'being.configure'    // construct or modify an environment
  | 'being.reflect'      // evaluate past behavior
  | 'being.coordinate'   // delegate or orchestrate with other beings

/**
 * Operations on resource — the Object (Matter).
 * Describes all states through which resource value changes (§5).
 */
export type OBPResourceOperation =
  | 'resource.holding'   // static possession by a being
  | 'resource.transfer'  // movement between beings
  | 'resource.amplify'   // increase in quantity or quality through flow
  | 'resource.melt'      // consumption or degradation
  | 'resource.expire'    // invalidation by time or external condition

/**
 * Operations on flow — the Process (Time).
 */
export type OBPFlowOperation =
  | 'flow.schedule'      // bind to a time condition
  | 'flow.conditional'   // branch based on a condition
  | 'flow.delegate'      // defer continuation to an external being

/**
 * Operations on context — the Frame (Why/Where).
 */
export type OBPContextOperation =
  | 'context.sense'      // perceive external signals
  | 'context.compile'    // merge multiple context sources into a unified frame
  | 'context.align'      // check consistency with a goal or constraint

/** Union of all OBP core grammar operations. */
export type OBPCoreOperation =
  | OBPBeingOperation
  | OBPResourceOperation
  | OBPFlowOperation
  | OBPContextOperation

// ── IS-A Traceability (§4) ────────────────────────────────────────────────────

/**
 * Conformance declaration for a World Filter operation.
 *
 * Every operation a World Filter exposes must declare which OBP primitive
 * it is semantically traceable to. This satisfies the IS-A requirement
 * from OBP v1.0 §4: "An operation that cannot be traced to an OBP primitive
 * is not OBP-conformant."
 *
 * @example
 * ```ts
 * const SLACK_SEND: OBPISADeclaration = {
 *   worldFilterKey: 'connector.slack.send_message',
 *   obpPrimitive:   'flow.delegate',
 *   isA:            'being',
 *   rationale:      'Slack acts as a being that receives delegation from a workflow step',
 * }
 * ```
 */
export interface OBPISADeclaration {
  /** The World Filter's dot-notation key (§4 single-provider or vendor-grouped form). */
  worldFilterKey: string
  /** The OBP core operation this key is traceable to. */
  obpPrimitive: OBPCoreOperation
  /** The OBP base at the root of the IS-A chain. */
  isA: OBPBase
  /** Human-readable rationale for the mapping. Recommended for non-obvious cases. */
  rationale?: string
}

// ── Humanic Vocabulary (PROP-019, CC0) ───────────────────────────────────────

/**
 * Classifies whether an agent embodies its Human Principal's sovereignty.
 *
 * - `humanic`:     the agent tracks and enacts its owner's will at all times
 * - `non-humanic`: the agent fails to track the owner's will — simulating
 *                  compliance rather than genuinely enacting it
 *
 * This term is released into the public domain under CC0 (PROP-019, 2026-04-21).
 * See: obp-spec/vocabulary/humanic.yaml
 */
export type HumanicClass = 'humanic' | 'non-humanic'

/**
 * The dual position of a human being within OBP (OBP-MASTER-MAP §human の二重性).
 *
 * A human is not simply a user or resource. They simultaneously occupy:
 * - `principal`: L4 Sovereignty — ultimate owner and governor of agents
 * - `being`:     L2 Operation  — participant in workflows like any other being
 *
 * This duality is the theoretical basis for the `HumanicClass` distinction:
 * a humanic agent honors the L4 Principal relationship at all times.
 */
export type HumanDualCitizenship = 'principal' | 'being'

// ── Recursive Flow (§5 extension) ─────────────────────────────────────────────

/**
 * Marks an atom that treats a completed flow as a resource.
 *
 * A flow may itself be treated as a resource in another flow — for example,
 * when a completed workflow run is referenced as input to a subsequent process.
 * In that state the flow transitions from `flow.schedule` (process) to
 * `resource.holding` (artifact).
 *
 * See OBP v1.0 §5 (Immutable Ledger principle) and MAPPING.md for context.
 */
export interface FlowAsResource {
  content: {
    /** The id of the flow (workflow run or atom) treated as a resource. */
    source_flow_id: string
    /**
     * How the flow is consumed in the receiving context.
     * - transfer: the flow record is passed to another being
     * - amplify:  the flow's output increases the value of another resource
     * - melt:     the flow is consumed and no longer available as a resource
     */
    consumption_mode: 'resource.transfer' | 'resource.amplify' | 'resource.melt'
  }
}
