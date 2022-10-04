/** Exercise 01 - Fizzbuzz

Write a program that writes all the numbers from 1 to 100, with some exceptions: 
- For numbers divisible by 3, print “fizz” 
- For numbers divisible by 5 (but not 3), print “buzz” 
- For numbers divisible by 3 and 5, print “fizzbuzz”

Use console.log() to write the proper output to the command line.

**/

let val = 1;
const fizzbuzz = () => {
  // Add your code here
  for(val = 0; val < 101; ++val) {
     if (val % 3 === 0 && val % 5 ===0) {
       console.log("fizzbuzz");
     }
     else if (val % 5 ===0 && val % 3 !== 0) {
       console.log("buzz");
     }
     else if (val % 3 === 0) {
       console.log("fizz");
     }
     else {
       console.log(val);
     }
  }
};

fizzbuzz();
// 1
// 2
// fizz
// 4
// buzz
// fizz
// 7
// 8
// fizz
// buzz
// 11
// fizz
// 13
// 14
// fizzbuzz
// ...
