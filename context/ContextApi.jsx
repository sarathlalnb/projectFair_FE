import React, { createContext, useState } from "react";

export const addProjectContext = createContext();

export const editProjectContext = createContext();

export const deleteProjectContext = createContext();

const ContextApi = ({ children }) => {
  const [addProjectResponse, setAddProjectResponse] = useState([]);
  const [editProjectResponse, setEditProjectResponse] = useState([]);
  const [deleteProjectResponse, setDeleteProjectResponse] = useState([]);

  return (
    <addProjectContext.Provider
      value={{ addProjectResponse, setAddProjectResponse }}
    >
      <editProjectContext.Provider
        value={{ editProjectResponse, setEditProjectResponse }}
      >
        <deleteProjectContext.Provider
          value={{ deleteProjectResponse, setDeleteProjectResponse }}
        >
          {children}
        </deleteProjectContext.Provider>
      </editProjectContext.Provider>
    </addProjectContext.Provider>
  );
};

export default ContextApi;
