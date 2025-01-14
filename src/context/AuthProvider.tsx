"use client";

import React from "react";
import { createContext } from "react";

const AuthContext = createContext<{
  user: User | null;
  isAuth: boolean;
}>({ user: null, isAuth: false });

interface AuthContextProps {
  children: React.ReactNode;
  user: User | null;
  isAuth: boolean;
}

function AuthProvider({ children, user, isAuth }: AuthContextProps) {
  return (
    <AuthContext.Provider value={{ user, isAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

export const useAuth = () => React.useContext(AuthContext);
