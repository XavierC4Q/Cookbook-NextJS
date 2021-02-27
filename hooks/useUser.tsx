import { useEffect, useReducer } from "react";
import fetch from "isomorphic-unfetch";
import { AuthUser } from "../types";

function useUser(uid: string, currentUser: AuthUser | null) {
  type UseUserActionType = "setUser" | "loading" | "error";

  interface IUseUserAction {
    type: UseUserActionType;
    payload?: AuthUser | null;
  }

  interface IUseUserState {
    user: AuthUser | null;
    loading: boolean;
    error: boolean;
  }

  const isCurrentUserProfile = currentUser && currentUser.id === parseInt(uid);

  const initialState: IUseUserState = {
    user: isCurrentUserProfile ? currentUser : null,
    loading: false,
    error: false,
  };

  const reducer = (
    state: IUseUserState,
    action: IUseUserAction
  ): IUseUserState => {
    switch (action.type) {
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

    const getUserProfile = async () => {
      const path = `/api/profile/handleGetUserProfile/${uid}`;
      dispatch({ type: "loading" });
      try {
        const req = await fetch(path, {
          method: "GET",
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const userData = await req.json();
        console.log(userData)
        dispatch({ type: "setUser", payload: userData.data });
      } catch (e) {
        console.error(e);
        dispatch({ type: "error" });
      }
    };

    !isCurrentUserProfile  && getUserProfile();
  }, [uid, currentUser]);

  return {
    user,
    isCurrentUserProfile,
    loading,
    error,
    dispatch,
  };
}

export default useUser;
