const tBody = document.querySelector("tbody");
const localBasketArr = JSON.parse(localStorage.getItem("basket"));
const supTotal = document.getElementById("sup-total");
renderSupTotal(localBasketArr);
document.addEventListener("DOMContentLoaded", () => {
  if (localBasketArr) {
    renderTableHTML(localBasketArr);
    const deleteBtns = document.querySelectorAll(".delete");

    deleteBtns.forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", (e) => {
        e.target.closest("tr").remove();
        //local storage delete
        const updatedBasket = JSON.parse(localStorage.getItem("basket")).filter(
          (x) => x.id != e.target.getAttribute("data-id")
        );
        localStorage.setItem("basket", JSON.stringify([...updatedBasket]));
        supTotal.textContent =
          updatedBasket.reduce((acc, prevVal) => {
            return acc + prevVal.price * prevVal.count;
          }, 0) + "$";
      });
    });

    let increaseBtns = document.querySelectorAll(".increase");

    increaseBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        console.log("e: ", e);
        const currentProd = localBasketArr.find(
          (x) => x.id == e.target.getAttribute("data-id")
        );
        currentProd.count++;
        e.target.closest(
          "tr"
        ).children[4].innerHTML = `x<b>${currentProd.count}</b>`;
        e.target.closest("tr").children[6].textContent = `${
          currentProd.price * currentProd.count
        }`;
        renderSupTotal(localBasketArr);
        localStorage.setItem("basket", JSON.stringify([...localBasketArr]));
      });
    });

    const decreaseBtns = document.querySelectorAll(".decrease");

    decreaseBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const currentProd = localBasketArr.find(
          (x) => x.id == e.target.getAttribute("data-id")
        );
        if (currentProd.count == 1) {
          //delete
          const deleteProdIdx = localBasketArr.findIndex(
            (x) => x.id == currentProd.id
          );
          localBasketArr.splice(deleteProdIdx, 1);
          e.target.closest("tr").remove();
        } else {
          currentProd.count--;
          e.target.closest(
            "tr"
          ).children[4].innerHTML = `x<b>${currentProd.count}</b>`;
          e.target.closest("tr").children[6].textContent = `${
            currentProd.price * currentProd.count
          }`;
        }
        renderSupTotal(localBasketArr);
        localStorage.setItem("basket", JSON.stringify([...localBasketArr]));
      });
    });
  }
});

const orderBtn = document.querySelector("#order");

orderBtn.addEventListener("click", () => {
  const supTotal = document.getElementById("sup-total");
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
      supTotal.textContent = "0$";
      localStorage.setItem("basket", JSON.stringify([]));
      tBody.innerHTML = "";
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
});

function renderTableHTML(arr) {
  tBody.innerHTML = "";
  arr.forEach((prod) => {
    tBody.innerHTML += ` <tr>
    <th scope="row">${prod.id}</th>
    <td>${prod.name}</td>
    <td>
    <img width="100" height="50" style="object-fit:cover;" src="${
      prod.src
    }" alt="${prod.name}" title="${prod.name}"/>
    </td>
    <td>${prod.price}</td>
    <td>x<b>${prod.count}</b></td>
    <td>${moment(prod.addDate).format("MMM Do YYYY, h:mm a")}</td>
    <td>${prod.count * prod.price}</td>
    <th scope="col">
        <button data-id="${prod.id}" class="btn btn-primary increase">+</button>
    </th>
    <th scope="col">
        <button data-id="${prod.id}" class="btn btn-primary decrease">-</button>
    </th>
    <th scope="col">
        <button data-id="${
          prod.id
        }" class="btn btn-danger delete">delete</button>
    </th>
  </tr>`;
  });
}

function renderSupTotal(arr) {
  supTotal.textContent =
    arr.reduce((acc, prevVal) => {
      return acc + prevVal.price * prevVal.count;
    }, 0) + "$";
  const basketCount = document.getElementById("basket-count");
  basketCount.textContent = arr.length;
}
