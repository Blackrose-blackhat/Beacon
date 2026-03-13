import { initExporter, exportSpan } from "./transport/httpExporter"
import { generateId } from "./utils/ids"

export function initSDK(config: { endpoint: string }) {
  initExporter(config.endpoint)
}

/**
 * Sends a simple test span to verify the telemetry pipeline.
 */
export function sendTestSpan() {
  const span = {
    trace_id: generateId(),
    span_id: generateId(),
    type: "test_span",
    name: "sdk_verification",
    start_time: Date.now(),
    end_time: Date.now() + 10,
    metadata: { source: "sendTestSpan" }
  }

  exportSpan(span)
}

export { tracer } from "./core/tracer"
export { wrapOpenAI } from "./instrumentation/openai"
export { traceLLM } from "./instrumentation/llm"