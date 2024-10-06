import { API_BASE_URL, endpoints } from "./constants.js";

//get all data
export async function getAllData(url, endpoint) {
  try {
    const response = await axios.get(url + endpoint);
    console.log("STATUS CODE: ", response.status);
    return response.data; // Return the response data
  } catch (error) {
    console.error(error.message);
    throw error; // Optional: rethrow the error if you want to handle it elsewhere
  }
}
//get data by id
export async function getDataById(url, endpoint, id) {
  try {
    const response = await axios.get(`${url}${endpoint}?id=${id}`);
    console.log("STATUS CODE: ", response.status);
    return response.data; // Return the response data
  } catch (error) {
    console.error(error.message);
    throw error; // Optional: rethrow the error if you want to handle it elsewhere
  }
}
//delete data by id
export async function deleteDataById(url, endpoint, id) {
  try {
    const response = await axios.delete(`${url}${endpoint}/${id}`);
    console.log("STATUS CODE: ", response.status);
    return response.data; // Return the response data, if applicable
  } catch (error) {
    console.error(error.message);
    throw error; // Optional: rethrow the error if you want to handle it elsewhere
  }
}

//post data
export async function postData(url, endpoint, payload) {
  try {
    const response = await axios.post(`${url}${endpoint}`, payload);
    return response.data; // Return the response data, if applicable
  } catch (error) {
    console.error(error.message);
    throw error; // Optional: rethrow the error if you want to handle it elsewhere
  }
}

//check user
export async function checkUser() {
  if (!localStorage.getItem("user")) {
    localStorage.setItem("user", null);
  }

  const userId = JSON.parse(localStorage.getItem("user"));

  //check user id from API
  const user = await getDataById(API_BASE_URL, endpoints.users, userId);

  if (user.length > 0) return user[0];
  else return false;
}
