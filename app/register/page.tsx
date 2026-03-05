"use client";

import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  async function handleRegister() {
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push("/login");
    }
  }

  return (
    <div>
      <Header />
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center bg-background border-main-color border-3 rounded-2xl p-6">
          <h1 className="text-main-color text-3xl font-bold">Регистрация</h1>
          <form
            className="w-[60vw] flex flex-col items-center gap-4 my-10"
            onSubmit={async (e) => {
              e.preventDefault();
              await handleRegister();
            }}
          >
            <div className="relative w-[60vw] max-w-200 mb-4">
              <input
                type="text"
                className="bg-background-secondary px-6 py-3 rounded-3xl outline-none w-full"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <h2 className="text-main-color text-sm font-semibold absolute left-4 bottom--1 pointer-events-none">
                Электронная Почта
              </h2>
            </div>

            <div className="relative w-[60vw] max-w-200 mb-4">
              <input
                type="password"
                className="bg-background-secondary px-6 py-3 rounded-3xl outline-none w-full"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <h2 className="text-main-color text-sm font-semibold absolute left-4 bottom--1 pointer-events-none">
                Пароль
              </h2>
            </div>

            <button
              type="submit"
              className="mt-2 px-6 py-2 bg-main-color text-background rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95 shadow-sm"
            >
              Зарегестрироваться
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
