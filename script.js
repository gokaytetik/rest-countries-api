const countriesEl = document.querySelector(".countries");
const toggleBtn = document.querySelector(".toggle-btn");
const dropdown = document.querySelector(".dropdown-btn");
const dropdownMenu = document.querySelector(".dropdown-menu");
const regionList = dropdownMenu.querySelectorAll("li");
const backBtn = document.querySelector(".back-btn");
const modal = document.querySelector(".modal");
const search = document.querySelector(".search");

const getCountries = async () => {
  const response = await fetch("https://restcountries.com/v2/all");
  const countries = await response.json();

  showCountries(countries);
};

const showCountries = (countries) => {
  countriesEl.innerHTML = "";

  countries.forEach((country) => {
    const countryEl = document.createElement("div");

    countryEl.classList.add("card");

    countryEl.innerHTML = `
        <div class="card-header">
        <img src=${country.flags.svg} alt='${country.name.common}' />
        </div>
        <div class="card-body">
        <h2 class="country-name">${country.name}</h2>
        <p>
        <strong>Population:</strong>
        ${country.population}
        </p>
        <p class="country-region">
        <strong>Region: </strong>
        ${country.region}
        </p>
        <p><strong>Capital: </strong>
        ${country.capital}
        </p>
        </div>
        
        `;
    countriesEl.appendChild(countryEl);

    // Get Details
    countryEl.addEventListener("click", () => {
      modal.style.display = "flex";
      showCountryDetails(country);
    });
  });
};

getCountries();

// Country Details
const showCountryDetails = (country) => {
  const modalBody = document.querySelector(".modal-body");
  const modalImg = document.querySelector(".modal-img");

  modalImg.src = country.flags.svg;

  modalBody.innerHTML = `
  
            <h2>${country.name}</h2>
              <div class="country-details">
                <div class="left">
                  <p>
                  <strong>Native Name: </strong>
                  ${country.nativeName}
                  </p>
                  <p>
                  <strong>Population: </strong>
                  ${country.population}
                  </p>
                  <p>
                  <strong>Region: </strong>
                  ${country.region}
                  </p>
                  <p>
                  <strong>Sub Region: </strong>
                  ${country.subregion}
                  </p>
                  <p>
                  <strong>Capital: </strong>
                  ${country.capital}
                  </p>
                </div>
                <div class="right">
                  <p>
                  <strong>Top Level Domain: </strong>
                  ${country.topLevelDomain[0]}
                  </p>
                  <p>
                  <strong>Currencies: </strong>
                  ${country.currencies.map((currency) => currency.name)}
                  </p>
                  <p>
                  <strong>Languages: </strong>
                  ${country.languages[0].name}
                  </p>
                </div>
              </div>
              <div class="modal-footer">
                <h3>Border Countries:</h3>
              
                <p>${country.borders[0]}</p>
                <p>${country.borders[1]}</p>
                <p>${country.borders[2]}</p>
              </div>
  
  `;
};

// Toggle Theme
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Toggle Dropdown Menu
dropdown.addEventListener("click", () => {
  dropdownMenu.classList.toggle("hide");
});

// Modal Open-hide
backBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// Search Filter
search.addEventListener("input", (e) => {
  const value = e.target.value;
  const countryName = document.querySelectorAll(".country-name");
  countryName.forEach((name) => {
    if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
      // country-name -> card-body -> card
      name.parentElement.parentElement.style.display = "block";
    } else {
      name.parentElement.parentElement.style.display = "none";
    }
  });
});

// Dropdown Filter

regionList.forEach((filter) => {
  filter.addEventListener("click", () => {
    const value = filter.innerText;
    const countryRegion = document.querySelectorAll(".country-region");

    countryRegion.forEach((region) => {
      if (region.innerText.includes(value) || value === "All") {
        region.parentElement.parentElement.style.display = "block";
      } else {
        region.parentElement.parentElement.style.display = "none";
      }
    });
  });
});
