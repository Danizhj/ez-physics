"use client";

import Image from "next/image";
import React from "react";
import { useState, useEffect } from "react";
import pfpDefault from "@/public/pfp-default.png";
import settingsImg from "@/public/settings-icon.svg";
import infoImg from "@/public/info-icon.svg";
import loginImg from "@/public/icon-login.png";
import signupImg from "@/public/icon-sign-up.png";
import favoritesImg from "@/public/icon-favorites.png";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Menu = () => {
  const [popup, setPopup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [mobile, setMobile] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const isMobile = () => setMobile(window.innerWidth < 768);
    isMobile();
  }, []);

  useEffect(() => {
    async function getLoginInfo() {
      const res = await fetch("/api/me");

      const data = await res.json();

      if (data.message === "User is authenticated") {
        setLoggedIn(true);
        setUserName(data.user.email);
        console.log(data.user);
      }
    }

    getLoginInfo();
  }, []);

  async function handleLogout() {
    const res = await fetch("/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    const message = await res.json();

    setLoggedIn(false);
    setUserName("");
  }

  return (
    <div>
      <div
        className="flex gap-3 items-center mr-10 cursor-pointer"
        onClick={() => setPopup(!popup)}
      >
        <Image
          src={pfpDefault}
          alt="pfp"
          height={40}
          width={40}
          className="rounded-[100vw]"
        />
        {!mobile && <h2 className="text-foreground ">{userName}</h2>}
      </div>
      {popup && (
        <ul
          className={
            "absolute top-19 right-2 p-3 flex flex-col bg-background-secondary rounded-b-2xl"
          }
        >
          {loggedIn && mobile && (
            <li className="px-2 py-2.5 text-main-color">{userName}</li>
          )}

          <Link href="/info">
            <li className="px-2 py-2.5 flex items-center gap-3 cursor-pointer">
              <Image src={infoImg} alt="info" width={25} height={25} />
              Информация
            </li>
          </Link>
          {!loggedIn && (
            <>
              <Link href="/login">
                <li className="px-2.5 py-2.5 flex items-center gap-3 cursor-pointer">
                  <Image src={loginImg} alt="login" width={22} height={22} />
                  Войти
                </li>
              </Link>
              <Link href="/register">
                <li className="px-1.5 py-2.5 flex items-center gap-2.5 cursor-pointer">
                  <Image
                    src={signupImg}
                    alt="register"
                    width={29}
                    height={29}
                  />
                  Зарегестрироваться
                </li>
              </Link>
            </>
          )}

          {loggedIn && (
            <>
              <Link href="/saved">
                <li className="px-2 py-2.5 flex items-center gap-3 cursor-pointer">
                  <Image
                    src={favoritesImg}
                    alt="saved"
                    width={25}
                    height={25}
                  />
                  Сохранённые
                </li>
              </Link>
              <li
                className="px-2 py-2.5 flex items-center gap-3 cursor-pointer"
                onClick={handleLogout}
              >
                <Image src={loginImg} alt="saved" width={25} height={25} />
                Выйти
              </li>
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default Menu;
