import React, { useContext, useState } from "react";
import loginImg from "../assets/login.png";
import { FloatingLabel, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { registerUser, loginUSer } from "../services/AllApi";
import Spinner from "react-bootstrap/Spinner";
import { loginContext } from "../../context/LoginContext";

const Auth = ({ insideRegister }) => {
  const { isLoggedIn, setLoggedIn } = useContext(loginContext);
  const navigate = useNavigate();

  const [userData, setUserdata] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const register = async () => {
    if (userData.email && userData.password && userData.userName) {
      try {
        let apiResult = await registerUser(userData);
        console.log(apiResult);
        if (apiResult.status == 201) {
          alert("Successfully Created new user");
        } else {
          alert("Something went wrong,please contact admin");
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("please fill the form");
    }
  };

  const login = async () => {
    if (userData.email && userData.password) {
      try {
        setLoading(true);
        let payload = {
          email: userData.email,
          password: userData.password,
        };

        let apiResult = await loginUSer(payload);

        console.log(apiResult);

        if (apiResult.status == 200) {
          sessionStorage.setItem("token", apiResult.data.token);

          sessionStorage.setItem("user", apiResult.data.userName);
          setLoggedIn(true);
          alert("Login Successfull");

          navigate("/");
        } else {
          alert("Invalid credentials please try again");
        }
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("Please fill the form");
    }
  };

  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex justify-content-center align-items-center "
    >
      <div className="container card p-3">
        <div className="row align-items-center">
          <div className="col-lg-6">
            <img className="img-fluid w-75" src={loginImg} alt="Login Img" />
          </div>
          <div className="col-lg-6">
            <h1>
              <i className="fa-brands fa-docker"></i> Project Fair
            </h1>
            <h5>Sign {insideRegister ? "up" : "in"} to your Account</h5>

            <Form>
              {insideRegister ? (
                <FloatingLabel
                  controlId="floatingInput"
                  label="Username"
                  className="mb-3"
                >
                  <Form.Control
                    onChange={(e) =>
                      setUserdata({ ...userData, userName: e.target.value })
                    }
                    type="text"
                    placeholder="Username"
                  />{" "}
                </FloatingLabel>
              ) : (
                ""
              )}

              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  onChange={(e) =>
                    setUserdata({ ...userData, email: e.target.value })
                  }
                  type="email"
                  placeholder="Enter Your email here"
                />{" "}
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  onChange={(e) =>
                    setUserdata({ ...userData, password: e.target.value })
                  }
                  type="password"
                  placeholder="Password"
                />{" "}
              </FloatingLabel>
            </Form>

            {insideRegister ? (
              <div>
                <button onClick={register} className="btn btn-primary">
                  Register
                </button>
                <p className="mt-2">
                  Existing User? Please Click here to{" "}
                  <Link to={"/login"}>Login</Link>{" "}
                </p>
              </div>
            ) : (
              <div>
                <button onClick={login} className="btn btn-primary">
                  Login {loading ? <Spinner animation="grow" /> : ""}
                </button>
                <p className="mt-2">
                  New User? Please Click here to{" "}
                  <Link to={"/register"}>Register</Link>{" "}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
