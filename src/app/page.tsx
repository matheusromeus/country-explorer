import LogoutButton from "@/components/buttons/logout";
import Image from "next/image";

import { Suspense } from "react";
import Countries from "@/components/dashboard/countries";
import Footer from "@/components/dashboard/footer";

export default async function Home() {
  return (
    <>
      <div className="">
        <div className="flex items-center gap-2 absolute top-0 right-0 p-5 z-50">
          <LogoutButton />
        </div>
      </div>
      <div className="relative h-[500px] w-full flex items-center justify-center text-center">
        <Image
          src="/assets/images/home.jpg"
          alt="minimalist globe"
          fill
          className="object-cover"
        />
        <div className="z-10">
          {/* <h1 className="text-4xl font-bold">Country Explorer</h1>
          <p className="text-lg text-muted-foreground">Explore the world.</p> */}
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Countries />
      </Suspense>
      <Footer />
    </>
  );
}
