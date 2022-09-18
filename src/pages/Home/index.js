import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import { useEffect } from "react";
function Home() {
  let navigate = useNavigate();
  const { logout, displayName } = useAuth();

  useEffect(() => {
    if (!displayName) return navigate("/sign-in");
  }, []);

  function handleClose() {
    logout();
    navigate("/sign-in");
  }

  return (
    <>
      <h1>Hello {displayName}</h1>
      <button onClick={handleClose}>Logout</button>
    </>
  );
}

export default Home;
