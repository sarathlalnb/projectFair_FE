import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ContextApi from "../context/ContextApi.jsx";
import LoginContext from "../context/LoginContext.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoginContext>
    <ContextApi>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ContextApi>
    </LoginContext>
  </StrictMode>
);
