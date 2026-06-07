import { createContext, useContext, useState, useEffect, use } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [Token, setToken] = useState(localStorage.getItem("token") || null);
  const userFromStorage = localStorage.getItem("user");
  const [User, setUser] = useState(
    userFromStorage && userFromStorage !== "undefined"
      ? JSON.parse(userFromStorage)
      : null,
  );
  const userCompleteDataFromStorage = localStorage.getItem("userCompleteData");
  const [UserCompleteData, setUserCompleteData] = useState(
    userCompleteDataFromStorage && userCompleteDataFromStorage !== "undefined"
      ? JSON.parse(userCompleteDataFromStorage)
      : null,
  );
  const isAdminFromStorage = localStorage.getItem("isAdmin");
  const [isAdmin, setIsAdmin] = useState(
    isAdminFromStorage && isAdminFromStorage !== "undefined"
      ? JSON.parse(isAdminFromStorage)
      : false,
  );

  useEffect(() => {
    if (Token) {
      localStorage.setItem("token", Token);
    }
    if (User) {
      localStorage.setItem("user", JSON.stringify(User));
    }

    if (UserCompleteData) {
      localStorage.setItem(
        "userCompleteData",
        JSON.stringify(UserCompleteData),
      );
    }
    if (isAdmin !== null) {
      localStorage.setItem("isAdmin", isAdmin);
    }
  }, [Token, User, UserCompleteData, isAdmin]);

  function LogOut() {
    setToken(null);
    setUser(null);
    setUserCompleteData(null);
    setIsAdmin(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userCompleteData");
    localStorage.removeItem("isAdmin");
  }

  return (
    <AuthContext.Provider
      value={{
        Token,
        setToken,
        User,
        setUser,
        UserCompleteData,
        setUserCompleteData,
        isAdmin,
        setIsAdmin,
        LogOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
