import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addProjectAPI } from "../services/allAPI";
import { AddProjectResponseStatusContext } from "../Context/Context";

const AddProject = () => {
  const { setAddResponse } = useContext(AddProjectResponseStatusContext);
  //state to hold project details
  const [projectdetails, setProjectDetails] = useState({
    title: "",
    language: "",
    github: "",
    website: "",
    overview: "",
    projectImage: "",
  });

  const [key, setKey] = useState(true); //key attribute can invoke onchange events if its value changes
  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState("");
  const [token, setToken] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => {
    setProjectDetails({
      title: "",
      language: "",
      github: "",
      website: "",
      overview: "",
      projectImage: "",
    });
    setPreview("");
    setKey(!key);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const { title, language, github, website, overview, projectImage } =
      projectdetails;
    if (
      !title ||
      !language ||
      !github ||
      !website ||
      !overview ||
      !projectImage
    ) {
      toast.warning("Please fill the form");
    } else {
      console.log(projectdetails);

      //now we can't just upload data with uploaded content to backend we need to use formData
      // 1) create a object for formData class
      const reqBody = new FormData();
      //to add data
      reqBody.append("title", title);
      reqBody.append("language", language);
      reqBody.append("github", github);
      reqBody.append("website", website);
      reqBody.append("overview", overview);
      reqBody.append("projectImage", projectImage);

      if (token) {
        let reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`, //bearer means for verify we don't need any other document
        };
        const result = await addProjectAPI(reqBody, reqHeader);
        console.log(result);
        if (result.status == 200) {
          handleClose();
          handleClose1();
          setAddResponse(result.data);
        } else {
          handleClose();
          handleClose1();
          toast.error("Something went wrong");
        }
      }
    }
  };
  useEffect(() => {
    //file to convert into url

    if (projectdetails.projectImage) {
      setPreview(URL.createObjectURL(projectdetails.projectImage));
    }
  }, [projectdetails.projectImage]);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"));
    } else {
      setToken("");
    }
  }, []);
  console.log(token);

  console.log(projectdetails);

  console.log(preview);

  return (
    <div>
      <Button variant="success" onClick={handleShow}>
        Add Project
      </Button>{" "}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={12} md={6}>
              <label type="image">
                <input
                  id="image"
                  key={key}
                  type="file"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectdetails,
                      projectImage: e.target.files[0],
                    })
                  }
                />
                <img
                  src={
                    preview
                      ? preview
                      : "https://s3.amazonaws.com/ionic-marketplace/image-upload/icon.png"
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
                    placeholder="title"
                    className="form-control w-100"
                    value={projectdetails.title}
                    onChange={(e) =>
                      setProjectDetails({
                        ...projectdetails,
                        title: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={projectdetails.language}
                    placeholder="Language"
                    className="form-control w-100"
                    onChange={(e) =>
                      setProjectDetails({
                        ...projectdetails,
                        language: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={projectdetails.github}
                    placeholder="Github"
                    className="form-control w-100"
                    onChange={(e) =>
                      setProjectDetails({
                        ...projectdetails,
                        github: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    value={projectdetails.website}
                    placeholder="Website"
                    className="form-control w-100"
                    onChange={(e) =>
                      setProjectDetails({
                        ...projectdetails,
                        website: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    placeholder="Overview"
                    value={projectdetails.overview}
                    className="form-control w-100"
                    onChange={(e) =>
                      setProjectDetails({
                        ...projectdetails,
                        overview: e.target.value,
                      })
                    }
                  />
                </div>
              </form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer theme="colored" autoClose={2000} position="top-right" />
    </div>
  );
};

export default AddProject;
