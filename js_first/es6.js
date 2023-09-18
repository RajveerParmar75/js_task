// let const  can be used only inside the scope
{
  var a = " var";
  let b = " let";
  const c = "const ";
}
// arrow function
hello = () => {
  console.log("this is arrow func");
};
hello();
// spread opp
var a = [1, 2, 3, 4, 5];
var b = [10, 20, 30];
console.log("this is an spread opp");
console.log(...a, ...b); // 1,2,3,4,5,10,20,30
// rest opp
function sum(...num) {
  console.log("this is an ...rest opp");
  console.log(...num);
}
sum(7896, -54, 23, 12, 45);
// Destructuring on object
let obj = { data: 1, key: "hello" };
const { data, key } = obj;
console.log(key);
// class
class Person {
  constructor(name, key) {
    this.name = name;
    this.key = key;
  }
  print() {
    console.log("name " + this.name + "key " + this.key);
  }
}
let per = new Person("hello", 2);
per.print();

//literals
let num = 10;
console.log(`this is done by literals ${10}`);
// this keyword
const person = {
  firstName: "John",
  lastName: "Doe",
  id: 5566,
  fullName: function () {
    return this.firstName + " " + this.lastName;
  },
};
console.log(person.fullName());
//event listener
document
  .getElementById("myBtn")
  .addEventListener("click", (e) => console.log(e));
// string methods
var str = "NAME    ";
console.log(str.replace("AM", "am"));
console.log(str.split("N"));
console.log(str.trim());
console.log(str.toLowerCase());
console.log(str.indexOf("A"));
console.log(str.endsWith(" "));
console.log(str.includes("NA"));
console.log(str.lastIndexOf("A"));
//array method
var arr = [1, 2, 3, "hello", "a", true, 1.4];
var nums = [1, 2, 3, 4, 5];
console.log(arr.push(500));
console.log(arr.pop());
console.log(arr.shift());
console.log(arr.unshift(5), arr);
console.log(arr.splice(2, 1));
console.log(arr);
// arr.forEach((num) => console.log(num));
console.log(nums.map((num) => num * 2));
console.log(nums.filter((num) => num % 2 === 0));
console.log(nums.reduce((call, inti) => call + inti));
console.log(arr.find((num) => num == "hello"));
const isEven = (num) => num % 2 === 0;
console.log(nums.some(isEven));
console.log(nums.every(isEven));
// localStorage
const person_new = {
  firstName: "John",
  lastName: "Doe",
  id: 5566,
  fullName: function () {
    return this.firstName + " " + this.lastName;
  },
};
localStorage.setItem("new_data", JSON.stringify(person_new));
// localStorage.clear();

//------------- sessionStorage
sessionStorage.setItem("data", JSON.stringify(person_new));
// console.log(JSON.parse(sessionStorage.getItem("data")));

// ---------------------cookie
document.cookie = "username=johndoe";
console.log(document.cookie);
