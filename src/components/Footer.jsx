import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faSheetPlastic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="mt-5 w-100 p-4" style={{ backgroundColor: "green" }}>
        <div className="row mx-md-5 mx-3">
          <div className="col-md-4 d-flex flex-column mt-4">
            <div className="heading_footer d-flex ">
              <FontAwesomeIcon icon={faSheetPlastic} className="me-2 fa-2x" />
              <h3 className="text-light">Project Fair</h3>
            </div>
            <p className="text-light" style={{ textAlign: "justify" }}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Error
              iusto ullam ipsam distinctio vero! Explicabo perferendis ut
              aspernatur commodi? Facere velit eos obcaecati tempora quam
              laborum culpa perspiciatis beatae ipsum. Lorem ipsum dolor sit
              amet, consectetur adipisicing elit. Deserunt molestias, nam
              quibusdam.
            </p>
          </div>
          <div className="col-md-1"></div>

          <div className="col-md-1 mt-4">
            <h3 className="text-light">Links</h3>
            <Link
              className="mt-3"
              to={"/"}
              style={{ color: "black", textDecoration: "none" }}
            >
              <p>Home</p>
            </Link>
            <Link
              to={"/project"}
              style={{ color: "black", textDecoration: "none" }}
            >
              <p>Project</p>
            </Link>

            <Link
              to={"/dashboard"}
              style={{ color: "black", textDecoration: "none" }}
            >
              <p>Dashboard</p>
            </Link>
          </div>
          <div className="col-md-1"></div>

          <div className="col-md-2 mt-4">
            <h3 className="text-light">Guides</h3>
            <a
              href="https://react.dev/"
              style={{ color: "black", textDecoration: "none" }}
            >
              <p>React</p>
            </a>
            <a
              href="https://react-bootstrap.netlify.app/"
              style={{ color: "black", textDecoration: "none" }}
            >
              <p>React Bootstrap</p>
            </a>

            <a
              href="https://bootswatch.com/"
              style={{ color: "black", textDecoration: "none" }}
            >
              <p>React Bootwatch</p>
            </a>
          </div>
          <div className="col-md-3 mt-4">
            <h3 className="text-light">Contact Us</h3>
            <div className="d-flex">
              <input
                type="text"
                className="form-control"
                placeholder="Enter email Id"
              />
              <button className="btn btn-warning ms-3">Subscribe</button>
            </div>
            <div className="d-flex justify-content-between mt-3">
              <FontAwesomeIcon
                className="fa-2x text-white"
                icon={faInstagram}
              />
              <FontAwesomeIcon className="fa-2x text-white" icon={faTwitter} />
              <FontAwesomeIcon className="fa-2x text-white" icon={faLinkedin} />
              <FontAwesomeIcon className="fa-2x text-white" icon={faFacebook} />
            </div>
          </div>
        </div>

        <p className="text-center text-light mt-4">
          Copyright ©️ 2024 Project Fair. Built with React.
        </p>
      </div>
    </>
  );
};

export default Footer;
