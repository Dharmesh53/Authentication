import { createContext, useState, SetStateAction, Dispatch, ReactNode } from "react";
import { AuthType } from "../types";

const AuthContext = createContext<AuthContextType>({
  auth: null, setAuth: () => { },
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthType | null>(null);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export interface AuthContextType {
  auth: AuthType | null;
  setAuth: Dispatch<SetStateAction<AuthType | null>>;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export default AuthContext;


