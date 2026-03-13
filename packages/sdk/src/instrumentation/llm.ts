import { tracer } from "../core/tracer"

/**
 * Traces an LLM call, measuring latency and capturing metadata.
 */
export async function traceLLM<T>(
  name: string,
  fn: () => Promise<T>,
  metadata: Record<string, any> = {}
): Promise<T> {
  const span = tracer.startSpan("llm_call", name)
  const start = Date.now()

  try {
    const result = await fn()
    span.end({
      latency: Date.now() - start,
      ...metadata
    })
    return result
  } catch (error) {
    span.end({
      latency: Date.now() - start,
      error: error instanceof Error ? error.message : String(error),
      ...metadata
    })
    throw error
  }
}