import {
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";

async function register({ name, email, password }) {
  await createUserWithEmailAndPassword(auth, email, password);
  return await updateProfile(auth.currentUser, { displayName: name });
}

const login = async () => {};

const logout = async () => {};

export { register, login, logout };

const api = { register, login, logout };

export default api;
