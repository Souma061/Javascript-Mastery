const user = {
    username: "souma",
    price: 848787,
    pincode:711113,

    welcomeMessage: function() {
        console.log(`welcome ${this.username} to our website`);
        console.log(this);
        
        
    }

}
// user.welcomeMessage();
// user.username = "ram"
// user.welcomeMessage();

// console.log(this);

// function one() {
//     // console.log(this);

    
// }
// one(); // window object in browser, global object in node

// const two = function() {
//    let username = "souma"
//     console.log(this.username);
    
// }
// two();
const two =() =>{
   let username = "souma"
    console.log(this);
    
}
// two();

// const add = (num1 , num2) => {
//     return num1 + num2;
// }
// console.log(add(3 , 4)); output 7

// const add = (num1 , num2) => (num1 + num2);
// console.log(add(3 , 4));  output 7

const add = (num1 , num2) => ({username:"souma"});
console.log(add(3 , 4)); // output { username: 'souma' }        



console.log(add(3 , 4).username); // output souma
