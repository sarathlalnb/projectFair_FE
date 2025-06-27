import "./App.css";
import "../bootstrap.min.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Auth from "./pages/Auth";
import Footer from "./components/Footer";
import { useContext } from "react";
import { loginContext } from "../context/LoginContext";

function App() {
  const {isLoggedIn, setLoggedIn} = useContext(loginContext)

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={isLoggedIn? <Dashboard />:  <Navigate to={'/login'} />} />
        <Route path="/projects" element={isLoggedIn? <Projects /> : <Navigate to={'/login'} />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth insideRegister={true} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
