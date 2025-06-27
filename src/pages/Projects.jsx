// rafce
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Col, Row } from "react-bootstrap";
import ProjectCard from "../components/ProjectCard";
import { getAllProjects } from "../services/AllApi";

const Projects = () => {
  const [projectData, setProjectData] = useState([]);
  const [searchKey,setSearchKey] = useState("")

  useEffect(() => {
    getProjects();
  }, [searchKey]);

  const getProjects = async () => {
    let token = sessionStorage.getItem("token");
    let header = {
      Authorization: `Bearer ${token} `,
    };

    let apiResponse = await getAllProjects(header,searchKey);
    if (apiResponse.status == 200) {
      setProjectData(apiResponse.data);
    }
  };

  return (
    <>
      <Header />
      <div className="container d-flex justify-content-between my-2">
        <h1>All Projects</h1>
        <input
         onChange={(e)=>setSearchKey(e.target.value)}
          placeholder="Search Projects by language"
          className="form-control w-25"
          type="text"
        />
      </div>
      <Row className="mx-2">
        {projectData
          ? projectData.map((eachProject) => (
              <Col className="mb-2" lg={3} md={6} sm={12}>
                <ProjectCard eachProject={eachProject} />
              </Col>
            ))
          : ""}
      </Row>
    </>
  );
};

export default Projects;
