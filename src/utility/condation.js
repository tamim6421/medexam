import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateAuthState = () => {
      if (typeof window !== "undefined") {
        const userInfo = localStorage.getItem("user-info");
        const tokenCookie = Cookies.get("TOKEN_LOGIN");
        
        // Parse user info safely
        let parsedUser = null;
        try {
          if (userInfo) {
            parsedUser = JSON.parse(userInfo);
          }
        } catch (error) {
          console.error("Error parsing user info:", error);
          localStorage.removeItem("user-info");
        }
        
        setUser(parsedUser);
        setToken(tokenCookie || null);
        setLoading(false);
      }
    };

    // Initial load
    updateAuthState();

    // Listen for storage changes (when user logs in/out from other tabs)
    const handleStorageChange = (e) => {
      if (e.key === "user-info" || e.key === null) {
        updateAuthState();
      }
    };

    // Listen for cookie changes
    const checkCookieChanges = () => {
      updateAuthState();
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Check for changes every second (for cookie changes)
    const interval = setInterval(checkCookieChanges, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const logout = () => {
    Cookies.remove("TOKEN_LOGIN");
    localStorage.removeItem("user-info");
    setUser(null);
    setToken(null);
  };

  return { user, token, loading, logout };
};

export const shouldShowLayout = () => {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  return pathname !== "/login";
};