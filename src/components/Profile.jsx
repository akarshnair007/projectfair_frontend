import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect } from "react";
import Collapse from "react-bootstrap/Collapse";
import { useState } from "react";
import { serverUrl } from "../services/baseUrl";
import { updateProfileApi } from "../services/allAPI";
import { toast } from "react-toastify";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    github: "",
    linkedin: "",
    profile: "",
  });

  const [existingImage, setExistingImage] = useState("");
  const [preview, setPreview] = useState("");
  const [updateStatus, setUpdateStatus] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { username, email, password, github, profile, linkedin } =
      userDetails;
    if (!github || !linkedin) {
      alert("Please fill the form completely");
    } else {
      const reqBody = new FormData();
      reqBody.append("username", username);
      reqBody.append("email", email);
      reqBody.append("password", password);
      reqBody.append("github", github);
      reqBody.append("linkedin", linkedin);
      preview
        ? reqBody.append("profile", profile)
        : reqBody.append("profile", existingImage);

      const token = sessionStorage.getItem("token");
      if (preview) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        };
        const result = await updateProfileApi(reqBody, reqHeader);
        if (result.status == 200) {
          toast.success("Profile updated successfully");
          sessionStorage.setItem("existingUser", JSON.stringify(result.data));
          setUpdateStatus(!updateStatus);
        } else {
          console.log(result);
          toast.error("Something went wrong");
        }
      } else {
        const result = await updateProfileApi(reqBody, reqHeader);

        const reqHeader = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        if (result.status == 200) {
          toast.success("Profile updated successfully");
          sessionStorage.setItem("existingUser", JSON.stringify(result.data));
          setUpdateStatus(!updateStatus);
        } else {
          console.log(result);
          toast.error("Something went wrong");
          setUpdateStatus(!updateStatus);
        }
      }
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("existingUser")) {
      const user = JSON.parse(sessionStorage.getItem("existingUser"));
      setUserDetails({
        ...userDetails,
        username: user.username,
        email: user.mailId,
        password: user.password,
        github: user.github,
        linkedin: user.linkedIn,
      });
      setExistingImage(user.profile);
    }
  }, [updateStatus]);

  useEffect(() => {
    if (userDetails.profile) {
      setPreview(URL.createObjectURL(userDetails.profile));
    } else {
      setPreview("");
    }
  }, [userDetails.profile]);

  console.log(userDetails);

  return (
    <div
      className="shadow my-5 mx-3 p-3 rounded "
      onMouseEnter={() => setOpen(true)}
    >
      <div className="d-flex justify-content-between">
        <h3 className="mt-3">Profile</h3>
        <div className="mt-3">
          <button
            onClick={() => setOpen(!open)}
            className="btn btn-outline-info"
          >
            {open ? (
              <FontAwesomeIcon icon={faAngleUp} />
            ) : (
              <FontAwesomeIcon icon={faAngleDown} />
            )}
          </button>
        </div>
      </div>
      <Collapse in={open}>
        <div>
          <div className="mt-4 d-flex justify-content-center align-items-center flex-column">
            <label htmlFor="image">
              <input
                id="image"
                type="file"
                style={{ display: "none" }}
                onChange={(e) => {
                  setUserDetails({
                    ...userDetails,
                    profile: e.target.files[0],
                  });
                }}
              />
              {existingImage == "" ? (
                <img
                  src={
                    preview
                      ? preview
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPu9rLl_Q9_q1lTkJoYuxKxjP9SYpgicWcWfjRcA6pRA&s"
                  }
                  alt=""
                  height={"200px"}
                  width={"200px"}
                  style={{ borderRadius: "50%" }}
                />
              ) : (
                <img
                  src={
                    preview ? preview : `${serverUrl}/uploads/${existingImage}`
                  }
                  alt=""
                  height={"200px"}
                  width={"200px"}
                  style={{ borderRadius: "50%" }}
                />
              )}
            </label>

            <div className="w-100 mb-3 mt-3">
              <input
                type="text"
                placeholder="Github"
                value={userDetails.github}
                className="form-control w-100"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, github: e.target.value })
                }
              />
            </div>
            <div className="w-100 mb-3">
              <input
                type="text"
                value={userDetails.linkedin}
                placeholder="Linkedin"
                className="form-control w-100"
                onChange={(e) =>
                  setUserDetails({ ...userDetails, linkedin: e.target.value })
                }
              />
            </div>
            <div className="w-100 mb-3">
              <button
                className="btn w-100"
                style={{ backgroundColor: "green", color: "white" }}
                onClick={handleUpdate}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </Collapse>
    </div>
  );
};

export default Profile;
