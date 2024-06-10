import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Row, Col } from "react-bootstrap";
import Project_Card from "../components/Project_Card";
import { Link } from "react-router-dom";
import { getAllProjectApi } from "../services/allAPI";

const Project = () => {
  const [allProject, setAllProject] = useState([]);
  const [token, setToken] = useState("");
  const [searchKey, setSearchJey] = useState("");

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
      getAllProject();
    }
  }, [searchKey]);

  const getAllProject = async () => {
    const result = await getAllProjectApi(searchKey);
    setAllProject(result.data);
    console.log(result);
  };
  console.log(allProject);

  console.log(searchKey);
  return (
    <>
      <Header />

      <div className="mt-5">
        <h2 className="text-center">All Projects</h2>
      </div>
      <div className="row mt-5 d-flex justify-content-center">
        <div className="col-md-4"></div>

        <div className="col-md-4 d-flex w-100 p-4 justify-content-center">
          <input
            type="text"
            className="form-control w-25 me-3"
            placeholder="Search by Technologies"
            onChange={(e) => setSearchJey(e.target.value)}
          />

          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            rotate={90}
            className="text-secondary"
            style={{ marginTop: "12px", marginLeft: "-39px" }}
          />
        </div>
        <div className="col-md-4"></div>
      </div>
      {token ? (
        <div>
          {allProject?.length > 0 ? (
            <div>
              <Row className="mt-5">
                {allProject.map((item) => (
                  <Col sm={12} md={6} lg={4}>
                    <Project_Card project={item} />
                  </Col>
                ))}
              </Row>
            </div>
          ) : (
            <div className="mt-5">
              <h1 className="text-danger text-center fs-3">
                No project to display...
              </h1>
            </div>
          )}
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center flex-column">
          <img
            src="https://img.freepik.com/free-vector/locker_53876-25496.jpg?size=626&ext=jpg&ga=GA1.1.1224184972.1715040000&semt=ais"
            alt=""
            style={{ width: "20%" }}
          />

          <h3 className="mt-4 text-danger">
            Please <Link to={"/login"}>Login</Link> to See more Projects
          </h3>
        </div>
      )}
    </>
  );
};

export default Project;
