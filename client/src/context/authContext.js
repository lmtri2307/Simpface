import React, { createContext, useContext, useEffect, useState } from 'react';
import axiosInstance, { setUpHandleTokenError } from '../api/axios';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [fetchedUser, setfetchedUser] = useState(false)
  const [user, setUser] = useState();

  useEffect(() => {
    axiosInstance.get(`${process.env.REACT_APP_BACK_END}auth`)
      .then((res) => {
        setUser(res.data)
      }).finally(() => setfetchedUser(true))
  }, [])


  const login = async (email, password) => {
    const response = await axiosInstance.post(`${process.env.REACT_APP_BACK_END}auth/login`,
      {
        email,
        password
      }
    )
    setUser(response.data)
    console.log(response.data)
  };

  const logout = () => {
    axiosInstance.get(`${process.env.REACT_APP_BACK_END}auth/logout`).catch(err => console.log(err))
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
