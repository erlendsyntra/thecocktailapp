const myArray = ["one", "two", 3, 4, true];

const [el1, , el2, ...rest] = myArray;

console.log(rest);
