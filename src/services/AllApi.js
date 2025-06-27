import commonAPI from "./commonAPI";

export const registerUser = async (reqBody) => {
  return await commonAPI("post", "/register", reqBody);
};

export const loginUSer = async (reqBody) => {
  return await commonAPI("post", "/login", reqBody);
};

export const createProject = async (reqHeader, reqBody) => {
  return await commonAPI("post", "/addProject", reqBody, reqHeader);
};

export const getLimitedProject = async () => {
  return await commonAPI("get", "/getLimitedProjects", "");
};

export const getAllProjects = async (reqHeader, searchKey) => {
  return await commonAPI(
    "get",
    `/getAllProjects?search=${searchKey}`,
    "",
    reqHeader
  );
};

export const getUserProjects = async (reqHeader) => {
  return await commonAPI("get", "/getUserProjects", "", reqHeader);
};

export const editProject = async (reqHeader, reqBody, id) => {
  return await commonAPI("put", `/editProject/${id}`, reqBody, reqHeader);
};

export const deleteProject = async (id, reqHeader) => {
  return await commonAPI("delete", `/deleteProject/${id}`, {}, reqHeader);
};

export const editProfile = async (reqBody, reqHeader) => {
  return await commonAPI("patch", "/editProfile", reqBody, reqHeader);
};
