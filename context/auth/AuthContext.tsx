import { IUser } from "@/interfaces/user.interface";
import { createContext } from "react";


interface ContextProps {
  isLoggedIn: boolean;
  user?: IUser;
  loginUser: (email: string, password: string) => Promise<boolean>;
  logoutUser: () => void;
  registerUser: (name: string, email: string, password: string) => Promise<boolean>;
}

export const AuthContext = createContext({} as ContextProps);
