import { debounce } from "lodash";
import { fetchCountryData } from "./fetchCountries.js";

const countryInp = document.getElementById("country-inp");
const result = document.getElementById("result");
const DEBOUNCE_DELAY = 300;

const handleInput = debounce(() => {
  const countryName = countryInp.value.trim();
  if (countryName.length === 0) {
    result.innerHTML = `<h3>The input field cannot be empty</h3>`;
  } else {
    fetchCountryData(countryName)
      .then((data) => {
        result.innerHTML = `
          <img src="${data.flags.svg}" class="flag-img">
          <h2>${data.name.common}</h2>
          <div class="wrapper">
              <div class="data-wrapper">
                  <h4>Capital:</h4>
                  <span>${data.capital[0]}</span>
              </div>
          </div>
          <div class="wrapper">
              <div class="data-wrapper">
                  <h4>Continent:</h4>
                  <span>${data.continents[0]}</span>
              </div>
          </div>
           <div class="wrapper">
              <div class="data-wrapper">
                  <h4>Population:</h4>
                  <span>${data.population}</span>
              </div>
          </div>
          <div class="wrapper">
              <div class="data-wrapper">
                  <h4>Currency:</h4>
                  <span>${data.currencies[Object.keys(data.currencies)[0]].name} - ${Object.keys(data.currencies)[0]}</span>
              </div>
          </div>
           <div class="wrapper">
              <div class="data-wrapper">
                  <h4>Common Languages:</h4>
                  <span>${Object.values(data.languages).toString().split(",").join(", ")}</span>
              </div>
          </div>
        `;
      })
      .catch(() => {
        result.innerHTML = `<h3>Please enter a valid country name.</h3>`;
      });
  }
}, DEBOUNCE_DELAY);

countryInp.addEventListener("input", handleInput);
