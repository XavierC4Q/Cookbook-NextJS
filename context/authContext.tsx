import React, { createContext, useEffect, useState } from "react";
import User from "../entity/User";
import fetch from "isomorphic-unfetch";

type AuthUser = Omit<User, "password">;

interface IAuthContext {
  user?: AuthUser | null;
  logout?: () => void;
}

const AuthContext = createContext<IAuthContext>({});

function AuthProvider({ children }: { children: any }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    let token: string | null = null;

    if (typeof window !== "undefined") {
      token = window.localStorage.getItem("auth_token") || null;
    }

    if (token) {
      const getUser = async () => {
        try {
          const fetchUser = await fetch("/api/auth/handleGetUser", {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          });

          const userData = await fetchUser.json();

          setUser(userData.data.user);
        } catch {}
      };

      getUser();
    }
  }, []);

  const logout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('auth_token');
    }
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>{children}</AuthContext.Provider>
  );
}

export default AuthProvider;
