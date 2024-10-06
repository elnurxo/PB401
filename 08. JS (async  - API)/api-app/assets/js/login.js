import { API_BASE_URL, endpoints } from "./constants.js";
import { getAllData } from "./helpers.js";

const loginForm = document.querySelector("#login-form");

const users = await getAllData(API_BASE_URL, endpoints.users);
console.log("users: ", users);

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const usernameInp = document.querySelector("#username");
  const passwordInp = document.querySelector("#password");

  const checkValidUser = users.find(
    (x) => x.username === usernameInp.value && x.password === passwordInp.value
  );

  if (checkValidUser) {
    localStorage.setItem("user", JSON.stringify(checkValidUser.id));
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "user signed in successfully!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
        window.location.replace("index.html");
    });
  } else {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "username or password is incorrect!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
});
