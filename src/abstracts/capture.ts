import { BaseAtom } from '../atom.js'

export type ElevationStatus = 'raw' | 'candidate' | 'elevated' | 'dismissed'
export type ElevationTarget = '_v.knowledge' | '_v.decision' | null

export abstract class CaptureAtom extends BaseAtom {
  readonly layer = 'capture' as const
  // v_semantic is inherited as optional from BaseAtom
  abstract content: {
    elevation_status: ElevationStatus
    elevation_target?: ElevationTarget
    [key: string]: unknown
  }
}
