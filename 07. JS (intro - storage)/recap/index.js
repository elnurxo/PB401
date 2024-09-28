//regular func
//func signature

function sum(x, y) {
  return x + y;
}

//arrow func - ECMA6
const sumArrow = (x, y) => x + y;

//anonym func - function declaration (expression)
const sumAnonym = function (x, y) {
  return x + y;
};

const greeting = (function () {
  console.log("hello");
})();
