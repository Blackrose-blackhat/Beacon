export interface SpanEvent {
  trace_id: string
  span_id: string
  parent_span?: string
  type: string
  name: string

  start_time: number
  end_time: number

  metadata?: Record<string, any>
}