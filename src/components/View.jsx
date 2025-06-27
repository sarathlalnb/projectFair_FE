import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Edit from "./Edit";
import { deleteProject } from "../services/AllApi";
import { deleteProjectContext } from "../../context/ContextApi";



const View = ({ projects }) => {
  const { deleteProjectResponse, setDeleteProjectResponse } = useContext(deleteProjectContext)
  const deletProj = async (id) => {
    try {
      let token = sessionStorage.getItem("token");
      if (token) {
        let headers = {
          Authorization: `Bearer ${token}`,
        };

        let apiResponse = await deleteProject(id, headers);

        if (apiResponse.status == 200) {
          setDeleteProjectResponse(apiResponse.data)
          alert("Successfully Deleted");
        } else {
          alert("failed to delete");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {projects ? (
        projects.map((eachProject) => (
          <div className="d-flex justify-content-between border rounded my-2">
            <h1>{eachProject?.title}</h1>
            <div>
              {/* edit btn */}
              <Edit project={eachProject} />
              <a target="_blank" href={eachProject?.gitLink} className="btn">
                <i class="fa-brands fa-github"></i>
              </a>
              <button
                onClick={() => deletProj(eachProject._id)}
                className="btn text-danger"
              >
                <i class="fa-solid fa-trash"></i>
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-danger">No Projects Found</div>
      )}
    </div>
  );
};

export default View;
