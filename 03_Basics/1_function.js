// console.log("hello world");

function addTwonumbers(number1 , number2) {
    console.log(number1 + number2);
    
}
function addTwonumbers(number1 , number2) {
    let result = number1 + number2
    return result
    
}

// const result = addTwonumbers(3 , 4)
// console.log("Result: " , result);
// console.log(typeof result);


//  function loggedin(username) {
//     if(!username) {
//         console.log(loggedin("souma"));
//         return
        
//     }
   
//     return `${username} just logged in`
//  }

//  loggedin()
 

function addshoppingcart(val1 , val2, ...num1) { //rest operator(...num1)
    return num1
}

// console.log(addshoppingcart(200,78,895,5145));

const user = {
    username : "souma",
    price : 848787
}

// function handleObject(anyobject) {
//     console.log(`username is ${anyobject.username} and price is ${anyobject.price}`);
    
// }

// handleObject(user)

const myArray = [455 ,4556 , 78 , 78]

function returnArray(array) {
    return array[2]
}

// console.log(returnArray(myArray));
// console.log(returnArray[452 , 755 ,452 , 56]);


function one() {
    const username = "souma"
    function two() {
        const website = "youtube"
        console.log(username);
        
    }
    
    // console.log(website);
    two()
    
} 
one()
