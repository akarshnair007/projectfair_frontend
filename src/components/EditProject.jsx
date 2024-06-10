import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { serverUrl } from "../services/baseUrl";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProjectApi } from "../services/allAPI";
import { editProjectResponseContext } from "../Context/Context";

const EditProject = ({ project }) => {
  const { setEditResponse } = useContext(editProjectResponseContext);
  console.log(project);
  const [update, setUpdate] = useState({
    title: project.title,
    language: project.language,
    github: project.github,
    website: project.website,
    overview: project.overview,
    projectImage: "",
  });
  const [preview, setPreview] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    handleClose1();
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (update.projectImage) {
      setPreview(URL.createObjectURL(update.projectImage));
    }
  }, [update.projectImage]);

  const handleClose1 = () => {
    setUpdate({
      title: project.title,
      language: project.language,
      github: project.github,
      website: project.website,
      overview: project.overview,
      projectImage: "",
    });
    setPreview("");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { title, language, github, website, overview, projectImage } = update;
    if (!title || !language || !github || !website || !overview) {
      toast.info("Please fill the form completely");
    } else {
      const reqBody = new FormData();
      reqBody.append("title", title);
      reqBody.append("language", language);
      reqBody.append("github", github);
      reqBody.append("website", website);
      reqBody.append("overview", overview);
      preview
        ? reqBody.append("projectImage", projectImage)
        : reqBody.append("projectImage", project.projectImage);

      const token = sessionStorage.getItem("token");
      if (preview) {
        let reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, //bearer means for verify we don't need any other document
        };
        const result = await updateProjectApi(project._id, reqBody, reqHeader);
        if (result.status == 200) {
          setShow(false);
          setEditResponse(result.data);
        } else {
          console.log(result);
          toast.error("Something went wrong");
        }
      } else {
        let reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, //bearer means for verify we don't need any other document
        };
        const result = await updateProjectApi(project._id, reqBody, reqHeader);
        if (result.status == 200) {
          setShow(false);
          setEditResponse(result.data);
        } else {
          console.log(result);
          toast.error("Something went wrong");
        }
      }
    }
  };

  return (
    <div className="pb-1">
      <FontAwesomeIcon
        icon={faPenToSquare}
        onClick={handleShow}
        className="text-info"
      />
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={6}>
              <label htmlFor="image">
                <input
                  id="image"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setUpdate({ ...update, projectImage: e.target.files[0] })
                  }
                />
                <img
                  src={
                    preview
                      ? preview
                      : `${serverUrl}/uploads/${project.projectImage}`
                  }
                  alt=""
                  className="w-100"
                />
              </label>
            </Col>
            <Col sm={12} md={6}>
              <form>
                <div className="mb-3 mt-5">
                  <input
                    type="text"
                    name="title"
                    value={update.title}
                    onChange={(e) =>
                      setUpdate({ ...update, title: e.target.value })
                    }
                    placeholder="Title"
                    className="form-control w-100"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="language"
                    value={update.language}
                    onChange={(e) =>
                      setUpdate({ ...update, language: e.target.value })
                    }
                    placeholder="Language"
                    className="form-control w-100"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="github"
                    value={update.github}
                    onChange={(e) =>
                      setUpdate({ ...update, github: e.target.value })
                    }
                    placeholder="Github"
                    className="form-control w-100"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="website"
                    value={update.website}
                    onChange={(e) =>
                      setUpdate({ ...update, website: e.target.value })
                    }
                    placeholder="Website"
                    className="form-control w-100"
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    name="overview"
                    value={update.overview}
                    onChange={(e) =>
                      setUpdate({ ...update, overview: e.target.value })
                    }
                    placeholder="Overview"
                    className="form-control w-100"
                  />
                </div>
              </form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1}>
            Close
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer theme="colored" autoClose={2000} position="top-right" />
    </div>
  );
};

export default EditProject;
