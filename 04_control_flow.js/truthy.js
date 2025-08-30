// const usermail = "souma@email.com"

// if(usermail) {
//     console.log("valid email");
     
// } else {
//     console.log("invalid email");
    
// } // output: valid email

// --------------------------------------------------------
// const usermail = ""

// if(usermail) {
//     console.log("valid email");
     
// } else {
//     console.log("invalid email");
    
// } // output: invalid email

// -----------------------------------------------------------

// const usermail = []
// if(usermail) {
//     console.log("valid email");
     
// } else {
//     console.log("invalid email");
    
// } // output: valid email

// -----------------------------------------------------------
// const usermail = "souma@email.com";

// const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// if(emailPattern.test(usermail)) {
//     console.log("valid email");
// } else {
//     console.log("invalid email");
// }
// How to validate email properly
// output: valid email

// falsy values in javascript

// 0 , "" , null , undefined , NaN, false , -0 , Bigint 0n
// falsy values are those which are considered false in boolean context
// truthy values are those which are considered true in boolean context
// truthy values are all other values except falsy values
// truthy values in javascript:

// "hello" , 1 , [], {}, true, function() {}, Symbol(), BigInt(1), new Date(), Infinity, -Infinity , "0"
// truthy values are those which are considered true in boolean context
// falsy values are those which are considered false in boolean context
// console.log(Boolean(0)); // false
// console.log(Boolean("")); // false
// console.log(Boolean(null)); // false
// console.log(Boolean(undefined)); // false
// console.log(Boolean(NaN)); // false
// console.log(Boolean(false)); // false
// console.log(Boolean("hello")); // true
// console.log(Boolean(1)); // true
// console.log(Boolean([])); // true
// console.log(Boolean({})); // true
// console.log(Boolean(true)); // true
// console.log(Boolean(function() {})); // true
// console.log(Boolean(Symbol())); // true
// console.log(Boolean(BigInt(1))); // true
// console.log(Boolean(new Date())); // true
// console.log(Boolean(Infinity)); // true  


const emptyObj = {}

if(Object.keys(emptyObj).length === 0) {
    console.log("Object is empty");
} else {
    console.log("object is not empty");
    
}

//nullish coalescing operator (??) is used to provide a default value for null or undefined values

// ✅ ?? Nullish Coalescing Operator in JavaScript
// The nullish coalescing operator (??) is used to provide a default value when the left-hand side is null or undefined.

// 🔸 Syntax:
// js
// Copy
// Edit
// let result = value ?? defaultValue;
// If value is not null or undefined, it returns value.

// If value is null or undefined, it returns defaultValue.

// 🔍 Example 1: Basic usage
// js
// Copy
// Edit
// let username;
// let displayName = username ?? "Guest";

// console.log(displayName); // Output: "Guest"
// ✅ Here, username is undefined, so it falls back to "Guest".

// 🔍 Example 2: null value
// js
// Copy
// Edit
// let age = null;
// let displayAge = age ?? 18;

// console.log(displayAge); // Output: 18
// ✅ Since age is null, the result is the default 18.

// 🔍 Example 3: Difference from || (logical OR)
// js
// Copy
// Edit
// let count = 0;
// let result1 = count || 10;  // Output: 10
// let result2 = count ?? 10;  // Output: 0

// console.log(result1); // 10
// console.log(result2); // 0
// ✅ || returns the right value if the left is falsy (0, "", false, etc.)

// ✅ ?? only returns the right value if the left is null or undefined, not just falsy.

// ⚠️ Use Case: Avoid overriding valid falsy values like 0 or ""
// js
// Copy
// Edit
// let input = "";
// let result = input ?? "default";
// console.log(result); // Output: ""  ✅
// If you had used || instead of ??, you would get "default", which might be incorrect if "" is a valid input.

// ✅ Summary
// Expression	value	Output of value ?? "default"
// null	null	"default"
// undefined	undefined	"default"
// ""	empty string	""
// 0	number zero	0
// false	boolean false	false

console.log(1 + true + "3");
