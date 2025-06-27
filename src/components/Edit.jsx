import React, { useContext, useEffect, useState } from "react";
import { FloatingLabel, Form, Modal, Button } from "react-bootstrap";
import { serverURL } from "../services/serverURL";
import { editProject } from "../services/AllApi";
import { editProjectContext } from "../../context/ContextApi";


const Edit = ({ project }) => {

  const{ editProjectResponse, setEditProjectResponse } = useContext(editProjectContext)

  const [validImage, setValidImage] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [previewURL, setPreviewURL] = useState("");
  const imgPlace = `${serverURL}/uploads/${project.projectImg}`;

  const [projectData, setProjectData] = useState({
    title: "",
    language: "",
    overview: "",
    gitLink: "",
    liveLink: "",
    projectImg: "",
  });

  useEffect(() => {
    setProjectData(project);
  }, []);

  useEffect(() => {
    if (
      projectData.projectImg.type == "image/png" ||
      projectData.projectImg.type == "image/jpg" ||
      projectData.projectImg.type == "image/jpeg"
    ) {
      console.log("reached");
      setValidImage(true);
      setPreviewURL(URL.createObjectURL(projectData.projectImg));
      // valid image
    } else {
      setValidImage(false);
      // invalid image
    }
  }, [projectData.projectImg]);

  const onEditClick = async () => {
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
        let pId = project._id

        if (token) {
          let headers = {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
          };

          let apiResponse = await editProject(headers,reqBody,pId);
          if (apiResponse.status == 200) {
            setEditProjectResponse(apiResponse.data)
            alert("Successfully Edited project");
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
      <button onClick={handleShow} className="btn">
        <i class="fa-solid fa-pen-to-square"></i>
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Project Details!</Modal.Title>
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
                  alt="Image"
                />
              </label>
              {!validImage ? (
                <p className="text-warning fw-bold fs-5">
                  *Upload Only the following file types (jpeg, jpg, png) here!!!
                </p>
              ) : (
                " "
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
                  value={projectData?.title || " "}
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
                  value={projectData?.language || " "}
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
                  value={projectData?.overview || " "}
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
                  value={projectData?.gitLink || " "}
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
                  value={projectData?.liveLink || " "}
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
          <Button
            onClick={onEditClick}
            variant="primary"
          >
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Edit;
