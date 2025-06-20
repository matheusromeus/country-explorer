import Image from "next/image";

import { Suspense } from "react";
import Countries from "@/components/dashboard/countries";
import Footer from "@/components/dashboard/footer";

export default async function Home() {
  return (
    <>
      <div className="relative h-[500px] w-full flex items-center justify-center text-center">
        <Image
          src="/assets/images/home.jpg"
          alt="boats in a lake"
          fill
          className="object-cover"
          priority
          placeholder="blur"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
      </div>
      <Suspense fallback={<div></div>}>
        <Countries />
      </Suspense>
      <Footer />
    </>
  );
}
