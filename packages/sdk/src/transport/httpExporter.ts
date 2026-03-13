import type { SpanEvent } from "../types/span"

let endpoint = ""

/**
 * Initializes the exporter with a target URL.
 */
export function initExporter(url: string): void {
  endpoint = url
}

/**
 * Exports a span event via HTTP POST.
 */
export async function exportSpan(span: SpanEvent): Promise<void> {
  if (!endpoint) {
    return
  }

  try {
        await fetch(`${endpoint}/spans`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(span)
    })
  } catch (e) {
    console.error("span export failed", e)
  }
}