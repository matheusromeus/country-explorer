import LogoutButton from "@/components/buttons/logout";
import Image from "next/image";

import { Suspense } from "react";
import Countries from "@/components/dashboard/countries";
import Footer from "@/components/dashboard/footer";

export default async function Home() {
  return (
    <>
      <div>
        {/* <div className="flex items-center gap-2 absolute top-0 right-0 p-5 z-50">
          <LogoutButton />
        </div> */}
      </div>
      <div className="relative h-[500px] w-full flex items-center justify-center text-center">
        <Image
          src="/assets/images/home.jpg"
          alt="minimalist globe"
          fill
          className="object-cover"
        />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Countries />
      </Suspense>
      <Footer />
    </>
  );
}
