import React, { useContext } from "react";
import { faPowerOff, faSheetPlastic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link, useNavigate } from "react-router-dom";
import { isAuthorizedContext } from "../Context/Context";

const Header = ({ dash }) => {
  const navigate = useNavigate();
  const { setIsAuthorized } = useContext(isAuthorizedContext);
  const handleLogout = () => {
    sessionStorage.removeItem("exisitingUser");
    sessionStorage.removeItem("token");
    setIsAuthorized(false);
    navigate("/");
  };
  return (
    <>
      <Navbar
        expand="lg"
        className="w-100"
        style={{ backgroundColor: "green" }}
      >
        <Container>
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Navbar.Brand href="#home" className="d-flex">
              {" "}
              <FontAwesomeIcon icon={faSheetPlastic} className="me-3 fa-2x" />
              <h2 className="text-light">Project Fair</h2>
            </Navbar.Brand>
          </Link>
          {dash && (
            <button onClick={handleLogout} className="btn btn-warning">
              <FontAwesomeIcon icon={faPowerOff} className="me-2" />
              Logout
            </button>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
