/**
 * OBP Intensity — alignment scoring between Capture/Activity atoms and Statement vectors.
 *
 * "Intensity" measures how well a captured record or activity aligns with the
 * workspace's declared intentions (goals, decisions, principles).
 *
 * Formula: cosine similarity between the capture's v_semantic and the statement's v_intent.
 * High score (≥ 0.72) = the capture is aligned with declared intent.
 */

// ── Core math ────────────────────────────────────────────────────────────────

/**
 * Standard cosine similarity between two vectors.
 * Returns a value in [−1, 1]. Vectors must have equal length.
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new RangeError(
      `Vector length mismatch: ${a.length} vs ${b.length}`
    )
  }
  let dot = 0, normA = 0, normB = 0
  for (let i = 0; i < a.length; i++) {
    dot   += a[i] * b[i]
    normA += a[i] ** 2
    normB += b[i] ** 2
  }
  if (normA === 0 || normB === 0) return 0
  return dot / (Math.sqrt(normA) * Math.sqrt(normB))
}

// ── Alignment scoring ────────────────────────────────────────────────────────

export const DEFAULT_ALIGNMENT_THRESHOLD = 0.72

export interface AlignmentResult {
  /** Cosine similarity score in [−1, 1] */
  score: number
  /** True when score ≥ threshold */
  aligned: boolean
  threshold: number
}

/**
 * Measure alignment of a single capture/activity vector against one statement vector.
 *
 * Usage:
 *   const result = measureAlignment(captureVector, statementVector)
 */
export function measureAlignment(
  captureVector: number[],
  statementVector: number[],
  threshold = DEFAULT_ALIGNMENT_THRESHOLD,
): AlignmentResult {
  const score = cosineSimilarity(captureVector, statementVector)
  return { score, aligned: score >= threshold, threshold }
}

/**
 * Compute Intensity: max-pool alignment of a capture against multiple statement vectors.
 * Typical use: check if a note/task is relevant to *any* active goal or decision.
 */
export function computeIntensity(
  captureVector: number[],
  statementVectors: number[][],
  threshold = DEFAULT_ALIGNMENT_THRESHOLD,
): AlignmentResult {
  if (statementVectors.length === 0) {
    return { score: 0, aligned: false, threshold }
  }
  const score = Math.max(
    ...statementVectors.map(sv => cosineSimilarity(captureVector, sv))
  )
  return { score, aligned: score >= threshold, threshold }
}

// ── Ranked alignment ─────────────────────────────────────────────────────────

export interface RankedStatement {
  /** UUID of the statement atom */
  id: string
  score: number
  aligned: boolean
}

/**
 * Rank a list of statement vectors by alignment to a capture vector.
 * Returns sorted descending by score.
 */
export function rankStatements(
  captureVector: number[],
  statements: Array<{ id: string; vector: number[] }>,
  threshold = DEFAULT_ALIGNMENT_THRESHOLD,
): RankedStatement[] {
  return statements
    .map(s => ({
      id: s.id,
      score: cosineSimilarity(captureVector, s.vector),
      aligned: false,
    }))
    .sort((a, b) => b.score - a.score)
    .map(r => ({ ...r, aligned: r.score >= threshold }))
}
