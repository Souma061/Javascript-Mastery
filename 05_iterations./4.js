
const myObject = {
  js:'javascript',
  py: 'python',
  cpp: 'c++'
};

for (const key in myObject) {

  console.log(`${key} is for ${myObject[key]}`);


}
