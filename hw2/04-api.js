/** Exercise 04 - API **/

const url = "https://restcountries.com/v3.1/all";

// Add your code here

function getData(getUrl) {
  fetch(getUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        document.getElementById("ErrorLabel").value = "Failed To Call API";
        document.getElementById("ErrorLabel").hidden = false;
      }
    })
    .then((data) => {
      console.log(data);
      data.forEach((country) => {
        let item = `${country.name.common} - ${new Intl.NumberFormat().format(
          country.population
        )}`;
        let listItem = document.createElement("li");
        listItem.appendChild(document.createTextNode(item));
        document.querySelector("ol").append(listItem);
        console.log(
          `Country Name ${country.name.common} - Population ${country.population}`
        );
      });
    })
    .catch((error) => {
      document.getElementById("ErrorLabel").value = "Failed To Call API";
      document.getElementById("ErrorLabel").hidden = false;
    });
}

getData(url);
