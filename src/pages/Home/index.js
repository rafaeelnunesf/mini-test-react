import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import Header from "../../components/Header";

function Home() {
  let navigate = useNavigate();
  const { logout, auth } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!user) return navigate("/sign-in");

      setUser(user);
    });
  }, [auth]);

  function handleClose() {
    logout();
    navigate("/sign-in");
  }

  return (
    <>
      <Header displayName={user?.displayName} logout={handleClose} />
    </>
  );
}

export default Home;
