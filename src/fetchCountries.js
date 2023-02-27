export const fetchCountries = async (countryName) => {
	const finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
	const response = await fetch(finalURL);
	const data = await response.json();
	return data;
  };
  
  
  




