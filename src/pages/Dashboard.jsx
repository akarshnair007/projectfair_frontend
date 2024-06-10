import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Col, Row } from "react-bootstrap";
import Profile from "../components/Profile";
import MyProject from "../components/MyProject";

const Dashboard = ({ dashboard }) => {
  const dash = dashboard;
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("existingUser")) {
      setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username);
    }
  }, []);
  return (
    <div>
      <Header dash={dash} />
      <div className="mt-5">
        <h1 className="ms-3">
          Welcome <span className="text-warning">{username}</span>
        </h1>
        <Row className="mt-4 mx-3">
          <Col sm={12} md={8}>
            <MyProject />
          </Col>
          <Col sm={12} md={4}>
            <Profile />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Dashboard;
