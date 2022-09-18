import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";
async function register({ email, password }) {
  return await createUserWithEmailAndPassword(auth, email, password);
}

const login = async () => {};

const logout = async () => {};

export { register, login, logout };

const api = { register, login, logout };

export default api;
