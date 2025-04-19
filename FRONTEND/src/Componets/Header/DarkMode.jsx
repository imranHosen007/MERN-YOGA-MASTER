import React, { useEffect, useState } from "react";
import darkLogo from "../../assets/dark-mode-button.png";
import lightLogo from "../../assets/light-mode-button.png";
const DarkMode = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") ? localStorage.getItem("theme") : "light"
  );
  const element = document.documentElement;

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme == "dark") {
      element.classList.add("dark");
    } else {
      element.classList.remove("dark");
      element.classList.add("light");
    }
  }, [theme]);
  return (
    <div className="relative">
      <img
        src={lightLogo}
        onClick={() => setTheme("dark")}
        className={`w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300 z-10 ${
          theme === "dark" ? "hidden" : "block"
        }`}
        alt=""
      />
      <img
        src={darkLogo}
        onClick={() => setTheme("light")}
        className={`w-12 cursor-pointer drop-shadow-[1px_1px_1px_rgba(0,0,0,0.1)] transition-all duration-300 z-10 ${
          theme === "light" ? "hidden" : "block"
        }`}
        alt=""
      />
    </div>
  );
};

export default DarkMode;
