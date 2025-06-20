import LogoutButton from "@/components/buttons/logout";

import { Suspense } from "react";
import Countries from "@/components/dashboard/countries";

export default async function Home() {
  return (
    <>
      <div className="">
        <div className="flex items-center gap-2 absolute top-0 right-0 p-5">
          <LogoutButton />
        </div>
      </div>
      <div className="@container/main flex flex-1 flex-col gap-2"></div>
      <Suspense fallback={<div>Loading...</div>}>
        <Countries />
      </Suspense>
    </>
  );
}
