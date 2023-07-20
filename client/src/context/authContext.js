import React, { createContext, useContext, useEffect, useState } from 'react';
import { setUpHandleTokenError } from '../api/axios';
import api from "../api"
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [fetchedUser, setfetchedUser] = useState(false)
  const [user, setUser] = useState();

  useEffect(() => {
    api.auth.getUserContext()
      .then((res) => {
        setUser(res)
      }).finally(() => setfetchedUser(true))
  }, [])


  const login = async (email, password) => {
    const response = await api.auth.login(email, password)
    setUser(response)
  };

  const logout = () => {
    api.auth.logout().catch(err => console.log(err))
    setUser(null);
  };

  setUpHandleTokenError(() => setUser(null))

  const updateProfile = (profilePicture) => {
    setUser({ ...user, profilePicture: profilePicture })
  }

  const updateCover = (coverPicture) => {
    setUser({ ...user, coverPicture })
  }

  if (!fetchedUser)
    return <></>
  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, updateProfile, updateCover }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuthContext = () => useContext(AuthContext)
