import React from "react";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faLink } from "@fortawesome/free-solid-svg-icons";
import { serverUrl } from "../services/baseUrl";

const Project_Card = ({ project }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Card
        onClick={handleShow}
        style={{ width: "17rem" }}
        className="ms-3 w-100 shadow mt-4"
      >
        <Card.Img
          variant="top"
          src={
            project ? `${serverUrl}/uploads/${project.projectImage}` : "photo"
          }
          height={"250px"}
        />
        <Card.Body>
          <Card.Text className="text-center">{project?.title}</Card.Text>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{project?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6} sm={12}>
              <img
                src={
                  project
                    ? `${serverUrl}/uploads/${project.projectImage}`
                    : "photo"
                }
                alt=""
                className="w-100"
              />
            </Col>
            <Col md={6} sm={12}>
              <h5 className="fw-semibold">Description</h5>
              <p className="fw-light">{project?.overview}</p>
              <h5 className="fw-semibold">Technologies</h5>
              <p className="fw-light">{project?.language}</p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="me-auto">
          <Link to={project?.github} target="_blank">
            <FontAwesomeIcon icon={faGithub} className="fa-2x" />
          </Link>
          <Link to={project?.website} target="_blank">
            <FontAwesomeIcon icon={faLink} className="fa-2x ms-3" />
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Project_Card;
