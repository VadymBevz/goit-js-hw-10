
const fetchCountries = searchQuery => {
    const url = https://restcountries.com/v3.1/name/${searchQuery}?fields=name.official,capital,population,flags.svg,languages;
  
    return fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Error fetching countries');
      })
      .then(data => {
        if (data.status === 404) {
          throw new Error('Country not found');
        }
        return data;
      })}