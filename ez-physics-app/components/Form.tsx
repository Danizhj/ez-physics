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
    setSolution(data);
  }

  return (
    <div>
      <form onSubmit={solveProblem}>
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
      <div>{solution}</div>
    </div>
  );
};

export default Form;
