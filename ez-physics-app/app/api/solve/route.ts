import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { problem } = await req.json();
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        message:
          "Ты профессор по физике. Пошагова реши задачу. Распиши дано, перевод в систему СИ, решение. Напиши объяснение к задаче",
      },
      {
        role: "user",
        message: problem,
      },
    ],
  });

  return NextResponse.json({
    solution: response.choices[0].message.content,
  });
}
