// import { debounce } from "lodash";
import { fetchCountryData } from "./fetchCountries.js";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { debounce } from 'lodash';

const countryInp = document.getElementById("country-inp");
const suggestionsList = document.createElement("ul");
countryInp.after(suggestionsList);
const DEBOUNCE_DELAY = 300;

const handleInput = debounce(() => {
  const countryName = countryInp.value.trim();
  if (countryName.length === 0) {
    Notify.failure('The input field cannot be empty');
    suggestionsList.innerHTML = "";
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
        Notify.failure('Please enter a valid country name');
      });

      fetch(`https://restcountries.com/v3.1/name/${countryName}`)
  .then((response) => response.json())
  .then((data) => {
    suggestionsList.innerHTML = "";
    const numCountries = data.length;
    if (numCountries > 10) {
      const tooManyMatches = document.createElement("li");
      Notify.failure(`Too many matches found. Please be more specific.`);
      suggestionsList.appendChild(tooManyMatches);
    } else if (numCountries >= 2 && numCountries <= 10) {
      data.forEach((country) => {
        const suggestionItem = document.createElement("li");
        const countryName = country.name.common;
        const flagUrl = country.flags.svg;
        const flagImg = document.createElement("img");
        flagImg.src = flagUrl;
        flagImg.alt = countryName + " flag";
        flagImg.width = 20;
        flagImg.height = 20;
        suggestionItem.appendChild(flagImg);
        suggestionItem.appendChild(document.createTextNode(countryName));
        suggestionsList.append(suggestionItem);
      });
      const noMatches = document.createElement("li");
      Notify.failure("Oops there is no country with that name");
      suggestionsList.appendChild(noMatches);
    }
  })
  .catch(() => {
    suggestionsList.innerHTML = "";
  });

  }
}, DEBOUNCE_DELAY);

countryInp.addEventListener("input", handleInput);
