document.addEventListener("DOMContentLoaded", () => {
    const regionElement = document.querySelector("#region");
    const countryElement = document.querySelector("#country");
    const factsElement = document.querySelector("#facts-area");

    regionElement.addEventListener("change", (event) => {
        updateCountries(region.value, countryElement);
        // console.log("region");
    });

    countryElement.addEventListener("change", (event) => {
        updateFacts(country.value, factsElement);
        // console.log("country");
    });

    // console.log("js-DOM fully loaded and parsed B");
    // console.log(document.querySelector(".container"));
});

async function updateCountries(region, countryElement) {
    const url = `https://restcountries.com/v3.1/region/${region}`;
    const response = await fetch(url);
    // check if the request has succeeded using response
    // assuming it is successful
    const data = await response.json();
    let countryNames = data.map(ele => ele.name.common).sort();
    let countryHTML = countryNames.map(ele => `<option value="${ele}">${ele}</option>`).join("");
    countryElement.innerHTML = countryHTML;
}

async function updateFacts(country, factsElement) {
    const url = `https://restcountries.com/v3.1/name/${country}`;
    const response = await fetch(url);
    // check if the request has succeeded using response
    // assuming it is successful
    const data = await response.json();
    const ele = data[0];

    let facts = `<h2>Facts about ${ele.name.common}</h2>
     <img src="${ele.flags.svg}" alt="Flag of ${ele.name.common}" width="256" />
     <table>
        <tr><td>Official Country Name</td><td>${ele.name.official}</td></tr>
        <tr><td>Capital</td><td>${ele.capital}</td></tr>
     </table>`;
    factsElement.innerHTML = facts;
}

// console.log("js-DOM fully loaded and parsed A");
// console.log(document.querySelector(".container"));
