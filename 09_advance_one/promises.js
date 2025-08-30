 const promiseOne = new Promise(function(resolve,reject) {
  //  Do an async task
  // DB calls,Cryptography,Network calls
  setTimeout(function(){
    console.log("Async task completed");
    resolve();

  },1000)
 })

 promiseOne.then(function() {
  console.log("Promise resolved successfully");

 })

 new Promise(function(resolve,reject){
  setTimeout(function(){
    console.log("Async task 2 completed");
    resolve();

  },1000)
 }).then(function(){
  console.log("Promise 2 resolved successfully");
 })


 const promiseThree = new Promise(function(resolve,reject){
  setTimeout(function(){
    resolve({username: "john", email: "john@gmail.com"})
  },1000);
 })


 promiseThree.then(function(user){
  console.log(user);

 })


 const promiseFour = new Promise(function(resolve,reject){
  setTimeout(function(){
    let error = false;
    if(!error){
      resolve({ username: "jane", email: "jane@gmail.com"});
    } else {
      reject("Error: Something went wrong");
    }
  },1000)
 })

 promiseFour.then((user)=>{
  console.log(user);
  return user.username;

 }).then((username)=>{
  console.log(username);

 }).catch((error)=>{
  console.log(error);

 }).finally(()=> console.log("Promise is either resolved or rejected"));


 const promiseFIve = new Promise(function(resolve,reject){
    setTimeout(function(){
    let error = true;
    if(!error){
      resolve({ username: "javascript", password: "hello@123"});
    } else {
      reject("Error: js went wrong");
    }
  },1000)
 })

 async function consumepromiseFive(){
  try {
     const response = await promiseFIve
    console.log(response);
  } catch (error) {
    console.log(error);
  }

 }

 consumepromiseFive();

// async function getAllUsers(){
//   try {
//     const response = await fetch('https://jsonplaceholder.typicode.com/users');
//     const data = await response.json();
//     console.log(data);

//   } catch (error) {
//     console.log("E: ",error);

//   }
// }
// getAllUsers();


fetch('https://api.github.com/users/Souma061')
.then((response)=>{
  return response.json();
}).then((data)=>{
  console.log(data);

}).catch((error)=>{
  console.log("Error: ", error);
})
