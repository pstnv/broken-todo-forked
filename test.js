"5" == 5;
"5" === 5;
"true" === true;
"true" == true;
0 == false;

const obj1 = { prop1: 1 };
const obj2 = { prop1: 1 };
obj1 == obj2;
obj1 === obj2;

const arr1 = [];
const arr2 = [];
const text = "";
arr1 === arr2;
arr1 == text;

const sayHi = function (age) {
  return `${this.name} is ${age}`;
};

const User = { name: "Vasya", sayHi };

sayHi(18);
User.sayHi(20);
