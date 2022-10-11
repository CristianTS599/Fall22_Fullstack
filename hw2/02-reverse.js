/** Exercise 02 - Reverse **/

// Add your code here

const reverseInput = () => {
  let out = "";
  let inner = "";
  let input = document.getElementById("input").value;

  // regexp for positive 8 digit
  const pos8Digit = new RegExp("^\\d{8}$").test(input);

  // regexp for negative 8 digit
  const neg8Digit = new RegExp("^-\\d{8}$").test(input);

  if (pos8Digit || neg8Digit) {
    if (neg8Digit) {
      input = input.replace("-", "");
      out = "-";
    }
    for (let i = input.length - 1; i >= 0; --i) {
      out += input[i];
    }
    inner = `${neg8Digit ? "-" : ""}${input} -> ${out}`;
  } else {
    inner = `Error: Value must be an 8 digit number.`;
  }

  document.getElementById(`result`).innerText = inner;
  document.getElementById("result").hidden = false;
  console.log(inner);
};
