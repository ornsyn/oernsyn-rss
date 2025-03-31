import { useRouter } from "next/router";
import { useEffect } from "react";
import NProgress from "nprogress";

import styles from "../../../styles/RefreshButton.module.css";

const onRouteChangeStart = () => NProgress.start();
const onRouteChangeDone = () => NProgress.done();

export const ToggleThemeButton = () => {
  const router = useRouter();
  
  const toggleTheme = () => {
    const currentQuery = new URLSearchParams(window.location.search);
    const currentTheme = currentQuery.get("theme") === "dark" ? "dark" : "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    currentQuery.set("theme", newTheme);
    router.replace(`/?${currentQuery.toString()}`, undefined, { shallow: true });
  };

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
