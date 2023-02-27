import { fetchCountries } from "./fetchCountries.js";
import { Notify }  from 'notiflix/build/notiflix-notify-aio';

const searchBtn = document.getElementById("search-btn");
const countryInp = document.getElementById("country-inp");
const result = document.getElementById("result");
const DEBOUNCE_DELAY = 300;

// Función para mostrar mensaje de error
const showError = (message) => {
  Notify.failure(message);
};

// Función para mostrar un solo país
const showCountry = (country) => {
  result.innerHTML = `
    <img src="${country.flags.svg}" class="flag-img">
    <h2>${country.name.common}</h2>
    <div class="wrapper">
        <div class="data-wrapper">
            <h4>Capital:</h4>
            <span>${country.capital[0]}</span>
        </div>
    </div>
    <div class="wrapper">
        <div class="data-wrapper">
            <h4>Continent:</h4>
            <span>${country.continents[0]}</span>
        </div>
    </div>
    <div class="wrapper">
        <div class="data-wrapper">
            <h4>Population:</h4>
            <span>${country.population}</span>
        </div>
    </div>
    <div class="wrapper">
        <div class="data-wrapper">
            <h4>Currency:</h4>
            <span>${
              country.currencies[Object.keys(country.currencies)].name
            } - ${Object.keys(country.currencies)[0]}</span>
        </div>
    </div>
    <div class="wrapper">
        <div class="data-wrapper">
            <h4>Common Languages:</h4>
            <span>${Object.values(country.languages)
              .toString()
              .split(",")
              .join(", ")}</span>
        </div>
    </div>
  `;
};

// Función para mostrar la lista de países
const showCountriesList = (countries) => {
  const countriesList = document.createElement("div");
  countriesList.classList.add("countries-list");

  countries.forEach((country) => {
    const countryCard = document.createElement("div");
    countryCard.classList.add("country-card");

    const countryFlag = document.createElement("img");
    countryFlag.src = country.flags.svg;
    countryFlag.classList.add("flag-img");

    const countryName = document.createElement("h2");
    countryName.textContent = country.name.common;

    countryCard.appendChild(countryFlag);
    countryCard.appendChild(countryName);
    countriesList.appendChild(countryCard);
  });

  result.innerHTML = "";
  result.appendChild(countriesList);
};

// Función para mostrar los resultados de búsqueda
const displayResults = (data) => {
  if (data.length === 0) {
    Notify.failure("Oops there is no country with that name");
  } else if (data.length === 1) {
    showCountry(data[0]);
  } else if (data.length > 10) {
    Notify.failure("Too many matches found. Please enter a more specific name");
  } else if (data.length < 10 && data.length >= 2) {
    showCountriesList(data);
  }
};

// Función que se ejecuta al hacer clic en el botón de búsqueda
const debounceSearchCountry = _.debounce(() => {
  const countryName = countryInp.value;
  const finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

  fetchCountries(finalURL)
    .then((data) => {
      displayResults(data);
    })
  }, DEBOUNCE_DELAY); 

  searchBtn.addEventListener('click', debounceSearchCountry);