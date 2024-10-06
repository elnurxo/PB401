import { API_BASE_URL, endpoints } from "./constants.js";
import { checkUser, deleteDataById, getAllData } from "./helpers.js";
const moviesRow = document.querySelector(".movies-row");
const loader = document.querySelector(".movies-loader");

//dom load
document.addEventListener("DOMContentLoaded", async () => {
  loader.classList.replace("d-none", "d-flex");
  const movies = await getAllData(API_BASE_URL, endpoints.movies);
  loader.classList.replace("d-flex", "d-none");
  renderMoviesHTML(movies);

  searchInp.addEventListener("keyup", (e) => {
    const searchedMovies = movies.filter((x) => {
      return x.title
        .toLowerCase()
        .includes(e.target.value.toLowerCase().trim());
    });
    renderMoviesHTML(searchedMovies);
  });
});

const searchInp = document.querySelector("#search");

function renderMoviesHTML(arr) {
  moviesRow.innerHTML = "";
  const userId = JSON.parse(localStorage.getItem("user"));
  arr.forEach((movie) => {
    moviesRow.innerHTML += `<div class="col-3">
                            <div class="card">
                                <div class="img-wrapper">
                                    <img src=${movie.posterSrc}
                                    class="card-img-top" alt="${
                                      movie.title
                                    }" title="${movie.title}">
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">${movie.title}</h5>
                                    <p class="m-0">release year: ${
                                      movie.releaseYear
                                    }</p>
                                    <p class="m-0">genre: ${movie.genre}</p>
                                    <p class="m-0 mb-3">imdb: ${movie.imdb}</p>
                                    ${
                                      userId ?
                                      `<button data-id="${movie.id}" class="btn btn-danger delete">delete</button>`
                                    : ""}
                                    <a href="detail.html?id=${
                                      movie.id
                                    }" class="btn btn-primary">Details</a>
                                </div>
                            </div>
                        </div>`;

    const deleteBtns = document.querySelectorAll(".delete");
    deleteBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            //delete from UI - html
            e.target.closest(".col-3").remove();
            //delete from API
            const id = e.target.getAttribute("data-id");
            console.log("deleted id: ", id);
            deleteDataById(API_BASE_URL, endpoints.movies, id).then((res) => {
              console.log("response: ", res);
            });
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      });
    });
  });
}

//check navbar for login

window.addEventListener("load", async () => {
  const isLogged = await checkUser();
  renderNavbar(isLogged);
});

function renderNavbar(isLogged) {
  const navLinks = document.querySelector(".nav-links");

  if (isLogged) {
    navLinks.innerHTML = `
      <li><a href="index.html">Home</a></li>
      <li class="text-light">${isLogged.username}</li>
                <li><button class="btn btn-outline-warning sign-out">Sign Out</button></li>
      `;
  } else {
    navLinks.innerHTML = `
    <li><a href="index.html">Home</a></li>
                <li><a href="login.html">Login</a></li>
                <li><a href="register.html">Register</a></li>
    `;
  }

  const signOutBtn = document.querySelector(".sign-out");

  signOutBtn.addEventListener("click", () => {
    Swal.fire({
      title: "Are you sure to log out?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logged out!",
    }).then(async(result) => {
      if (result.isConfirmed) {
        //log out
        const movies = await getAllData(API_BASE_URL, endpoints.movies);
        localStorage.setItem("user", JSON.stringify(null));
        renderMoviesHTML(movies);
        renderNavbar(false);
        Swal.fire({
          title: "Logged Out!",
          text: "User logged out.",
          icon: "success",
        });
      }
    });
  });
}
