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
        content:
          "Ты профессор по физике. Пошагова реши задачу по этой схеме:'Дано:(только параметры данные для решения задачи, не давай разъяснений)... СИ:(только перевод этих параметров в систему СИ)... Вывод формулы:(только формулы без разъяснения)... Решение:(только решение без разъяснения)... Объяснение:(подробно опиши все пункты и объяснить их)... Ответ:...'. Ответ с единицами измерения. Не используй LaTeX или специальные символы, пиши формулы и числа в обычном тексте.",
      },
      {
        role: "user",
        content: problem,
      },
    ],
  });

  return NextResponse.json({
    solution: response.choices[0].message.content,
  });
}
