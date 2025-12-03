import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
// creates a context for authentication state management
// Q. why we need to create context for auth?
/*
Creating a context for authentication allows us to manage and share the authentication state
across the entire React application without having to pass props down through multiple
levels of components.
this is especially useful for auth because many components may need to know whether the user
is logged in or not, and they may need to perform login or logout actions.
by using AuthContext, we can provide a centralized way to access and update the auth state,
making it easier to maintain and ensuring that all components have consistent access to
the authentication information.
*/


export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const login = (token) => { localStorage.setItem("token", token); setIsLoggedIn(true); };
  // function to handle user login by storing the token and updating state
  // here, when a user logs in successfully, we store the authentication token
  // in local storage and set isLoggedIn to true. but where we are getting the token from?
  // we get the token from the backend server when the user logs in.
  // the backend server generates a token (like a JWT) and sends it to the frontend
  // upon successful login. the frontend then calls this login function with that token.
  // to maintain the user's logged-in state across page refreshes or revisits,
  // we check local storage for the token when the AuthProvider component mounts.
  const logout = () => { localStorage.removeItem("token"); setIsLoggedIn(false); };
  // function to handle user logout by removing the token and updating state
  // here, when a user logs out, we remove the authentication token from local storage
  // and set isLoggedIn to false.

  useEffect(() => { setIsLoggedIn(!!localStorage.getItem("token")); }, []);
  // Q. why need to use useEffect to check token in local storage? what it doing here?
  /*
  the useEffect hook is used here to check for the presence of an authentication token
  in local storage when the AuthProvider component mounts.
  this ensures that the isLoggedIn state is correctly initialized based on whether
  a token exists in local storage.
  without this useEffect, the isLoggedIn state would only be set once during the initial
  render based on the initial value from local storage.
  by using useEffect, we ensure that whenever the AuthProvider component is rendered,
  it checks local storage for the token and updates the isLoggedIn state accordingly.
  this is important for maintaining the user's logged-in state across page refreshes
  or revisits to the application.
  */

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
      {/* to ensure that all the childrens components have access to the auth state i.e isLoggedIn, login, and logout functions */}
    </AuthContext.Provider>
  );
};
