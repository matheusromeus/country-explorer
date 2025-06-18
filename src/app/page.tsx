import Link from "next/link";
import LogoutButton from "@/components/buttons/logout";
import ToggleTheme from "@/components/buttons/toggle-theme";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1>welcome to country explorer</h1>
        <Link href="/favorites">Favorites</Link>

        <Link href="/country/123">Country</Link>

        <ToggleTheme />

        {/* should not be visible if user is not authenticated */}
        <LogoutButton />
      </main>
    </div>
  );
}
