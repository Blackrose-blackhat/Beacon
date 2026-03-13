import { generateId } from "../utils/ids"
import { exportSpan } from "../transport/httpExporter"
import type { SpanEvent } from "../types/span"

export class Span {
  public readonly traceId: string
  public readonly spanId: string
  public readonly type: string
  public readonly name: string
  public readonly startTime: number

  constructor(traceId: string, type: string, name: string) {
    this.traceId = traceId
    this.spanId = generateId()
    this.type = type
    this.name = name
    this.startTime = Date.now()
  }

  public end(metadata: Record<string, any> = {}): void {
    const event: SpanEvent = {
      trace_id: this.traceId,
      span_id: this.spanId,
      type: this.type,
      name: this.name,
      start_time: this.startTime,
      end_time: Date.now(),
      metadata
    }

    exportSpan(event)
  }
}