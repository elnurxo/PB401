let addBasketButtons = document.querySelectorAll(".add-to-basket");
let id = 1;

const localBasketArr = JSON.parse(localStorage.getItem("basket"));
const basketCount = document.getElementById("basket-count");

if (!localBasketArr) {
  localStorage.setItem("basket", JSON.stringify([]));
} else {
  basketCount.textContent = localBasketArr.length;
}

addBasketButtons.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    // console.log("this - ", this);
    const prodName = e.target.parentElement.children[0].textContent;
    const prodPrice = Number(
      e.target.previousElementSibling.previousElementSibling.textContent.replace(
        "$",
        ""
      )
    );
    const prodImg =
      e.target.parentElement.previousElementSibling.children[0].getAttribute(
        "src"
      );
    const prodObj = {
      id: id++,
      name: prodName,
      price: prodPrice,
      src: prodImg,
      addDate: new Date(),
      count: 1,
    };

    const basketArr = JSON.parse(localStorage.getItem("basket"));
    const duplicate = basketArr.find((prod) => prod.name == prodObj.name);
    const basketCount = document.getElementById("basket-count");

    if (duplicate) {
      duplicate.count++;
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Item count increased!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      basketArr.push(prodObj);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Item added to basket!",
        showConfirmButton: false,
        timer: 1500,
      });
    }

    basketCount.textContent = basketArr.length;
    localStorage.setItem("basket", JSON.stringify(basketArr));
  });
});

//dark mode
const mode = document.querySelector(".mode");
const modeLocal = sessionStorage.getItem("mode");
if (!modeLocal) {
  sessionStorage.setItem("mode", "light mode");
}

mode.addEventListener("click", (e) => {
  if (e.target.textContent === "dark mode") {
    //switch to dark mode
    sessionStorage.setItem("mode", "dark mode");
    document.body.classList.add("bg-dark");
    document.querySelector("nav").classList.add("bg-dark");
    e.target.textContent = "light mode";
  } else {
    //switch to light mode
    sessionStorage.setItem("mode", "light mode");
    document.body.classList.remove("bg-dark");
    document.querySelector("nav").classList.remove("bg-dark");
    e.target.textContent = "dark mode";
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const currentMode = sessionStorage.getItem("mode");
  if (currentMode === "dark mode") {
    document.body.classList.add("bg-dark");
    mode.textContent = "light mode";
    document.querySelector("nav").classList.add("bg-dark");
  } else {
    document.body.classList.remove("bg-dark");
    mode.textContent = "dark mode";
    document.querySelector("nav").classList.remove("bg-dark");
  }
});
