// rafce
import React, { useState, useEffect, useContext } from "react";
import { Button, FloatingLabel, Form, Modal } from "react-bootstrap";
import imgPlace from "../assets/placeholder.png";
import { createProject } from "../services/AllApi";
import { addProjectContext } from "../../context/ContextApi";

const Add = () => {
  const { addProjectResponse, setAddProjectResponse } =
    useContext(addProjectContext);

  const [show, setShow] = useState(false);
  const [validImage, setValidImage] = useState(true);
  const [previewURL, setPreviewURL] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [projectData, setProjectData] = useState({
    title: "",
    language: "",
    overview: "",
    gitLink: "",
    liveLink: "",
    projectImg: "",
  });

  useEffect(() => {
    if (
      projectData.projectImg.type == "image/png" ||
      projectData.projectImg.type == "image/jpg" ||
      projectData.projectImg.type == "image/jpeg"
    ) {
      setValidImage(true);
      setPreviewURL(URL.createObjectURL(projectData.projectImg));
      // valid image
    } else {
      setValidImage(false);
      // invalid image
    }
  }, [projectData.projectImg]);

  const onAddClick = async () => {
    if (
      projectData.title &&
      projectData.gitLink &&
      projectData.language &&
      projectData.liveLink &&
      projectData.overview &&
      projectData.projectImg
    ) {
      try {
        const reqBody = new FormData();
        reqBody.append("title", projectData.title);
        reqBody.append("gitLink", projectData.gitLink);
        reqBody.append("liveLink", projectData.liveLink);
        reqBody.append("overview", projectData.overview);
        reqBody.append("projectImg", projectData.projectImg);
        reqBody.append("language", projectData.language);

        const token = sessionStorage.getItem("token");

        if (token) {
          let headers = {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          };

          let apiResponse = await createProject(headers, reqBody);
          if (apiResponse.status == 201) {
            setAddProjectResponse(apiResponse.data)
            alert("Successfully Created new project");
            handleClose();
          } else {
            alert("Something went wrong,contact admin");
          }
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      alert("Please fill the form");
    }
  };

  return (
    <>
      <button onClick={handleShow} className="btn btn-primary">
        <i class="fa-solid fa-plus"></i> Add Project
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        j
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>New Project Details!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row align-items-center">
            <div className="col-lg-5">
              <label>
                <input
                  onChange={(e) =>
                    setProjectData({
                      ...projectData,
                      projectImg: e.target.files[0],
                    })
                  }
                  style={{ display: "none" }}
                  type="file"
                  name=""
                  id=""
                />
                <img
                  className="img-fluid"
                  src={previewURL ? previewURL : imgPlace}
                  alt=""
                />
              </label>
              {!validImage ? (
                <p className="text-warning fw-bold fs-5">
                  *Upload Only the following file types (jpeg, jpg, png) here!!!
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="col-lg-7">
              <FloatingLabel
                controlId="floatingInput"
                label="Project Title"
                className="mb-3"
              >
                <Form.Control
                  onChange={(e) =>
                    setProjectData({ ...projectData, title: e.target.value })
                  }
                  type="text"
                  placeholder="Project Title"
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Project Languages"
                className="mb-3"
              >
                <Form.Control
                  onChange={(e) =>
                    setProjectData({ ...projectData, language: e.target.value })
                  }
                  type="text"
                  placeholder="Project Languages"
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Project Overview"
                className="mb-3"
              >
                <Form.Control
                  onChange={(e) =>
                    setProjectData({ ...projectData, overview: e.target.value })
                  }
                  type="text"
                  placeholder="Project Overview"
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Project Github Link"
                className="mb-3"
              >
                <Form.Control
                  onChange={(e) =>
                    setProjectData({ ...projectData, gitLink: e.target.value })
                  }
                  type="text"
                  placeholder="Project Github Link"
                />
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Project Live Link"
                className="mb-3"
              >
                <Form.Control
                  onChange={(e) =>
                    setProjectData({ ...projectData, liveLink: e.target.value })
                  }
                  type="text"
                  placeholder="Project Live Link"
                />
              </FloatingLabel>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button disabled={!validImage} onClick={onAddClick} variant="primary">
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Add;
