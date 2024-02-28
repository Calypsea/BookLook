import React, { createContext, useState } from "react";

type ThemeContextType = "light" | "dark";
interface ThemeContextValue {
  toggle: () => void;
  mode: ThemeContextType;
}
interface ChildrenProps {
  children: React.ReactNode;
}
export const ThemeContext = createContext<ThemeContextValue>({
  toggle: () => {},
  mode: "light",
});

export const ThemeProvider = ({ children }: ChildrenProps) => {
  const getThemeFromLocal = localStorage.getItem("theme");

  const [mode, setMode] = useState<ThemeContextType>(
    (getThemeFromLocal as ThemeContextType) || "dark"
  );
  React.useEffect(() => {
    localStorage.setItem("theme", mode);
  }, [mode]);
  const toggle = (): void => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const contextValue: ThemeContextValue = {
    toggle,
    mode,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
