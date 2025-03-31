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
      setTheme("light"); // Default to light theme if no theme is found in localStorage
    }
  }, []);

  // Apply the theme to the body element dynamically
  useEffect(() => {
    document.body.className = theme; // Apply theme class to the body element
  }, [theme]); // Re-run when the theme state changes

  return <Component {...pageProps} theme={theme} setTheme={setTheme} />;
};

export default MyApp;
