import { createContext } from "react";
import { auth } from "../config/firebaseConfig";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  async function register({ name, email, password }) {
    await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(auth.currentUser, { displayName: name });
    await setPersistence(auth, browserLocalPersistence);
  }

  async function login({ email, password }) {
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function logout() {
    await signOut(auth);
  }

  async function googleLogin() {
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    return user;
  }

  return (
    <AuthContext.Provider
      value={{
        auth,
        login,
        logout,
        register,
        googleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
