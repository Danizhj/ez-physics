import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { problem, withDescription, withDiagram } = await req.json();

  let solutionPrompt =
    "Ты профессор по физике. Реши задачу по этой схеме:'Дано:... СИ:... Вывод формулы:... Решение:... Ответ:.... Обязательно каждый шаг должен быть включён. Не объясняй решение задачи, пиши коротко. Не используй LaTeX или специальные символы, пиши формулы и числа в обычном тексте.";

  if (withDescription) {
    solutionPrompt =
      "Ты профессор по физике. Пошагова реши задачу по этой схеме:'Дано:... СИ:... Вывод формулы:... Решение:... Объяснение:... Ответ:.... Обязательно каждый шаг должен быть включён. Объяснение к формулам, решению пиши только в разделе 'Объяснение'.Не используй LaTeX или специальные символы, пиши формулы и числа в обычном тексте.";
  }

  const solution_promise = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: solutionPrompt,
      },
      {
        role: "user",
        content: problem,
      },
    ],
  });

  let diagramResponse = null;

  if (withDiagram) {
    const diagram_description = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Составь краткое описание диаграммы для этой задачи длинной в одно предложение. Диаграмма должны быть одинаковой ширины и высоты",
        },
        {
          role: "user",
          content: problem,
        },
      ],
    });

    const diagramPrompt = diagram_description.choices[0].message.content ?? "";

    diagramResponse = await client.images.generate({
      model: "gpt-image-1",
      prompt: diagramPrompt,
      size: "1024x1024",
    });
  }

  return NextResponse.json({
    solution: solution_promise.choices[0].message.content,
    diagram: diagramResponse?.data?.[0]?.b64_json ?? null,
  });
}
