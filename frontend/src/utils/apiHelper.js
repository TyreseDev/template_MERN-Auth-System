import axios from "axios";
import { API_CONFIG } from "../config";

const apiHelper = async (url, method = "GET", data = {}, config = {}) => {
  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      data,
      ...API_CONFIG,
      ...config,
    })
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => {
        console.error(`Error making ${method} request:`, error);
        reject(error);
      });
  });
};

export default apiHelper;
