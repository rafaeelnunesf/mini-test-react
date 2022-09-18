import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AlertProvider } from "./contexts/AlertContext";
import Alert from "./components/Alert";
import SignUp from "./pages/signUp/signUp";

function App() {
  return (
    <AlertProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <Alert />
    </AlertProvider>
  );
}

export default App;
