import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import schema from "./schema.json";

export const runtime = "edge";

export async function POST(request: Request) {
  console.log({ request });
  try {
    const openai = new OpenAI({
      apiKey: process.env["OPENAI_API_KEY"],
    });
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      stream: true,
      messages: [
        {
          role: "user",
          content: "Give me 5 questions and answers for a pub quiz",
        },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "get_questions_and_answers",
            description: "Get questions and answers",
            parameters: schema,
          },
        },
      ],
      tool_choice: {
        type: "function",
        function: { name: "get_questions_and_answers" },
      },
    });
    console.dir(response, { depth: null });
    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error({ error });
    throw new Error("Server error");
  }
}
