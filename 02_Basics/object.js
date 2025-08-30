
// let mySym = Symbol("key1")
// const user = {
//     name : "Soumabrata" , 
//     [mySym] : "mykey1",
//     "full name" : "Soumabrata Ghosh",
//     age : 20 , 
//     loaction : "Howrah" ,
//     email : "soumabrataghosh@gmail.com"
// }

// console.log(user.name);
// console.log(user["email"]);
// console.log(user["name"]);
// console.log(user["full name"]);
// console.log( user[mySym]);

// user.email = "soumabrata@gmail.com"
// console.log(user);
//  Object.freeze(user)
// user.age = 23
// console.log(user);

// user.greeting = function() {
//     console.log(`hello user , ${this.name}`);
    
// }
// user.greeting()

// ============+++==============
//singleton object
 const appUser = new Object()

 appUser.name = "Soumabrata"
 appUser.id = "123abc"
 appUser.location = "Howrah"

//  console.log(appUser);

const obj1 = {1 : "a" , 2 : "b"}
const obj2 = {3 : "b" , 4 : "a"}

// const obj3 = Object.assign( {}, obj1 , obj2)
// console.log(obj3);
// console.log(obj3 == obj1);

const obj3 = {...obj1 , ...obj2}
// console.log(obj3);




const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

// console.log(target);
// Expected output: Object { a: 1, b: 4, c: 5 }

// console.log(returnedTarget === target);
// Expected output: true

const student = {
    student_name : "Soumabrata",
    student_age : 20,
    student_roll : 20240061
}

const {student_name : s_name} = student

console.log(s_name);




 




