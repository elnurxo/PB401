const API_BASE_URL = "https://northwind.vercel.app/api";
const endpoints = {
  categories: "/categories",
  products: "/products",
  suppliers: "/suppliers",
};

//async - await

// const result = fetch("https://northwind.vercel.app/api/categories");

// result
//   .then((response) => {
//     const jsonFormatted = response.json();
//     return jsonFormatted;
//   })
//   .then((data) => {
//     console.log("data: ", data);
//   });

//fetch
fetch(API_BASE_URL + endpoints.categories, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    console.log("data: ", data);
  })
  .catch((err) => {
    console.log("error: ", err);
  });

//GET CATEGORY BY ID
const id = 1;
fetch(API_BASE_URL + endpoints.categories + `/${id}`)
  .then((resp) => resp.json())
  .then((category) => {
    console.log("category (id: 2) - ", category);
  });

async function getData(url, endpoint) {
  try {
    const response = await fetch(url + endpoint);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    console.log("STATUS CODE: ", response.ok);
    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

getData("https://jsonplaceholder.typicode.com/", "/todos");

//HTTP REQUESTS - GET (all, by id, by name (params))
//POST - create
//DELETE - delete, remove
//PUT, PATCH - update, edit

const inp = document.querySelector("input");
const btn = document.querySelector("button");

btn.addEventListener("click", () => {
  const id = inp.value;
  inp.value = "";
  //fetch
  fetch(API_BASE_URL + endpoints.categories + `/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      console.log("response delete: ", response);
      response.json();
    })
    .then(() => {
      window.alert("data deleted!");
    });
});

//post
const postBtn = document.querySelector("#post");

postBtn.addEventListener("click", () => {
  fetch(API_BASE_URL + endpoints.categories, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({
      name: "code academy title",
      description: "lorem ipsum.",
    }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      console.log("post data: ", data);
    })
    .catch((err) => {
      console.log(err);
    });
});

//patch
const patchBtn = document.querySelector("#patch");

patchBtn.addEventListener("click", () => {
  fetch(API_BASE_URL + endpoints.categories + "/2", {
    method: "PATCH",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: "updated NAME" }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

//put
const putBtn = document.querySelector("#put");

putBtn.addEventListener("click", () => {
  fetch(API_BASE_URL + endpoints.categories + "/3", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: "updated PUT NAME" }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
