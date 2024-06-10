import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link, json, useNavigate } from "react-router-dom";
import { faSheetPlastic } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { loginAPI, registerAPI } from "../services/allAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isAuthorizedContext } from "../Context/Context";

const Auth = ({ register }) => {
  const { setIsAuthorized } = useContext(isAuthorizedContext);

  //state to hold the userDetails
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  let registerForm = register ? true : false;

  const submitRegister = async (e) => {
    e.preventDefault();

    const { username, email, password } = user;

    if (!username || !email || !password) {
      toast.info("Please fill the form");
    } else {
      const result = await registerAPI(user);
      console.log(result);
      if (result.status == 200) {
        toast.success("Registered Successfully");
        setUser({
          username: "",
          email: "",
          password: "",
        });
        navigate("/login");
      } else {
        toast.error(result.response.data);
      }
    }
  };

  const userLogin = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    if (!email || !password) {
      toast.info("Please fill the form!");
    } else {
      const result = await loginAPI(user);
      console.log(result);

      if (result.status == 200) {
        toast.success("Login Successfull");
        sessionStorage.setItem(
          "existingUser",
          JSON.stringify(result.data.exisitingUser)
        );
        sessionStorage.setItem("token", result.data.token);
        setUser({
          email: "",
          password: "",
        });
        setTimeout(() => {
          navigate("/");
        }, 3000);
        setIsAuthorized(true);
      } else {
        toast.error(result.response.data);
      }
    }
  };

  return (
    <div
      className="w-100 d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="w-75 container">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          {" "}
          <h4 className="fw-semibold">
            {" "}
            <FontAwesomeIcon icon={faArrowLeft} className="me-3" />
            Back to home
          </h4>
        </Link>

        <div className="rounded mt-5" style={{ backgroundColor: "green" }}>
          <Row>
            <Col sm={12} md={6}>
              <img
                src="https://png.pngtree.com/png-vector/20191003/ourmid/pngtree-user-login-or-authenticate-icon-on-gray-background-flat-icon-ve-png-image_1786166.jpg"
                alt=""
                className="w-100"
              />
            </Col>
            <Col
              sm={12}
              md={6}
              className="d-flex flex-column justify-content-center align-items-center"
            >
              <h2 className="mt-3">
                {" "}
                <FontAwesomeIcon icon={faSheetPlastic} className="me-2 fa-1x" />
                Project Fair
              </h2>

              {registerForm ? (
                <h4>Sign Up to Your Account</h4>
              ) : (
                <h4>Sign in to your account</h4>
              )}
              <Form className="m-3 w-75 mt-3 mb-5">
                {register && (
                  <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Username"
                      value={user.username}
                      onChange={(e) =>
                        setUser({
                          ...user,
                          username: e.target.value,
                        })
                      }
                    />
                  </Form.Group>
                )}

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        email: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        password: e.target.value,
                      })
                    }
                  />
                </Form.Group>
                {registerForm ? (
                  <div>
                    {" "}
                    <Button
                      variant="warning"
                      type="submit"
                      className="w-100"
                      onClick={(e) => submitRegister(e)}
                    >
                      Register
                    </Button>
                    <p className="text-light mt-3">
                      Already, a user? Click here to{" "}
                      <Link to={"/login"}>Login</Link>
                    </p>
                  </div>
                ) : (
                  <div>
                    <Button
                      variant="warning"
                      type="submit"
                      className="w-100 mb-2"
                      onClick={(e) => userLogin(e)}
                    >
                      Login
                    </Button>
                    <p className="text-light mt-3">
                      New User? Click here to{" "}
                      <Link to={"/register"}>Register</Link>
                    </p>
                  </div>
                )}
              </Form>
            </Col>
          </Row>
        </div>
      </div>
      <ToastContainer theme="colored" autoClose={2000} position="top-right" />
    </div>
  );
};

export default Auth;
