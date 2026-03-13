import { initSDK, tracer } from "../packages/sdk/dist/index.mjs"

initSDK({
  endpoint: "http://localhost:4444"
})

// Simulate a real AI agent request with nested spans
await tracer.startTrace("user_request", async () => {

  // Simulate an LLM call
  const llmSpan = tracer.startSpan("llm_call", "openai_chat")
  await new Promise(r => setTimeout(r, 120)) // fake latency
  llmSpan.end({ model: "gpt-4" })

  // Simulate a retrieval step
  const retrievalSpan = tracer.startSpan("retrieval", "vector_search")
  await new Promise(r => setTimeout(r, 50))
  retrievalSpan.end({ source: "pinecone", results: 5 })

  // Simulate a tool call
  const toolSpan = tracer.startSpan("tool_call", "web_search")
  await new Promise(r => setTimeout(r, 80))
  toolSpan.end({ query: "latest news" })

})

console.log("\n✅ Trace complete. Check ingestion server for 4 spans sharing the same trace_id.")
