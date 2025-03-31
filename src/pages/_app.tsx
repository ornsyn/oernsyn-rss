import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import "reset.css/reset.css";
import "nprogress/nprogress.css";
import "../../styles/globals.css"; // Your global CSS file

const MyApp = ({ Component, pageProps }: any) => {
  const [theme, setTheme] = useState<string>("light");

  // Check for theme in localStorage and apply it on page load
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) {
      setTheme(storedTheme); // Use theme from localStorage if it exists
    } else {
      // Default to light theme if no theme is found in localStorage
      setTheme("light");
    }
  }, []);

  // Apply the theme to the body element dynamically
  useEffect(() => {
    document.body.className = theme; // Apply theme class to the body element
  }, [theme]); // Re-run when the theme state changes

  // Function to toggle the theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // Store the new theme in localStorage
  };

  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
