import React, { createContext, useEffect, useReducer } from "react";
import User from "../entity/User";
import fetch from "isomorphic-unfetch";

export type AuthUser = Omit<User, "password">;

export interface IUserProfileConfig {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface IAuthContext {
  user?: AuthUser | null;
  loading?: boolean;
  error?: boolean;
  logout?: () => void;
  signin?: (email: string, password: string) => void;
  signup?: (config: IUserProfileConfig) => void;
}

interface IState {
  user: AuthUser | null;
  loading: boolean;
  error: boolean;
}

enum AuthActionTypes {
  SIGNIN = "[auth] SIGNIN",
  LOGOUT = "[auth] LOGOUT",
  LOADING = "[auth] LOADING",
  ERROR = "[auth] ERROR",
}

interface IAuthAction {
  type: AuthActionTypes;
  payload?: AuthUser | null;
}

export const AuthContext = createContext<IAuthContext>({});

function AuthProvider({ children }: { children: any }) {
  const initialState: IState = {
    user: null,
    loading: false,
    error: false,
  };

  const reducer = (state: IState, action: IAuthAction): IState => {
    switch (action.type) {
      case AuthActionTypes.SIGNIN:
        return {
          user: action.payload!,
          loading: false,
          error: false,
        };
      case AuthActionTypes.LOGOUT:
        return {
          user: null,
          loading: false,
          error: false,
        };
      case AuthActionTypes.LOADING:
        return {
          ...state,
          loading: true,
          error: false,
        };
      case AuthActionTypes.ERROR:
        return {
          ...state,
          loading: false,
          error: true,
        };
      default:
        return state;
    }
  };

  const [{ user, loading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    let token: string | null = null;

    if (typeof window !== "undefined") {
      token = window.localStorage.getItem("auth_token") || null;
    }

    if (token) {
      const getUser = async () => {
        dispatch({ type: AuthActionTypes.LOADING });
        try {
          const fetchUser = await fetch("/api/auth/handleGetUser", {
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`,
            },
          });

          const userData = await fetchUser.json();

          dispatch({
            type: AuthActionTypes.SIGNIN,
            payload: userData.data.user,
          });
        } catch {}
      };

      getUser();
    }
  }, []);

  const signin = async (email: string, password: string) => {
    dispatch({ type: AuthActionTypes.LOADING });
    try {
      const req = await fetch("/api/auth/handleSignIn", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const userData = await req.json();

      window.localStorage.setItem("auth_token", userData.token);
      dispatch({ type: AuthActionTypes.SIGNIN, payload: userData.user });
    } catch (e) {
      console.error(e);
      dispatch({ type: AuthActionTypes.ERROR });
    }
  };

  const signup = async ({
    email,
    password,
    firstName,
    lastName,
  }: IUserProfileConfig) => {
    dispatch({ type: AuthActionTypes.LOADING });
    try {
      const req = await fetch("/api/profile/handleCreateUserProfile", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
        }),
      });
      const { data } = await req.json();
      window.localStorage.setItem("auth_token", data.token);
      dispatch({ type: AuthActionTypes.SIGNIN, payload: data.user });
    } catch (e) {
      console.error(e);
      dispatch({ type: AuthActionTypes.ERROR });
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("auth_token");
    }
    dispatch({ type: AuthActionTypes.LOGOUT });
  };

  return (
    <AuthContext.Provider
      value={{ user, logout, loading, error, signin, signup }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
