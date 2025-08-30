// console.log("HELLO WORLD");

// const myArr = [0,1,2,3,4,5]
// //  console.log(myArr[1]);

//  myArr.push(6)
//  myArr.push(7)
//  myArr.pop()
// //  console.log(myArr);


//  const myArr2 = [0,1,2,3,4,5]
//  const myn2 = myArr2.splice(5)
//  console.log(myn2);
 

const marvel_heros = ["spiderman" , "ironman"]
const dc_heros = ["batman" , "superman"]

// marvel_heros.push(dc_heros)
// const concatAll = marvel_heros.concat(dc_heros)
// console.log(concatAll);

const allHeroes = [...marvel_heros , ...dc_heros]
console.log(allHeroes);

const another_array = [1,2,[3,4,5] , 6 , [7,8,[9,10]]]
 const merge = another_array.flat(Infinity)
 console.log(merge);

 console.log(Array.isArray("Souma"));
 console.log(Array.from("Souma"));
 console.log(Array.from({name : "Souma"}));


 
 

 

 
 