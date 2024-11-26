import React, { useState, useEffect } from "react";

export const ThemeContext = React.createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light"); // 기본 테마: light

  // 테마를 HTML 태그의 data-theme 속성에 설정
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
