import { BrowserRouter, Route, Routes } from "react-router-dom";

import SignUp from "./pages/signUp/signUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
