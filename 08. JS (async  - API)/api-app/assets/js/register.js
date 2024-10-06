import { API_BASE_URL, endpoints } from "./constants.js";
import { getAllData, postData } from "./helpers.js";

const registerForm = document.querySelector("#register-form");

const users = await getAllData(API_BASE_URL, endpoints.users);

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.querySelector("#username");
  const email = document.querySelector("#email");
  const profileImg = document.querySelector("#profileImg");
  const password = document.querySelector("#password");
  const confirmPassword = document.querySelector("#confirm-password");

  //check unique username
  const duplicateUsername = checkUserName(users, username.value);
  if (duplicateUsername) {
    Swal.fire({
      position: "top-end",
      icon: "warning",
      title: "username already taken!",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  //check unique email
  const duplicateEmail = checkEmail(users, email.value);
  if (duplicateEmail) {
    Swal.fire({
      position: "top-end",
      icon: "warning",
      title: "email already taken!",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  //check confirm password match
  if (password.value !== confirmPassword.value) {
    Swal.fire({
      position: "top-end",
      icon: "warning",
      title: "password & confirm password should match!",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  //check password regex (min 1 letter, min 1 digit, min 5 chars)
  const passwordRegex =
    /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9!@#$%^&*]{5,30})$/;
  if (!passwordRegex.test(password.value)) {
    Swal.fire({
      position: "top-end",
      icon: "warning",
      title: "password format invalid!",
      showConfirmButton: false,
      timer: 1500,
    });
    return;
  }

  const newUser = {
    username: username.value,
    email: email.value,
    profileImg: profileImg.value,
    password: password.value,
  };
  //everything works fine

  await postData(API_BASE_URL, endpoints.users, newUser);
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "user sign up successfully!",
    showConfirmButton: false,
    timer: 1500,
  }).then(() => {
    window.location = "http://127.0.0.1:5500/login.html";
  });
});

function checkUserName(users, username) {
  const check = users.find((x) => x.username == username);
  return check;
}

function checkEmail(users, email) {
  const check = users.find((x) => x.email == email);
  return check;
}
