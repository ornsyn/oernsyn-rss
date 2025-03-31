import { useRouter } from "next/router";
import { useEffect } from "react";
import NProgress from "nprogress";
import styles from "../../../styles/RefreshButton.module.css";

// Handle route events for NProgress
const onRouteChangeStart = () => NProgress.start();
const onRouteChangeDone = () => NProgress.done();

export const ToggleThemeButton = () => {
  const router = useRouter();

  // Toggle the theme function
  const toggleTheme = () => {
    // Get the current theme from localStorage or default to 'light'
    const currentTheme = localStorage.getItem("theme") || "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark"; // Toggle the theme

    // Store the new theme in localStorage
    localStorage.setItem("theme", newTheme);

    // Update the URL query with the new theme (this is handled via shallow routing)
    const currentQuery = new URLSearchParams(window.location.search);
    currentQuery.set("theme", newTheme);

    // Trigger shallow routing to update the URL without reloading the page
    router.replace(`/?${currentQuery.toString()}`, undefined, { shallow: true });

    // Update the body class for theme change (dynamically apply the class to body)
    document.body.className = newTheme; // Apply the new theme class
  };

  // Listen for route changes to start and end NProgress
  useEffect(() => {
    router.events.on("routeChangeStart", onRouteChangeStart);
    router.events.on("routeChangeComplete", onRouteChangeDone);
    router.events.on("routeChangeError", onRouteChangeDone);

    return () => {
      router.events.off("routeChangeStart", onRouteChangeStart);
      router.events.off("routeChangeComplete", onRouteChangeDone);
      router.events.off("routeChangeError", onRouteChangeDone);
    };
  }, [router]);

  return (
    <div className={styles.container}>
      <button className={styles.refreshButton} onClick={toggleTheme}>
        Toggle Theme
      </button>
    </div>
  );
};
