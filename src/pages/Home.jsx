import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Project_Card from "../components/Project_Card";
import { getHomeProjectApi } from "../services/allAPI";

const Home = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [homeData, seHomeData] = useState([]);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
    getHomeProject();
  }, []);

  const getHomeProject = async () => {
    const result = await getHomeProjectApi();
    // console.log(result);
    seHomeData(result.data);
  };
  console.log(homeData);
  return (
    <>
      <div
        className="container-fluid w-100"
        style={{ backgroundColor: "rgb(70, 221, 70)", height: "100vh" }}
      >
        <Row className="align-items-center p-5">
          <Col sm={12} md={6}>
            <h1 className="text-light" style={{ fontSize: "76px" }}>
              Project Fair
            </h1>
            <p>One stop destination for all softwate development projects</p>
            {!isLogin ? (
              <button className="btn btn-warning me-3">
                <Link
                  to={"/login"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Get Started <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </button>
            ) : (
              <button className="btn btn-warning">
                <Link
                  to={"/dashboard"}
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Manage Projects <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              </button>
            )}
          </Col>
          <Col sm={12} md={6}>
            <img
              height={400}
              width={350}
              src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaW9qOTN3dzRrOGdmYWVudHZ6OTN4ajdtNXF0cWU5OHRjYzh6MXMxdSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/26u6dIwIphLj8h10A/giphy.gif"
              alt=""
              className="rounded shadow"
            />
          </Col>
        </Row>
      </div>
      <div>
        <h1 className="mt-5 text-center">Explore more Projects</h1>{" "}
        <marquee scrollAmount={20}>
          <div className="d-flex">
            {homeData.map((item) => (
              <Project_Card project={item} />
            ))}
          </div>
        </marquee>
        <Link to={"/project"} style={{ textDecoration: "none" }}>
          <p className="text-center mt-4 text-danger">See More Projects</p>
        </Link>
      </div>
    </>
  );
};

export default Home;
