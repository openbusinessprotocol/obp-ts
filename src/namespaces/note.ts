import { CaptureAtom, type ElevationStatus, type ElevationTarget } from '../abstracts/capture.js'

export interface NoteContent {
  body: string
  elevation_status: ElevationStatus
  elevation_target?: ElevationTarget
  goal_id?: string             // context reference
  [key: string]: unknown
}

export class NoteAtom extends CaptureAtom {
  readonly _v = '_v.note' as const
  content: NoteContent

  constructor(data: ConstructorParameters<typeof CaptureAtom>[0] & { content: NoteContent }) {
    super(data)
    this._meta.era = '1'
    this.content = data.content
  }
}
