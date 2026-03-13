import { traceLLM } from "./llm"

export function wrapOpenAI(client: any) {

  const original = client.chat.completions.create

  client.chat.completions.create = async function(args: any) {

    return traceLLM(
      "openai_chat",
      () => original.call(this, args),
      { model: args.model }
    )

  }

  return client
}