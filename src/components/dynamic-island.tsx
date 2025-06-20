"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Home, Plane, Heart } from "lucide-react";
import { commonCountryCodes } from "@/lib/constants";

interface DynamicIslandProps {
  className?: string;
}

const iconSets = [[Home, Heart, Plane]];

export function DynamicIsland({ className = "" }: DynamicIslandProps) {
  const [currentIconSet, setCurrentIconSet] = useState(0);
  const router = useRouter();
  const pathname = usePathname();

  const shouldHideIsland =
    pathname?.includes("/login") || pathname?.startsWith("/login");

  const getRandomCountryCode = () => {
    const randomIndex = Math.floor(Math.random() * commonCountryCodes.length);
    return commonCountryCodes[randomIndex];
  };

  const isIconActive = (Icon: any) => {
    if (Icon === Home && pathname === "/") return true;
    if (Icon === Heart && pathname === "/favorites") return true;
    if (Icon === Plane && pathname?.startsWith("/country")) return true;
    return false;
  };

  const handleIconClick = (index: number, Icon: any) => {
    if (Icon === Heart) {
      router.push("/favorites");
    } else if (Icon === Home) {
      router.push("/");
    } else if (Icon === Plane) {
      const randomCountryCode = getRandomCountryCode();
      router.push(`/country/${randomCountryCode}`);
    } else {
      setCurrentIconSet((prev) => (prev + 1) % iconSets.length);
    }
  };

  const currentIcons = iconSets[currentIconSet];

  if (shouldHideIsland) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-50 ${className}`}
    >
      <div
        className={`
          bg-background/70 backdrop-blur-2xl  
          dark:bg-background/60
          rounded-full px-3 py-2 md:px-4 md:py-3 shadow-2xl
          relative overflow-hidden
          before:absolute before:inset-0.5 before:rounded-full 
          before:bg-gradient-to-br before:from-white/20 before:via-white/5 before:to-transparent 
          dark:before:from-white/10 dark:before:via-white/2 dark:before:to-transparent
          before:backdrop-blur-xl before:-z-10
          transition-transform duration-200 ease-out
          hover:scale-105
        `}
      >
        <div className="flex flex-row items-center justify-center gap-2 md:gap-4">
          {currentIcons.map((Icon, index) => (
            <button
              key={`${currentIconSet}-${index}`}
              onClick={() => handleIconClick(index, Icon)}
              className={`
                p-2 md:p-3 rounded-full
                ${
                  isIconActive(Icon)
                    ? "bg-primary/30 border-primary/60 text-primary shadow-lg"
                    : "bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 text-primary hover:text-primary/80 shadow-sm hover:shadow-md"
                }
                relative overflow-hidden cursor-pointer
              `}
            >
              <Icon size={16} className="md:hidden" />
              <Icon size={20} className="hidden md:block" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
