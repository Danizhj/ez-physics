"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import Header from "@/components/Header";

type SavedProblem = {
  id: string;
  problem: string;
  solution: string;
  diagram: string | null;
  created_at: string;
};

const SavedPage = () => {
  const [saved, setSaved] = useState<SavedProblem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFull, setShowFull] = useState("");

  useEffect(() => {
    async function fetchSaved() {
      const res = await fetch("/api/saved");

      if (res.ok) {
        const data = await res.json();
        setSaved(data.saved);
      }

      setLoading(false);
    }
    fetchSaved();
  }, []);

  function handleShowFull(problemId: string) {
    setShowFull(problemId);
  }

  function handleHide() {
    setShowFull("");
  }

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center bg-background border-main-color border-3 rounded-2xl p-6 max-w-[80vw] mt-10">
          <h1 className="text-main-color font-bold text-2xl mb-5">
            Сохранённые
          </h1>
          {loading && (
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
          )}

          {saved.length === 0 && <h2>Нет сохранённых</h2>}

          {saved.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid gray",
                padding: 16,
                marginBottom: 16,
              }}
            >
              <h3 className="text-xl text-main-color font-bold">Задача:</h3>
              <p>{item.problem}</p>

              {showFull === "" && (
                <button
                  onClick={() => handleShowFull(item.id)}
                  className="mt-4 px-6 py-2 bg-main-color text-background rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 shadow-sm"
                >
                  Развернуть
                </button>
              )}

              {showFull === item.id && (
                <div>
                  <h3 className="text-xl text-main-color font-bold mt-4">
                    Решение:
                  </h3>
                  <div
                    className="whitespace-pre-wrap text-foreground leading-relaxed mt-2"
                    dangerouslySetInnerHTML={{
                      __html: item.solution
                        ?.replace(
                          "Дано:",
                          '<span class="text-main-color font-bold text-xl">Дано</span><br/>',
                        )
                        .replace(
                          "СИ:",
                          '<span class="text-main-color font-bold text-xl">СИ</span><br/>',
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

                  {item.diagram && (
                    <>
                      <h3 className="text-xl text-main-color font-bold mt-4">
                        Диаграмма:
                      </h3>
                      <Image
                        src={`data:image/png;base64,${item.diagram}`}
                        alt="diagram"
                        width={300}
                        height={300}
                        className="mt-2"
                      />
                    </>
                  )}

                  <p style={{ fontSize: 12, opacity: 0.6, marginTop: 16 }}>
                    Сохранено: {new Date(item.created_at).toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleHide()}
                    className="mt-4 px-6 py-2 bg-main-color text-background rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 shadow-sm"
                  >
                    Свернуть
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SavedPage;
