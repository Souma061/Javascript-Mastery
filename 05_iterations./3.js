// for of
let arr = [1 , 2 , 3 , 4 ,5]
for(const num of arr) {
  // console.log(num);

}

const greetings = "Hello World!"

for(const greet of greetings) {
  if(greet === " ") {

    continue;
  }
  // console.log(greet);

}

const map = new Map([
  ["IND", "India"],
  ["USA", "United States"],
  ["UK", "United Kingdom"]
]);

for(const [key , value] of map) {
  console.log(`${key} : ${value}`);

}
