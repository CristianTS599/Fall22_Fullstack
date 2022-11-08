const express = require('express');
const axios = require('axios');
const { response } = require('express');

const app = express();
const port = process.env.PORT || 5001;

// Use Pug as the templating engine
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// REST Countries URL
const url = 'https://restcountries.com/v3.1/all';

const GetAPIDataByFilter = async (dataFilter) => {
  let result = [];

  let apiResponse = await axios.get(url).then((countries) => {
    return countries;
  });

  Object.entries(apiResponse.data).forEach((country) => {
    if (dataFilter === 'Capitals') {
      result.push(`${country[1].name.common} - ${country[1].capital}`);
    }
  });

  console.log(apiResponse);

  //axios.get(url).then((response) => {
  //  let allCountries = Object.entries(response.data);
  //  let localResult = [];
  //  allCountries.forEach((country) => {
  //    console.log(country[0]);
  //    if (dataFilter === 'Capitals') {
  //      localResult.push(`${country[1].name.common} - ${country[1].capital}`);
  //    } else if (dataFilter === 'Popilous') {
  //      if (country[1].population >= 50000000000) {
  //        localResult.push(
  //          `${country[1].name.common} - ${country[1].population}`
  //        );
  //      }
  //    } else if (dataFilter === 'Regions') {
  //    }
  //
  //    if (country[0] === '249') {
  //      console.log('hello');
  //      return localResult;
  //    }
  //    let atest = country[1];
  //    let name = atest.name.common;
  //  });
  //});
  return result;
};

const getData = async () => {
  let result = await GetAPIDataByFilter('Capitals');
  console.log(result);
  return result;
};

// Add your code here
app.get('/', (req, res) => {
  // render pug template for the index.html file

  res.render('index', {
    heading: 'Countries of the World',
    main: 'Welcome to this application. Using the REST Countries API, we will be showing the countries and capitals of the world, the most populous countries in the world, and the number of countries in each region of the world',
  });
});

app.get('/capitals', (req, res) => {
  // map the output array to create an array with country names and capitals
  // check for empty data in the output array

  axios.get(url).then((response) => {
    //let allCountries = Object.entries(response.data);
    let result = [];

    Object.entries(response.data).forEach((country) => {
      result.push(`${country[1].name.common} - ${country[1].capital}`);

      if (country[0] === (response.data.length - 1).toString()) {
        result.sort();
        res.render('page', {
          heading: 'Countries and Capitals',
          results: result,
        });
      }
    });
  });
});

app.get('/populous', (req, res) => {
  // filter the output array for the countries with population of 50 million or more
  // sort the resulting array to show the results in order of population
  // map the resulting array into a new array with the country name and formatted population
  axios.get(url).then((response) => {
    let allCountries = Object.entries(response.data);
    let localResult = [];

    allCountries.forEach((country) => {
      console.log(country[0]);

      if (country[1].population >= 50000000)
        localResult.push({
          name: country[1].name.common,
          pop: country[1].population,
        });

      if (country[0] === (response.data.length - 1).toString()) {
        let sortedResult = [];
        localResult.sort((x, y) => x.pop - y.pop);
        localResult.forEach((ctry) =>
          sortedResult.push(
            `${ctry.name} - ${new Intl.NumberFormat().format(ctry.pop)}`
          )
        );
        res.render('page', {
          heading: 'Most Populous Countries',
          results: sortedResult,
        });
      }
    });
  });
});

app.get('/regions', (req, res) => {
  // reduce the output array in a resulting object that will feature the numbers of countries in each region
  // disregard empty data from the output array

  axios.get(url).then((response) => {
    let allCountries = Object.entries(response.data);
    let localResult = [];

    allCountries.forEach((country) => {
      console.log(country[0]);

      let alreadyExists = localResult.findIndex(
        (ctry) => ctry.region === country[1].region
      );
      if (alreadyExists > -1) {
        localResult[alreadyExists].count += 1;
      } else {
        localResult.push({ region: country[1].region, count: 1 });
      }
      if (country[0] === (response.data.length - 1).toString()) {
        let sortedResult = [];

        localResult.forEach((ctry) =>
          sortedResult.push(`${ctry.region} - ${ctry.count}`)
        );

        sortedResult.sort();
        res.render('page', {
          heading: 'Regions of the World',
          results: sortedResult,
        });
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
