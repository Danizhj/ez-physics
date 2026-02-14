import Image from "next/image";
import Form from "@/components/Form";

export default function Home() {
  return (
    <main>
      <header>
        <div className="flex justify-center items-center">
          <Image
            src="/icon-physics.png"
            alt="physics icon"
            width={70}
            height={70}
            className="m-4"
          />
          <h1 className="text-main-color font-bold text-4xl tracking-wide">
            EZ PHYSICS
          </h1>
        </div>
      </header>
      <Form />
    </main>
  );
}
