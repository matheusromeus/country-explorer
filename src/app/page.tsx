import Link from "next/link";
import LogoutButton from "@/components/buttons/logout";
import ToggleTheme from "@/components/buttons/toggle-theme";
import Countries from "@/components/dashboard/countries";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Suspense } from "react";
import { AppSidebar } from "@/components/dashboard/app-sidebar";

export default async function Home() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <div className="p-5">
          <SidebarTrigger className="-ml-1 cursor-pointer" />
        </div>
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
            <h1>welcome to the Traveller&apos;s Map</h1>
            <Link href="/favorites" className="p-4 border rounded-2xl">
              My Travel Bucket List
            </Link>

            <Suspense fallback={<div>Loading...</div>}>
              <Countries />
            </Suspense>
            <div className="flex items-center gap-2 absolute top-0 right-0 p-10">
              <ToggleTheme />
              <LogoutButton />
            </div>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
