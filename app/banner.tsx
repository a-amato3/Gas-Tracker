import { useState, useEffect } from "react";

const TopBanner = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    setDarkMode(prefersDarkMode);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    const root = document.documentElement;
    const foregroundRGB = darkMode ? "255, 255, 255" : "0, 0, 0";
    const backgroundStartRGB = darkMode ? "0, 0, 0" : "214, 219, 220";
    const backgroundEndRGB = darkMode ? "0, 0, 0" : "255, 255, 255";

    root.style.setProperty("--foreground-rgb", foregroundRGB);
    root.style.setProperty("--background-start-rgb", backgroundStartRGB);
    root.style.setProperty("--background-end-rgb", backgroundEndRGB);
  }, [darkMode]);

  return (
    <div className="bg-gray-200 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            ⛽ Gas Tracker
          </h3>
          <button
            onClick={toggleDarkMode}
            className="text-sm px-2 py-1 rounded-md bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          >
            {darkMode ? "Light Mode 🌞" : "Dark Mode 🌙"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopBanner;
