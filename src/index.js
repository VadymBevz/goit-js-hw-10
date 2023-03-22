import './css/styles.css';

const DEBOUNCE_DELAY = 300;
import debounce from 'lodash.debounce';
import fetchCountries from './fetchCountries.js';

const searchBox = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');

const renderCountryList = countries => {
  countryList.innerHTML = '';
  const countryListItems = countries.map(createCountryListItem);
  countryList.append(...countryListItems);
};

const handleSearch = event => {
  const searchQuery = event.target.value.trim();
  if (searchQuery) {
    fetchCountries(searchQuery)
      .then(countries => renderCountryList(countries))
      .catch(error => console.log(error));
  }
};

searchBox.addEventListener('input', debounce(handleSearch, 300));

const handleInput = debounce(() => {
  const searchTerm = searchBox.value.trim();
  function renderCountryList(countries) {
    const countryList = document.querySelector('.country-list');
    countryList.innerHTML = '';
  
    if (countries.length > 10) {
      notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (countries.length > 1 && countries.length <= 10) {
      const listItems = countries.map(country => `
        <li>
          <img src="${country.flags.svg}" alt="Flag of ${country.name.official}" width="50">
          <span>${country.name.official}</span>
        </li>
      `).join('');
  
      const html = `<ul>${listItems}</ul>`;
      countryList.insertAdjacentHTML('beforeend', html);
    } else if (countries.length === 1) {
      const countryData = countries[0];
      const html = `
        <div class="country-card">
          <img src="${countryData.flags.svg}" alt="Flag of ${countryData.name.official}" width="200">
          <div class="country-card-info">
            <h2>${countryData.name.official}</h2>
            <p><strong>Capital:</strong> ${countryData.capital}</p>
            <p><strong>Population:</strong> ${countryData.population}</p>
            <p><strong>Languages:</strong> ${countryData.languages.map(lang => lang.name).join(', ')}</p>
          </div>
        </div>
      `;
      countryList.insertAdjacentHTML('beforeend', html);
    }
  } 
  fetch(`https://restcountries.com/v2/name/${searchQuery}`)
  .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
  .then(data => {
    
  })
  .catch(error => {
    if (error.message === '404') {
      notiflix.Notify.failure('Oops, there is no country with that name');
    } else {
      notiflix.Notify.failure('Something went wrong. Please try again later.');
    }
  });
}, 300);


