/** Exercise 01 - Coins **/

const calculateChange = (input) => {
  // Add your code here

  //if (typeof input != typeof number) {
  //console.log("Error: Please enter a number.");
  //}
  if (input > 10 || input < 0) {
    return "Error: Value must be between 0 and 10";
  }
  if (input === 0) {
    return "No Change.";
  }

  var dollar = 0;
  var quarter = 0;
  var dime = 0;
  var nickel = 0;
  var penny = 0;

  var out = "";

  while (input > 0) {
    if (input > 1) {
      dollar += 1;
      input -= 1;
    } else if (input > 0.25) {
      quarter += 1;
      input -= 0.25;
    } else if (input > 0.1) {
      dime += 1;
      input -= 0.1;
    } else if (input > 0.05) {
      nickel += 1;
      input -= 0.05;
    } else {
      if (input < 0.02) {
        penny += 1;
        input = 0;
      } else {
        penny += 1;
        input -= 0.01;
      }
    }
  }

  if (dollar !== 0) {
    out += dollar + ` dollar${dollar === 1 ? `` : `s`}, `;
  }
  if (quarter !== 0) {
    out += quarter + ` quarter${quarter === 1 ? `` : `s`}, `;
  }
  if (dime !== 0) {
    out += dime + ` dime${dime === 1 ? `` : `s`}, `;
  }
  if (nickel !== 0) {
    out += nickel + ` nickel${nickel === 1 ? `` : `s`}, `;
  }
  if (penny !== 0) {
    out += penny + ` penn${penny === 1 ? `y` : `ies`}`;
  }

  return out;
};

// Sample Test Cases
console.log(calculateChange(4.62));
// $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
console.log(calculateChange(9.74));
// $9.74 ==> 9 dollars, 2 quarters, 2 dimes, 4 pennies
console.log(calculateChange(0.16));
// $0.16 ==> 1 dime, 1 nickel, 1 penny
console.log(calculateChange(15.11));
// $15.11 ==> Error: the number is too large
