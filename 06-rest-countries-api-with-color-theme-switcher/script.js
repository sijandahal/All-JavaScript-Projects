const countriesDisplay = document.querySelector(".countries");
const searchInput = document.querySelector(".search__countries");
const regionsSelect = document.querySelector("#regions");
const loader = document.querySelector(".loader");

let allCountriesArr = [];
let countriesPerPage = 20; // Number of countries to load per page
let currentPage = 1;

// Fetch all countries and keep a cache
async function fetchAllCountries() {
  try {
    const url = "https://restcountries.com/v3.1/all";
    const response = await fetch(url);
    const allCountries = await response.json();
    allCountriesArr = allCountries;
    return allCountriesArr;
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
}

// Fetch and display a "page" of countries based on current page index
function displayCountriesByPage() {
  if (countriesDisplay) {
    const startIdx = (currentPage - 1) * countriesPerPage;
    const endIdx = currentPage * countriesPerPage;
    const countriesToDisplay = allCountriesArr.slice(startIdx, endIdx);

    countriesToDisplay.forEach((country) => {
      displayCountry(country);
    });

    bindCountryBoxEvents(); // Bind events to the new country boxes
  }
}

// Display a single country
function displayCountry(country) {
  const countryName = country.name.official;
  const countryPopulation = country.population;
  const countryRegion = country.region;
  const countryCapital = country.capital ? country.capital[0] : "N/A";
  const countryFlagUrl = country.flags.png;

  countriesDisplay.innerHTML += `
    <div class="country-box cursor-pointer" data-country="${countryName}">
      <div class="image__wrapper h-40">
        <img src="${countryFlagUrl}" alt="Flag of ${countryName}" class = "h-full w-full"/>
      </div>
      <div class="details shadow-lg px-5 py-6 bg-white">
        <h2 class = "font-bold mb-4">${countryName}</h2>
        <p class = "mb-2"> <span class = "font-bold"> Population: </span> ${countryPopulation} </p>
        <p class = "mb-2"> <span class = "font-bold"> Region: </span>  ${countryRegion} </p>
        <p>  <span class = "font-bold">Capital:  </span> ${countryCapital}  </p>
      </div>
    </div>
  `;
}

// Bind event listeners to the country boxes
function bindCountryBoxEvents() {
  const countryBoxes = document.querySelectorAll(".country-box");
  countryBoxes.forEach((countryBox) => {
    countryBox.addEventListener("click", () => {
      const countryName = countryBox.getAttribute("data-country");
      window.location.href = `details.html?country=${encodeURIComponent(
        countryName
      )}`;
    });
  });
}

// Infinite scroll functionality
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >=
    document.body.scrollHeight - 100 // Adjust for some buffer
  ) {
    currentPage += 1;
    displayCountriesByPage(); // Load more countries when nearing the bottom
  }
});

// Handle region changes and display countries
if (regionsSelect) {
  regionsSelect.addEventListener("change", (e) => {
    const region = e.target.value;
    fetchCountriesByRegion(region);
  });
}

// Fetch countries by region
async function fetchCountriesByRegion(region) {
  if (loader) {
    loader.innerText = "Loading...";
  }
  const url = `https://restcountries.com/v3.1/region/${region}`;
  const response = await fetch(url);
  const countriesByRegion = await response.json();

  countriesDisplay.innerHTML = ""; // Clear current list
  allCountriesArr = countriesByRegion; // Update the array with the region-specific countries
  currentPage = 1; // Reset the page index

  displayCountriesByPage(); // Display the first page of region-based countries
  if (loader) {
    loader.innerText = ""; // Clear the loader text
  }
}

// Fetch countries on page load
fetchAllCountries().then(() => {
  displayCountriesByPage(); // Display the first set of countries
  if (loader) {
    loader.style.display = "none"; // Hide the loader
  }
});

// Handle search input to filter the list
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredCountries = allCountriesArr.filter((country) => {
      const countryName = country.name.official.toLowerCase();
      return countryName.includes(searchValue);
    });
    countriesDisplay.innerHTML = ""; // Clear the display
    currentPage = 1; // Reset the page index

    filteredCountries.forEach((country) => {
      displayCountry(country);
    });

    bindCountryBoxEvents(); // Bind events to the filtered list
  });
}

// Get the query parameter from the URL
function getQueryParams(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

// Display country details on `details.html`
function displayCountryDetails(country) {
  const detailsElement = document.querySelector(".details");
  if (detailsElement) {
    detailsElement.innerHTML += `
    <div class = "details">
    <div class = "image__wrapper"> 
    <img src="${country.flags.png}" alt="Flag of ${country.name.official}" />
    </div>
     </div>
      <h2>${country.name.official}</h2>
     
      <p>Population: ${country.population}</p>
      <p>Region: ${country.region}</p>
      <p>Capital: ${country.capital ? country.capital[0] : "N/A"}</p>
    `;
  }
}

// Handle the back button navigation
const backButton = document.querySelector(".backButton");
if (backButton) {
  backButton.addEventListener("click", () => {
    window.location.href = `index.html`;
  });
}

// Handle country details page logic
document.addEventListener("DOMContentLoaded", async () => {
  const countryName = getQueryParams("country");
  if (countryName) {
    const allCountriesArr = await fetchAllCountries();
    const country = allCountriesArr.find(
      (c) => c.name.official.toLowerCase() === countryName.toLowerCase()
    );

    if (country) {
      displayCountryDetails(country);
    } else {
      console.error("Country not found");
    }
  }
});
