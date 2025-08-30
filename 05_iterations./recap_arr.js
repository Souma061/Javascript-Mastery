let arr = "My name is Souma";

// Method 1: Using split(), reverse(), and join()
let reversed1 = arr.split('').reverse().join('');
console.log("Method 1 - Split, Reverse, Join:", reversed1); // Output: "AMUOS"

// Method 2: Using spread operator with reverse()
let reversed2 = [...arr].reverse().join('');
console.log("Method 2 - Spread Operator:", reversed2); // Output: "AMUOS"

// Method 3: Using a for loop (manual approach)
let reversed3 = '';
for (let i = arr.length - 1; i >= 0; i--) {
    reversed3 += arr[i];
}
console.log("Method 3 - For Loop:", reversed3); // Output: "AMUOS"

// Method 4: Using Array.from() with reverse()
let reversed4 = Array.from(arr).reverse().join('');
console.log("Method 4 - Array.from():", reversed4); // Output: "AMUOS"

// Method 5: Using reduce() method
let reversed5 = arr.split('').reduce((acc, char) => char + acc, '');
console.log("Method 5 - Reduce:", reversed5); // Output: "AMUOS"

// If you want to work with an actual array of characters
let charArray = arr.split(''); // ["S", "O", "U", "M", "A"]
console.log("Original array:", charArray);
// console.log("Original as string:", charArray.join('')); // "SOUMA"

// let reversedArray = charArray.reverse(); // ["A", "M", "U", "O", "S"]
// console.log("Reversed array:", reversedArray);
// console.log("Reversed as string:", reversedArray.join('')); // "AMUOS"

// Note: reverse() mutates the original array
// If you want to keep the original array unchanged, use slice() first
let originalArray = arr.split('');
// let reversedCopy = originalArray.slice().reverse();
// console.log("Original unchanged:", originalArray); // ["S", "O", "U", "M", "A"]
// console.log("Original unchanged as string:", originalArray.join('')); // "SOUMA"
// console.log("Reversed copy:", reversedCopy); // ["A", "M", "U", "O", "S"]
// console.log("Reversed copy as string:", reversedCopy.join('')); // "AMUOS"









