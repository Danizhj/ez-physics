"use client";
import React from "react";
import { useState } from "react";

const Form = () => {
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");

  async function solveProblem() {
    const res = await fetch("/api/solve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problem }),
    });

    const data = await res.json();

    setSolution(data.solution);
  }

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          solveProblem();
        }}
      >
        <h2 className="text-main-color text-3xl font-bold mb-3">
          Введите задачу
        </h2>
        <input
          type="text"
          className="bg-background-secondary px-6 py-3 rounded-3xl outline-none w-[80vw]"
          value={problem}
          onChange={(e) => {
            setProblem(e.target.value);
          }}
        />
      </form>
      <div
        className="whitespace-pre-wrap w-[80vw]"
        dangerouslySetInnerHTML={{
          __html: solution
            ?.replace(
              "Дано:",
              '<span class="text-main-color font-bold text-xl">Дано</span><br/>',
            )
            .replace(
              "СИ:",
              '<span class="text-main-color font-bold text-xl">CИ</span><br/>',
            )
            .replace(
              "Вывод формулы:",
              '<span class="text-main-color font-bold text-xl">Вывод формулы</span><br/>',
            )
            .replace(
              "Решение:",
              '<span class="text-main-color font-bold text-xl">Решение</span><br/>',
            )
            .replace(
              "Объяснение:",
              '<span class="text-main-color font-bold text-xl">Объяснение</span><br/>',
            )
            .replace(
              "Ответ:",
              '<span class="text-main-color font-bold text-xl">Ответ</span><br/>',
            ),
        }}
      ></div>
    </div>
  );
};

export default Form;
