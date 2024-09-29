//sync func
function displayFullName(fName, sName) {
  return `${fName} ${sName}`;
}

const x = 4 + 5;

const fullName = displayFullName("Elnur", "Khalilov");
console.log(fullName);

//Promise object

const promiseObj = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("foo error");
  }, 500);
});

promiseObj
  .then((data) => {
    console.log("resolved data: ", data);
  })
  .catch((err) => {
    console.log("error: ", err);
  })
  .finally(() => {
    console.log("finally");
  });

function syncSum(x, y) {
  return x + y;
}


//async function
async function asyncSum(x, y) {
  await setTimeout(() => {
    console.log("hello async");
  }, 1000);
  return x + y;
}

const getData = async () => {
  let data = await "Hello World";
  throw new Error("unexpected error");
  return data;
};

console.log(getData());

getData()
  .then((x) => console.log(x))
  .catch((err) => {
    console.log("error: ", err);
  });
