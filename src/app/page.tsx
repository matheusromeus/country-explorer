import Link from "next/link";
import LogoutButton from "@/components/buttons/logout";
import ToggleTheme from "@/components/buttons/toggle-theme";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { WelcomeCards } from "@/components/dashboard/welcome-cards";
import { Separator } from "@radix-ui/react-separator";
import { Suspense } from "react";
import Countries from "@/components/dashboard/countries";

export default async function Home() {
  return (
    <>
      <div className="">
        <div className="flex items-center gap-2 absolute top-0 right-0 p-5">
          <ToggleTheme />
          <LogoutButton />
        </div>
      </div>
      <div className="@container/main flex flex-1 flex-col gap-2">
        {/* <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <WelcomeCards />
          </div> */}
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Countries />
      </Suspense>
    </>
  );
}
