"use client";

import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Home,
  Plane,
  Heart,
  Sun,
  Moon,
  Lock,
  Unlock,
  LucideIcon,
} from "lucide-react";
import { useAtomValue, useSetAtom } from "jotai";
import { isAuthenticatedAtom, syncAuthCookieAtom } from "@/atoms/authAtoms";
import { commonCountryCodes } from "@/lib/constants";

interface DynamicIslandProps {
  className?: string;
}

const iconSets = [[Home, Heart, Plane, "auth-toggle", "theme-toggle"]];

export function DynamicIsland({ className = "" }: DynamicIslandProps) {
  const [currentIconSet, setCurrentIconSet] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const setAuth = useSetAtom(syncAuthCookieAtom);

  const shouldHideIsland =
    pathname?.includes("/login") || pathname?.startsWith("/login");

  const getRandomCountryCode = () => {
    const randomIndex = Math.floor(Math.random() * commonCountryCodes.length);
    return commonCountryCodes[randomIndex];
  };

  const isIconActive = (Icon: LucideIcon | string) => {
    if (Icon === Home && pathname === "/") return true;
    if (Icon === Heart && pathname === "/favorites") return true;
    if (Icon === Plane && pathname?.startsWith("/country")) return true;
    if (Icon === "auth-toggle" && isAuthenticated) return true;
    return false;
  };

  const handleIconClick = (Icon: LucideIcon | string) => {
    if (Icon === Heart) {
      router.push("/favorites");
    } else if (Icon === Home) {
      router.push("/");
    } else if (Icon === Plane) {
      const randomCountryCode = getRandomCountryCode();
      router.push(`/country/${randomCountryCode}`);
    } else if (Icon === "auth-toggle") {
      if (isAuthenticated) {
        setAuth(false);
      } else {
        router.push("/login");
      }
    } else if (Icon === "theme-toggle") {
      setTheme(theme === "light" ? "dark" : "light");
    } else {
      setCurrentIconSet((prev) => (prev + 1) % iconSets.length);
    }
  };

  const getThemeIcon = () => {
    return theme === "light" ? Moon : Sun;
  };

  const getAuthIcon = () => {
    return isAuthenticated ? Unlock : Lock;
  };

  const getIconColor = (Icon: LucideIcon | string) => {
    if (Icon === Home) return "text-blue-500 hover:text-blue-600";
    if (Icon === Heart) return "text-red-500 hover:text-red-600";
    if (Icon === Plane) return "text-teal-500 hover:text-teal-600";
    if (Icon === "auth-toggle") {
      return isAuthenticated
        ? "text-green-500 hover:text-green-600"
        : "text-orange-500 hover:text-orange-600";
    }
    if (Icon === "theme-toggle") {
      return theme === "light"
        ? "text-purple-500 hover:text-purple-600"
        : "text-yellow-500 hover:text-yellow-600";
    }
    return "text-primary hover:text-primary/80";
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
          hover:scale-110
        `}
      >
        <div className="flex flex-row items-center justify-center gap-2 md:gap-4">
          {currentIcons.map((Icon, index) => {
            const IconComponent =
              Icon === "theme-toggle"
                ? getThemeIcon()
                : Icon === "auth-toggle"
                ? getAuthIcon()
                : Icon;
            return (
              <button
                key={`${currentIconSet}-${index}`}
                onClick={() => handleIconClick(Icon)}
                className={`
                  p-2 md:p-3 rounded-full
                  ${
                    isIconActive(Icon)
                      ? `bg-primary/20 border-primary/40 shadow-lg ${getIconColor(
                          Icon
                        )}`
                      : `bg-primary/10 hover:bg-primary/20 border border-primary/20 hover:border-primary/40 shadow-sm hover:shadow-md ${getIconColor(
                          Icon
                        )}`
                  }
                  relative overflow-hidden cursor-pointer transition-all duration-200
                `}
              >
                <IconComponent size={16} className="md:hidden" />
                <IconComponent size={20} className="hidden md:block" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
