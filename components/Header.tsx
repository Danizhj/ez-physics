import React from "react";
import Link from "next/link";
import Menu from "./Menu";
import Image from "next/image";

const Header = () => {
  return (
    <header>
      <Link href="/">
        <div className="flex justify-center items-center">
          <Image
            src="/icon-physics.png"
            alt="physics icon"
            width={50}
            height={50}
            className="m-4"
          />
          <h1 className="text-main-color font-semibold text-2xl md:text-3xl tracking-wide">
            EZ PHYSICS
          </h1>
        </div>
      </Link>
      <Menu />
    </header>
  );
};

export default Header;
