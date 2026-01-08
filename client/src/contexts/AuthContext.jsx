import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const BASE = import.meta.env.VITE_API_BASE_URL;
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

const fetchMe = async () => {
      try {
        const res = await fetch(`${BASE}/api/me`, {
          credentials: "include",
        });

        if (!res.ok) {
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data?.user || null);
      } catch (error) {
        console.error("Auth check failed:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
     fetchMe();
  }, []);

  

  const login = async () => {
    await fetchMe();
  };

  const logout = async () => {
    await fetch(`${BASE}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
  };

  const refreshUser = async () => {
  const res = await fetch(`${BASE}/api/auth/me`, {
    credentials: "include",
  });
  if (res.ok) {
    const data = await res.json();
    setUser(data.user);
  }
 };

  return (
    <AuthContext.Provider value={{ user, loading,  isAuth: user ? true : false , login, logout, refreshUser}}>
      {children}
    </AuthContext.Provider>
  );
}