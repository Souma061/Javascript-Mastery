// @ts-ignore
const arr = ["js" , "python" , "java" ,"cpp"];

// arr.forEach(function (item) {
//   console.log(item);

// })

// arr.forEach((value) => {
//   console.log(value);


// })

const language_array = [
  {
    language: "javascript",
    fileName: "js"
  },
  {
    language: "python",
    fileName: "py"
  },
  {
    language: "java",
    fileName: "java"
  },
  {
    language: "cpp",
    fileName: "cpp"
  }
]

myArray.forEach((item) =>{
  // @ts-ignore
  console.log(item.fileName);

})


myArray.every((item) => {
  // @ts-ignore
  console.log(item.language);

})
