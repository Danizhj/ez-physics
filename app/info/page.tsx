import React from "react";
import Header from "@/components/Header";

const Info = () => {
  return (
    <div>
      <Header />
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center bg-background border-main-color border-3 rounded-2xl p-6 md:p-10 max-w-[80vw] mt-40 md:mt-60 text-center">
          <h1 className="text-2xl md:text-4xl font-semibold text-main-color mb-10 md:mb-15">
            Проект EZ-PHYSICS
          </h1>
          <p className="md:text-xl">
            Сделан учеником 10 класса{" "}
            <span className="text-main-color">Жакыпбай Данияром</span> для
            выставки <span className="text-main-color">ShoqanEcology</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Info;
