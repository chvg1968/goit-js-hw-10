export function fetchCountryData(countryName) {
  const finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  return fetch(finalURL).then((response) => {
    if (response.ok) {
      return response.json().then((data) => {
        return data[0];
      });
    } else {
      throw new Error("Network response was not ok.");
    }
  });
}



