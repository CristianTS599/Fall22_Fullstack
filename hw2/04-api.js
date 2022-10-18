/** Exercise 04 - API **/

const url = "https://restcountries.com/v3.1/all";

// Add your code here

function getData(getUrl) {
  fetch(getUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      let count = 1;
      data.forEach((country) => {
        let item = `${count}. ${country.name.common} - ${country.population}`;
        document.getElementById("results").append(`<li>${item}</li>`);
        ++count;
        console.log(
          `Country Name ${country.name.common} - Population ${country.population}`
        );
      });
    })
    .catch((error) => console.log(error));
}

getData(url);
