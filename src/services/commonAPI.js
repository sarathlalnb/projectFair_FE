import axios from "axios";
import { serverURL } from "./serverURL";

const commonAPI = async (method, endPoint, reqBody,reqHeader) => {
  const reqConfig = {
    method: method,
    url: serverURL + endPoint,
    data: reqBody,
    headers:reqHeader?reqHeader:{"Content-Type":"application/json"}
  };

  return await axios(reqConfig)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export default commonAPI
