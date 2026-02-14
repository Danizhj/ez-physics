"use client";
import Image from "next/image";
import React from "react";
import { useState } from "react";

const Form = () => {
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [diagramB64, setDiagramB64] = useState("");
  const [withDescription, setWithDescription] = useState(false);
  const [withDiagram, setWithDiagram] = useState(false);

  async function solveProblem() {
    // const res = await fetch("/api/solve", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ problem }),
    // });
    // const data = await res.json();
    // setSolution(data.solution);
    // setDiagramB64(data.diagram);
    // console.log(diagramB64);

    setSolution(`Дано
  
Скорость первого автомобиля V1 = 12 м/с.  
Время движения первого автомобиля t1 = 10 с.  
Время движения второго автомобиля t2 = 15 с.  

CИ
  
Скорость - метры в секунду (м/с).  
Время - секунды (с).  
Путь - метры (м).  

Вывод формулы
  
Путь можно найти по формуле: путь = скорость * время.  
Для первого автомобиля: S1 = V1 * t1.  
Для второго автомобиля: S2 = V2 * t2, где V2 - скорость второго автомобиля.

Поскольку пути равны, можно записать:  
S1 = S2.  
Тогда получаем уравнение: V1 * t1 = V2 * t2.

Решение
  
Подставляем известные значения в уравнение:  
12 м/с * 10 с = V2 * 15 с.  
120 м = V2 * 15 с.  
V2 = 120 м / 15 с.  
V2 = 8 м/с.

Объяснение
  
Сначала мы определили путь, который прошел первый автомобиль, используя его скорость и время движения. Затем, поскольку известно, что оба автомобиля прошли одинаковый путь, мы составили уравнение, приравняв пути. Из этого уравнения выразили скорость второго автомобиля и подставили известные значения, чтобы найти V2.  

Ответ
  
Скорость второго автомобиля составляет 8 м/с.`);

    setDiagramB64(
      "https://conceptdraw.com/How-To-Guide/picture/Science-Education-Physics-Free-Body-Diagram.png",
    );
    console.log(problem);
    console.log(withDescription);
    console.log(withDiagram);
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
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 mt-6">
          <label className="flex items-center cursor-pointer">
            <input
              type="checkbox"
              name="description_preference"
              value="description"
              className="sr-only peer"
              onChange={(e) => setWithDescription(e.target.checked)}
            />
            <span className="px-6 py-2 bg-background text-main-color rounded-lg font-semibold transition-all duration-200 peer-checked:bg-main-color peer-checked:text-background peer-checked:shadow-lg hover:shadow-md border-2 border-main-color border-opacity-30 peer-checked:border-main-color peer-checked:border-opacity-100">
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
            <span className="px-6 py-2 bg-background text-main-color rounded-lg font-semibold transition-all duration-200 peer-checked:bg-main-color peer-checked:text-background peer-checked:shadow-lg hover:shadow-md border-2 border-main-color border-opacity-30 peer-checked:border-main-color peer-checked:border-opacity-100">
              Диаграмма
            </span>
          </label>
        </div>
      </form>
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
          {/* <img src={`data:image/png;base64,${diagramB64}`} alt="diagram" /> */}
          <img src={diagramB64} className="max-w-70 h-70" />
        </div>
      )}
    </div>
  );
};

export default Form;
