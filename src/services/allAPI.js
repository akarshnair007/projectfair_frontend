import { commonAPi } from "./commonApi";
import { serverUrl } from "./baseUrl";

//register
export const registerAPI = async (reqbody) => {
  return await commonAPi("POST", `${serverUrl}/user/register`, reqbody, "");
};
export const loginAPI = async (reqbody) => {
  return await commonAPi("POST", `${serverUrl}/user/login`, reqbody, "");
};
export const addProjectAPI = async (reqbody, reqHeader) => {
  return await commonAPi("POST", `${serverUrl}/projects`, reqbody, reqHeader);
};
//getHomeProject
export const getHomeProjectApi = async () => {
  return await commonAPi("GET", `${serverUrl}/home-project`, "", "");
};
export const getAllProjectApi = async (searchKey) => {
  //query parameter = path?key=value
  return await commonAPi(
    "GET",
    `${serverUrl}/all-project?search=${searchKey}`,
    "",
    ""
  );
};

export const getUserProjectApi = async (reqHeader) => {
  return await commonAPi("GET", `${serverUrl}/user/all-project`, "", reqHeader);
};

export const deleteAProjectApi = async (id, reqHeader) => {
  return await commonAPi(
    "DELETE",
    `${serverUrl}/delete-project/${id}`,
    {},
    reqHeader
  );
};

//update project
export const updateProjectApi = async (id, reqbody, reqHeader) => {
  return await commonAPi(
    "PUT",
    `${serverUrl}/update-project/${id}`,
    reqbody,
    reqHeader
  );
};

//update profile
export const updateProfileApi = async (reqbody, reqHeader) => {
  return await commonAPi(
    "PUT",
    `${serverUrl}/update-profile`,
    reqbody,
    reqHeader
  );
};
