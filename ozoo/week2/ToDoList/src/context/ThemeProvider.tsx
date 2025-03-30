// ThemeProvider.tsx
import { createContext, PropsWithChildren, useState, useContext, ReactElement } from "react";

export enum Theme {
  LIGHT = "LIGHT",
  DARK = "DARK",
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren): ReactElement => {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);

  const toggleTheme = (): void => {
    setTheme((prevTheme) : Theme =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
      throw new Error("Cannot find ThemeProvider");
    }
    return themeContext;
  };