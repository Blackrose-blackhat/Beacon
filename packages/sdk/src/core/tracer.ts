import { generateId } from "../utils/ids"
import { runWithContext, getTraceId } from "../context/ctxManager"
import { Span } from "./span"

export const tracer = {
  /**
   * Starts a new trace with a root span.
   * All spans created inside `fn` will share the same trace_id.
   */
  async startTrace<T>(name: string, fn: () => T | Promise<T>): Promise<T> {
    const traceId = generateId()
    const rootSpan = new Span(traceId, "trace", name)

    return runWithContext(traceId, async () => {
      try {
        const result = await fn()
        rootSpan.end()
        return result
      } catch (error) {
        rootSpan.end({ error: error instanceof Error ? error.message : String(error) })
        throw error
      }
    })
  },

  /**
   * Starts a child span within the current trace.
   * Must be called inside a `startTrace` callback.
   */
  startSpan(type: string, name: string): Span {
    const traceId = getTraceId()

    if (!traceId) {
      throw new Error("No active trace. Call tracer.startTrace() first.")
    }

    return new Span(traceId, type, name)
  }
}