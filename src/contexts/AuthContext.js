import { createContext, useState } from "react";
import { auth } from "../config/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(auth.currentUser | null);

  async function register({ name, email, password }) {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName: name });
    setUser(auth.currentUser);
  }

  async function login({ email, password }) {
    await signInWithEmailAndPassword(auth, email, password);
    setUser(auth.currentUser);
  }

  async function logout() {
    signOut();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        displayName: user.displayName,
        photoURL: user.photoURL,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
