import { AsyncLocalStorage } from "async_hooks"

export type ContextStore = {
  traceId: string
}

const store = new AsyncLocalStorage<ContextStore>()

export function runWithContext<T>(traceId: string, fn: () => T): T {
  return store.run({ traceId }, fn)
}

export function getTraceId(): string | undefined {
  const ctx = store.getStore()
  return ctx?.traceId
}