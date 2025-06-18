import Link from "next/link";
import LogoutButton from "@/components/buttons/logout";
import ToggleTheme from "@/components/buttons/toggle-theme";
import Countries from "@/components/dashboard/countries";
import { Suspense } from "react";

export default async function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>welcome to country explorer</h1>
        <Link href="/favorites">Favorites</Link>

        <Suspense fallback={<div>Loading...</div>}>
          <Countries />
        </Suspense>

        <ToggleTheme />

        <LogoutButton />
      </main>
    </div>
  );
}
