console.log("hello world");

(function one() {
    console.log("DB CONNECTED");
    
})(); 
// IIFE - Immediately Invoked Function Expression

//iife use for avoiding global scope poluton and also for creating private variables and functions & immediately invoking the function

( (name) => {
    console.log(`DB CONNECTED to ${name}`);    //passing parameter to iife
    
}) ("souma");

//named iife  
(function two() {
    console.log("souma"); 
    
}) ();