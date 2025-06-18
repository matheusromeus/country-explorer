"use client";

import { useTheme } from "next-themes";
import React from "react";
import { Button } from "../ui/button";
import { Moon } from "lucide-react";

const ToggleTheme = () => {
  const { theme, setTheme } = useTheme();
  return (
    <Button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      <Moon className="w-4 h-4" />
    </Button>
  );
};

export default ToggleTheme;
