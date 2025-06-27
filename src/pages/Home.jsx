// rafce
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import landingImg from "../assets/landingImg.png";
import Projects from "./Projects";
import ProjectCard from "../components/ProjectCard";
import { getLimitedProject } from "../services/AllApi";

const Home = () => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    getProjects();
  }, []);

  const getProjects = async () => {
    try {
      let apiResult = await getLimitedProject();
      if (apiResult.status == 200) {
        setProjectData(apiResult.data);
      } else {
        alert("failed to fetch projects");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onProjectClick = () => {
    if (sessionStorage.getItem("token")) {
      navigate("/projects");
    } else {
      alert("please login");
    }
  };

  return (
    <>
      <div
        style={{ minHeight: "100vh" }}
        className="d-flex justify-content-center align-items-center shadow rounded"
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 style={{ fontSize: "80px" }}>
                {" "}
                <i class="fa-brands fa-docker"></i> Project Fair
              </h1>
              <p style={{ textAlign: "center" }}>
                One Stop Destination for all Software Development Projects.
                Where User can add and manage their projects. As well as access
                all projects available in our website... What are you waiting
                for!!!
              </p>
              {sessionStorage.getItem("token") ? (
                <Link to={"/dashboard"} className="btn btn-primary">
                  Manage your projects
                </Link>
              ) : (
                <Link to={"/login"} className="btn btn-warning">
                  Start To Explore
                </Link>
              )}
            </div>
            <div className="col-lg-6">
              <img src={landingImg} alt="Landing Image" className="img-fluid" />
            </div>
          </div>
        </div>
      </div>
      <div className="text-center my-5">
        <h1 className="mb-3">Explore Our Projects</h1>
        <marquee>
          <div className="d-flex gap-5">
            {projectData
              ? projectData?.map((eachProject) => (
                  <ProjectCard eachProject={eachProject} />
                ))
              : ""}
          </div>
        </marquee>

        <button onClick={onProjectClick} className="btn btn-link mt-5">
          Click here to view more projects
        </button>
      </div>

      <div className="text-center">
        <h1 className="my-5">Our Testimonials</h1>
        <div className="d-md-flex justify-content-around">
          <div style={{ width: "16rem" }} className="card text-center">
            <div>
              <img
                className="img-fluid w-25"
                src="https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Free-File-Download.png"
                alt=""
              />
            </div>
            <div className="text-warning">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
            <p>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
          <div style={{ width: "16rem" }} className="card text-center">
            <div>
              <img
                className="img-fluid w-25"
                src="https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Free-File-Download.png"
                alt=""
              />
            </div>
            <div className="text-warning">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
            <p>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
          <div style={{ width: "16rem" }} className="card text-center">
            <div>
              <img
                className="img-fluid w-25"
                src="https://www.pngplay.com/wp-content/uploads/12/User-Avatar-Profile-PNG-Free-File-Download.png"
                alt=""
              />
            </div>
            <div className="text-warning">
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
              <i class="fa-solid fa-star"></i>
            </div>
            <p>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
