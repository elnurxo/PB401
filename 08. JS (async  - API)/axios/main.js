axios
  .get("http://localhost:3000/products")
  .then((result) => {
    console.log(result.data);
  })
  .catch((err) => {
    console.log(err);
  });

//delete
document.querySelector("#delete").addEventListener("click", () => {
  axios
    .post("http://localhost:3000/users", {
      username: "elnur123",
      password: "Elnur123",
    })
    .then((res) => {
      console.log(res);
    });
});
