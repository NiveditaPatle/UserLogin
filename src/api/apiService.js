import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

const apiHandler = async (
  endpoint,
  method = "GET",
  data = null,
  headers = {}
) => {
  try {
    const response = await axios({
      url: `${API_BASE_URL}${endpoint}`,
      method,
      data,
      headers,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export default apiHandler;
