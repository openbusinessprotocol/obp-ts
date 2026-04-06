/**
 * OBP Canvas Layout — Auto Layout types for the Command Canvas.
 *
 * Design principles:
 *   - DnD is intentionally absent. Layout is triggered by context/agent/chat/button.
 *   - Slots map to OBP layer types, not arbitrary UI components.
 *   - Layout presets are declarative; the renderer handles actual positioning.
 *
 * SSOT: .bypas/specs/virtual-app-db-agent/ADAPTIVE-AGENT-SYSTEM.md
 */

import type { OBPLayerType } from './atom.js'

// ── Trigger ───────────────────────────────────────────────────────────────────

/**
 * What caused the layout to change.
 * - `context`  — workspace context update (goal/project switch)
 * - `agent`    — primary agent proposed a new layout
 * - `chat`     — user described intent in the chat panel
 * - `button`   — user pressed a preset layout button explicitly
 */
export type LayoutTrigger = 'context' | 'agent' | 'chat' | 'button'

// ── Presets ───────────────────────────────────────────────────────────────────

/**
 * Named layout presets.
 * - `single`   — one full-width slot
 * - `split2`   — two equal columns
 * - `split1x3` — one wide + three narrow (1:3 ratio)
 * - `quadrant` — 2×2 grid
 */
export type LayoutPreset = 'single' | 'split2' | 'split1x3' | 'quadrant'

// ── Zoom ─────────────────────────────────────────────────────────────────────

/**
 * Semantic zoom level of a slot.
 * - `micro`  — individual atoms (card view)
 * - `middle` — list / kanban (group view)
 * - `macro`  — summary / metrics (aggregate view)
 * - `world`  — cross-workspace / timeline (ecosystem view)
 */
export type ZoomLevel = 'micro' | 'middle' | 'macro' | 'world'

// ── Slot component ────────────────────────────────────────────────────────────

/**
 * Component type rendered inside a slot.
 * Maps to OBP layer or special panel types.
 * - `capture`  — maps to OBP capture layer (_v.capture.*)
 * - `activity` — maps to OBP activity layer (_v.activity.*)
 * - `agent`    — primary agent chat / briefing panel
 * - `council`  — multi-agent decision panel (Era.2+)
 */
export type SlotComponent = 'capture' | 'activity' | 'agent' | 'council'

// ── Slot ──────────────────────────────────────────────────────────────────────

export interface CanvasSlot {
  /** Stable identifier for this slot (used for keyed rendering) */
  id: string
  /** Component type to render */
  component: SlotComponent
  /** Semantic zoom level */
  zoomLevel: ZoomLevel
  /** Optional OBP namespace filter — narrows what atoms this slot renders */
  namespace?: string
  /** OBP layer filter (coarser than namespace) */
  layer?: OBPLayerType
  /** If true, this slot is pinned and won't be reordered by auto layout */
  pinned?: boolean
}

// ── Layout ────────────────────────────────────────────────────────────────────

export interface CanvasLayout {
  preset: LayoutPreset
  slots: CanvasSlot[]
  trigger: LayoutTrigger
  /** SHA-256 hash of the workspace context that produced this layout */
  contextHash?: string
  createdAt?: string
}

// ── Preset defaults ───────────────────────────────────────────────────────────

/** Default slot configurations for each preset (slots receive generated IDs at runtime) */
export const LAYOUT_PRESETS: Record<LayoutPreset, Omit<CanvasSlot, 'id'>[]> = {
  single: [
    { component: 'capture', zoomLevel: 'middle' },
  ],
  split2: [
    { component: 'activity', zoomLevel: 'middle' },
    { component: 'capture',  zoomLevel: 'middle' },
  ],
  split1x3: [
    { component: 'agent',    zoomLevel: 'macro'  },
    { component: 'activity', zoomLevel: 'middle' },
    { component: 'capture',  zoomLevel: 'micro'  },
    { component: 'capture',  zoomLevel: 'micro'  },
  ],
  quadrant: [
    { component: 'agent',    zoomLevel: 'macro'  },
    { component: 'activity', zoomLevel: 'middle' },
    { component: 'capture',  zoomLevel: 'middle' },
    { component: 'council',  zoomLevel: 'macro'  },
  ],
}

/** Build a CanvasLayout from a preset with auto-generated slot IDs */
export function createLayout(
  preset: LayoutPreset,
  trigger: LayoutTrigger,
  overrides?: Partial<Omit<CanvasLayout, 'preset' | 'trigger' | 'slots'>>,
): CanvasLayout {
  const slots: CanvasSlot[] = LAYOUT_PRESETS[preset].map((slot, i) => ({
    ...slot,
    id: `${preset}-${i}-${Date.now()}`,
  }))
  return {
    preset,
    slots,
    trigger,
    createdAt: new Date().toISOString(),
    ...overrides,
  }
}
