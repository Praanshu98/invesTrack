import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import NavBar from "./components/NavBar.jsx";
import SignUp from "./pages/SignUp.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Logout from "./pages/Logout.jsx";
import Buy from "./pages/Buy.jsx";
import Sell from "./pages/Sell.jsx";

import UserProvider from "./context/userContext.jsx";
import ProtectedRoutes from "./components/ProtectedRoutes.jsx";

import "./index.css";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/buy" element={<Buy />} />
            <Route path="/sell" element={<Sell />} />
          </Route>
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

export default App;
