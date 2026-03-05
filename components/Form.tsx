"use client";
import React from "react";
import { useState, useEffect } from "react";

const Form = () => {
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [diagramB64, setDiagramB64] = useState("");
  const [withDescription, setWithDescription] = useState(false);
  const [withDiagram, setWithDiagram] = useState(false);
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem("ezPhysicsState");
    if (savedState) {
      const { problem, solution, diagramB64, withDescription, withDiagram } =
        JSON.parse(savedState);
      setProblem(problem);
      setSolution(solution);
      setDiagramB64(diagramB64);
      setWithDescription(withDescription);
      setWithDiagram(withDiagram);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "ezPhysicsState",
      JSON.stringify({
        problem,
        solution,
        diagramB64,
        withDescription,
        withDiagram,
      }),
    );
  }, [problem, solution, diagramB64, withDescription, withDiagram]);

  async function solveProblem() {
    const res = await fetch("/api/solve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problem, withDescription, withDiagram }),
    });
    const data = await res.json();
    setSolution(data.solution);
    setDiagramB64(data.diagram);
    setThinking(false);
  }

  async function saveProblem() {
    await fetch("/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        problem,
        solution,
        diagram: diagramB64 || null,
      }),
    });
  }

  return (
    <div className="flex flex-col items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          solveProblem();
          setThinking(true);
        }}
        className="flex flex-col items-center justify-center mt-70 mb-30 max-w-full"
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
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="description_preference"
              value="description"
              className="sr-only peer"
              onChange={(e) => setWithDescription(e.target.checked)}
            />
            <span className="px-6 py-2 bg-background text-foreground rounded-lg font-semibold transition-all duration-200 peer-checked:bg-main-color peer-checked:text-background peer-checked:shadow-lg hover:shadow-md border-2 border-main-color border-opacity-30 peer-checked:border-main-color peer-checked:border-opacity-100">
              Объяснение
            </span>
          </label>
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="diagram_preference"
              value="Diagram"
              className="sr-only peer"
              onChange={(e) => setWithDiagram(e.target.checked)}
            />
            <span className="px-6 py-2 bg-background text-foreground rounded-lg font-semibold transition-all duration-200 peer-checked:bg-main-color peer-checked:text-background peer-checked:shadow-lg hover:shadow-md border-2 border-main-color border-opacity-30 peer-checked:border-main-color peer-checked:border-opacity-100">
              Диаграмма
            </span>
          </label>
        </div>
      </form>
      {thinking && (
        <div className="flex items-center gap-2 py-4">
          <p className="text-main-color font-bold text-xl">Думаю</p>
          <div className="flex gap-1">
            <span
              className="w-2 h-2 bg-main-color rounded-full animate-bounce"
              style={{ animationDelay: "0s" }}
            ></span>
            <span
              className="w-2 h-2 bg-main-color rounded-full animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></span>
            <span
              className="w-2 h-2 bg-main-color rounded-full animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></span>
          </div>
        </div>
      )}
      {solution && (
        <div className="max-w-[90vw] p-5 border-main-color border-3 rounded-2xl bg-background">
          <div
            className="whitespace-pre-wrap"
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
          {diagramB64 && (
            <img
              src={`data:image/png;base64,${diagramB64}`}
              alt="diagram"
              className="w-120"
            />
          )}
          <button
            onClick={saveProblem}
            className="mt-4 px-6 py-2 bg-main-color text-background rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 shadow-sm"
          >
            Сохранить
          </button>
        </div>
      )}
    </div>
  );
};

export default Form;
