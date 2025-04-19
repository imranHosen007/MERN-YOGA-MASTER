import React, { createContext, useEffect } from "react";
import { useState } from "react";

import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../Config/firebase.config";
import axios from "axios";
export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const auth = getAuth(app);

  // -------Singup-New-User-----
  const singUp = async (email, password) => {
    try {
      setLoading(true);
      return createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.code);
    }
  };
  // -----Login-User-------
  const login = async (email, password) => {
    try {
      setLoading(true);
      return signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.code);
    }
  };
  // ----Logout-----
  const logout = async () => {
    try {
      return await signOut(auth);
    } catch (error) {
      setError(error.code);
    }
  };
  // -----Update-User------
  const updateUser = async (displayName, photoURL) => {
    try {
      await updateProfile(auth.currentUser, {
        displayName: displayName,
        photoURL: photoURL,
      });
      setUser(auth.currentUser);
    } catch (error) {
      setError(error.code);
    }
  };
  // -------Using-Google-Login-----
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = async () => {
    try {
      setLoading(true);
      return await signInWithPopup(auth, googleProvider);
    } catch (error) {
      setError(error.code);
    }
  };
  useEffect(() => {
    const unsubcribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        axios
          .post(`https://mern-yoga-master.onrender.com/jwt`, {
            email: user.email,
            name: user.displayName,
          })
          .then((data) => {
            if (data.data.token) {
              localStorage.setItem("token", data.data.token);
              setLoading(false);
            }
          });
      } else {
        localStorage.removeItem("token");
        setLoading(false);
      }
    });
    return () => {
      return unsubcribe();
    };
  }, []);
  const AuthInfo = {
    user,
    singUp,
    login,
    logout,
    updateUser,
    googleLogin,
    loading,
    error,
    setError,
    setLoading,
  };
  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
