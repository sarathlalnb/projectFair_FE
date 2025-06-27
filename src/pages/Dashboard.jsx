// rafce
import React, { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import Profile from "../components/Profile";
import Add from "../components/Add";
import View from "../components/View";
import { getUserProjects } from "../services/AllApi";
import { addProjectContext, deleteProjectContext, editProjectContext } from "../../context/ContextApi";



const Dashboard = () => {
  const { addProjectResponse, setAddProjectResponse } =
    useContext(addProjectContext);

      const{ editProjectResponse, setEditProjectResponse } = useContext(editProjectContext)

        const { deleteProjectResponse, setDeleteProjectResponse } = useContext(deleteProjectContext)
  
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    getProjects();
  }, [addProjectResponse,editProjectResponse,deleteProjectResponse]);

  const getProjects = async () => {
    try {
      let token = sessionStorage.getItem("token");
      if (token) {
        let headers = {
          Authorization: `Bearer ${token}`,
        };
        let apiResponse = await getUserProjects(headers);
        if (apiResponse.status == 200) {
          setProjects(apiResponse.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header insideDashboard={true} />
      <div className="row mt-3 mx-2">
        <div className="col-lg-8">
          <h1>
            Welcome <span className="text-warning">username</span>{" "}
          </h1>
          <div>
            <div className="d-flex justify-content-between">
              <h3>All Projects</h3>
              <Add />
            </div>
            <div>
              <View projects={projects} />
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <Profile />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
