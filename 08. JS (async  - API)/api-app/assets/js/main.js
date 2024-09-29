import { API_BASE_URL, endpoints } from "./constants.js";
import { deleteDataById, getAllData } from "./helpers.js";
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
      return x.title.toLowerCase().includes(e.target.value.toLowerCase().trim());
    });
    renderMoviesHTML(searchedMovies);
  });
});

const searchInp = document.querySelector("#search");

function renderMoviesHTML(arr) {
  moviesRow.innerHTML = "";
  arr.forEach((movie) => {
    moviesRow.innerHTML += `<div class="col-3">
                            <div class="card">
                                <div class="img-wrapper">
                                    <img src=${movie.posterSrc}
                                    class="card-img-top" alt="${movie.title}" title="${movie.title}">
                                </div>
                                <div class="card-body">
                                    <h5 class="card-title">${movie.title}</h5>
                                    <p class="m-0">release year: ${movie.releaseYear}</p>
                                    <p class="m-0">genre: ${movie.genre}</p>
                                    <p class="m-0 mb-3">imdb: ${movie.imdb}</p>
                                    <button data-id="${movie.id}" class="btn btn-danger delete">delete</button>
                                    <a href="detail.html?id=${movie.id}" class="btn btn-primary">Details</a>
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
