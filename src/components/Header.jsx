// rafce
import React, { useContext } from "react";
import { Container, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { loginContext } from "../../context/LoginContext";

const Header = ({ insideDashboard }) => {
  const { isLoggedin, setLoggedIn } = useContext(loginContext);
  const navigate = useNavigate();

  const onLogoutClick = () => {
    sessionStorage.clear();
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <Navbar className=" position-sticky top-0 border shadow">
      <Container className="d-flex">
        <div>
          <Navbar.Brand href="/" className="text-light fs-3 fw-bold">
            <i className="fa-brands fa-docker"></i> Project Fair
          </Navbar.Brand>
        </div>
        {insideDashboard ? (
          <button onClick={onLogoutClick} className="btn btn-link fw-bold fs-5">
            logout <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        ) : (
          ""
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
