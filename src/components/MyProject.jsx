import React, { useContext, useEffect, useState } from "react";
import AddProject from "./AddProject";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EditProject from "./EditProject";
import { deleteAProjectApi, getUserProjectApi } from "../services/allAPI";
import { Link } from "react-router-dom";
import {
  AddProjectResponseStatusContext,
  editProjectResponseContext,
} from "../Context/Context";

const MyProject = () => {
  const [userProject, setUserProject] = useState([]);
  const { addResponse } = useContext(AddProjectResponseStatusContext);
  const { editResponse } = useContext(editProjectResponseContext);
  const getAllUserProject = async () => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");

      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const result = await getUserProjectApi(reqHeader);
      setUserProject(result.data);
      console.log(result.data);
    }
  };

  const deleteProject = async (id) => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");

      const reqHeader = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const result = await deleteAProjectApi(id, reqHeader);
      console.log(result);
      if (result.status == 200) {
        getAllUserProject();
      } else {
        alert("Something went wrong");
      }
    }
  };

  useEffect(() => {
    getAllUserProject();
  }, [addResponse, editResponse]);

  return (
    <div className="shadow m-5 p-3 rounded w-full">
      <div className="d-flex">
        <h3 className="text-success mt-4">My Project</h3>
        <div className="ms-auto mt-4">
          <AddProject />
        </div>
      </div>
      <div className="project_container">
        {userProject?.length > 0 ? (
          userProject?.map((item) => (
            <div
              className="mt-4 p-3 rounded d-flex"
              style={{ background: "rgb(240, 236, 236)" }}
            >
              <h4>{item.title}</h4>
              <div className="ms-auto text-center d-flex justify-content-center gap-3">
                <EditProject project={item} />
                <Link to={item.github} target="_blank">
                  <FontAwesomeIcon icon={faGithub} className="text-success" />
                </Link>
                <FontAwesomeIcon
                  icon={faTrash}
                  className="text-success"
                  onClick={() => deleteProject(item._id)}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-danger mt-5">No Project yet added</p>
        )}
      </div>
    </div>
  );
};

export default MyProject;
