import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";

import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";
import { auth } from "../firebase/firebase.init";

export const AuthContext = createContext(null);
const AuthProvider = ({ children }) => {
  const provider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(true);

  const [userRole, setUserRole] = useState(null);

  const darkModeHandler = () => {
    setDark(!dark);
    document.body.classList.toggle("dark");
  };

  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const updateUserProfile = (updatedData) => {
    setLoading(true);
    return updateProfile(auth.currentUser, updatedData);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setLoading(false);

      console.log("Current user:", currentUser.uid);
      if (currentUser) {
        try {
          const res = await fetch(
            `http://localhost:5000/api/users/${currentUser?.uid}`
          );
          const data = await res.json();
          console.log("User role fetched:", data);
          setUserRole(data.role || "student"); // fallback
        } catch (err) {
          console.error("Error fetching user role:", err);
          setUserRole("student"); // fallback role
        }
      } else {
        setUserRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const signOutUser = () => {
    setLoading(true);
    Swal.fire({
      position: "top-end",
      icon: "warning",
      title: "Are you sure you want to sign out?",
      showCancelButton: true,
      confirmButtonText: `Yes`,
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth);

        return;
      }
    });
  };

  const userInfo = {
    signUp,
    signIn,
    signOutUser,
    signInWithGoogle,
    updateUserProfile,
    darkModeHandler,

    userRole,
    dark,
    user,
    loading,
  };
  return (
    <div>
      <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
