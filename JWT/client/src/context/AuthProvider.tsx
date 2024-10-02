import { createContext, useState, SetStateAction, Dispatch, ReactNode } from "react";
import { AuthType } from "../types";

const AuthContext = createContext<AuthContextType>({
  auth: null, setAuth: () => { },
  persist: "", setPersist: () => { }
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<AuthType | null>(null);

  const [persist, setPersist] = useState<string>(() => {
    const storedPersist = localStorage.getItem("persist");
    return storedPersist ? JSON.parse(storedPersist) : "false";
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};


export interface AuthContextType {
  auth: AuthType | null;
  setAuth: Dispatch<SetStateAction<AuthType | null>>;
  persist: string;
  setPersist: Dispatch<SetStateAction<string>>;
}

export interface AuthProviderProps {
  children: ReactNode;
}

export default AuthContext;


