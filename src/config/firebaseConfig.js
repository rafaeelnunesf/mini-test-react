import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnaTri878OWV6YBrI_LQyM10IRGnjmxjM",
  authDomain: "mini-test-react.firebaseapp.com",
  projectId: "mini-test-react",
  storageBucket: "mini-test-react.appspot.com",
  messagingSenderId: "676761247747",
  appId: "1:676761247747:web:2d626c1ec0616795abae36",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
