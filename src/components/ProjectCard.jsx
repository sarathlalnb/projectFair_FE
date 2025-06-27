import React, { useState } from "react";
import { Card, Modal } from "react-bootstrap";
import { serverURL } from "../services/serverURL";

const ProjectCard = ({ eachProject }) => {
  console.log(eachProject);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card onClick={handleShow} style={{ width: "18rem" }}>
        <Card.Img
          variant="top"
          src={`${serverURL}/uploads/${eachProject.projectImg}`}
        />
        <Card.Body>
          <Card.Title className="text-center">{eachProject.title}</Card.Title>
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Project Details!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-6">
              <img
                className="img-fluid"
                src={`${serverURL}/uploads/${eachProject.projectImg}`}
                alt=""
              />
            </div>
            <div className="col-lg-6">
              <h2>{eachProject.title}</h2>
              <p>
                <span className="fw-bold">Languages Used : </span>{" "}
                <span className="text-warning">{eachProject.language} </span>{" "}
              </p>
              <p>
                <span className="fw-bold">Project Overview :</span>
                {eachProject.overview}
              </p>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="me-auto fs-2 ">
            <a href={eachProject.gitLink}>
              <i class="fa-brands fa-github"></i>
            </a>
            <a className="ms-3" href={eachProject.liveLink}>
              <i class="fa-solid fa-link"></i>
            </a>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProjectCard;
