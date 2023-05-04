import Cookies from "js-cookie";
import { FC, PropsWithChildren, useEffect, useReducer } from "react";
import { AuthContext, authReducer } from "./";
import { useRouter } from "next/router";
import { todoApi } from "@/api/todoApi";
import { IUser } from "@/interfaces/user.interface";

export interface AuthState {
  isLoggedIn: boolean;
  user?: IUser;
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  user: undefined,
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE);
  const router = useRouter();

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    if (!Cookies.get("token")) {
      return;
    }

    try {
      const { data } = await todoApi.get("/auth/check-auth-status", {
        headers: { Authorization: `Bearer ${Cookies.get("token")}` },
      });
      const { token } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: data });
    } catch (error) {
      Cookies.remove("token");
    }
  };

  const loginUser = async (email: string, password: string) => {
    try {
      const { data } = await todoApi.post("/auth/login", {
        email,
        password,
      });
      const { token } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: data });
      return true;
    } catch (error) {
      return false;
    }
  };

  const registerUser = async (
    fullName: string,
    email: string,
    password: string
  ) => {
    try {
      const { data } = await todoApi.post("/auth/register", {
        email,
        password,
        fullName,
      });

      console.log(data)
      const { token } = data;
      Cookies.set("token", token);
      dispatch({ type: "[Auth] - Login", payload: data });
      return true;

    } catch (error) {
      return false;
    }
  };

  const logoutUser = () => {
    router.reload();
    Cookies.remove("token");
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,

        //* Methods
        loginUser,
        logoutUser,
        registerUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
