// REMOVING THIS IMPORT WILL NOT LOAD YOUR CSS.
import "/style.css";

// import { getCurrentDate } from './exampleModule.js'

// console.log(`The current date is ${getCurrentDate()}`);
const btn = document.querySelector("#submit");
const fNameEl = document.querySelector("#fName");
const lNameEl = document.querySelector("#lName");
const phoneEl = document.querySelector("#phone");
const emailEl = document.querySelector("#email");
const addressEl = document.querySelector("#address1");
const address2El = document.querySelector("#address2");
const countryEl = document.querySelector("#country");
const stateEl = document.querySelector("#state");
const cityEl = document.querySelector("#city");
const errMsg = document.querySelector(".error-msg");
const fNameErrMsg = document.querySelector("#fName-err-msg");
const lNameErrMsg = document.querySelector("#lName-err-msg");
const phoneErrMsg = document.querySelector("#phone-err-msg");
const emailErrMsg = document.querySelector("#email-err-msg");
const addressErrMsg = document.querySelector("#address-err-msg");
const cityErrMsg = document.querySelector("#city-err-msg");

btn.addEventListener("click", validateForm);

function validateForm(e) {
  e.preventDefault();

  errMsg.style.visibility = "hidden";

  const elementsErrMsgArr = [
    fNameErrMsg,
    lNameErrMsg,
    phoneErrMsg,
    emailErrMsg,
    addressErrMsg,
    cityErrMsg,
  ];
  elementsErrMsgArr.forEach((el) => (el.style.display = "none"));

  isValid();

  // const inputEllArr = [
  //   fNameEl,
  //   lNameEl,
  //   phoneEl,
  //   emailEl,
  //   addressEl,
  //   address2El,
  //   countryEl,
  //   stateEl,
  //   cityEl,
  // ];

  // inputEllArr.forEach((el) => (el.value = ""));
}

function isValid() {
  const fNameValue = fNameEl.value;
  const lNameValue = lNameEl.value;
  const emailValue = emailEl.value;
  const phoneValue = phoneEl.value;
  const addressValue = addressEl.value;
  const countryValue = countryEl.value;
  const stateValue = stateEl.value;
  const cityValue = cityEl.value;

  function validateFName(fNameValue) {
    if (!fNameValue.length > 0) {
      showErrMsg(fNameErrMsg);
      fNameEl.classList.add("red-border");
      return false;
    }
    fNameEl.classList.remove("red-border");
    return true;
  }

  function validateLName(lNameValue) {
    if (!lNameValue.length > 0) {
      showErrMsg(lNameErrMsg);
      lNameEl.classList.add("red-border");
      return false;
    }
    lNameEl.classList.remove("red-border");
    return true;
  }

  function validatePhone(phoneValue) {
    const phoneNr = phoneValue.split(" ").join("");

    if (phoneNr[0] !== "+" || phoneNr.length !== 11) {
      showErrMsg(phoneErrMsg);
      phoneEl.classList.add("red-border");
      return false;
    }

    for (let i = 1; i < phoneEl.value.length; i++) {
      if (isNaN(phoneEl.value.charAt(i))) {
        showErrMsg(phoneErrMsg);
        return false;
      }
    }
    phoneEl.classList.remove("red-border");
    return true;
  }

  function validateEmail(email) {
    email = email.trim();

    // Check if the email contains the @ symbol
    if (email.indexOf("@") === -1) {
      emailEl.classList.add("red-border");
      showErrMsg(emailErrMsg);
      return false;
    }

    // Check if the email contains a dot after the @ symbol
    const dotIndex = email.indexOf(".");
    if (dotIndex === -1) {
      emailEl.classList.add("red-border");
      showErrMsg(emailErrMsg);
      return false;
    }

    // Check if the email starts or ends with a dot
    if (email.charAt(0) === "." || email.charAt(email.length - 1) === ".") {
      emailEl.classList.add("red-border");
      showErrMsg(emailErrMsg);
      return false;
    }

    // Check if the email has consecutive dots
    if (email.includes("..")) {
      emailEl.classList.add("red-border");
      showErrMsg(emailErrMsg);
      return false;
    }
    emailEl.classList.remove("red-border");
    return true;
  }

  function validateAddress(address) {
    address = address.trim();
    if (address.length < 2) {
      showErrMsg(addressErrMsg);
      addressEl.classList.add("red-border");
      return false;
    }
    if (!/[a-zA-Z]/.test(address) || !/\d/.test(address)) {
      showErrMsg(addressErrMsg);
      return false;
    }
    addressEl.classList.remove("red-border");
    return true;
  }

  function validateCity(city) {
    if (!city) {
      showErrMsg(cityValue);
      cityEl.classList.add("red-border");
      return false;
    }
    cityEl.classList.remove("red-border");
    return true;
  }

  validateFName(fNameValue);
  validateLName(lNameValue);
  validatePhone(phoneValue);
  validateEmail(emailValue);
  validateAddress(addressValue);
  validateCity(cityValue);

  if (
    validateFName(fNameValue) &&
    validateLName(lNameValue) &&
    validatePhone(phoneValue) &&
    validateEmail(emailValue) &&
    validateAddress(addressValue) &&
    validateCity(cityValue)
  ) {
    localStorage.setItem("First name", fNameValue);
    localStorage.setItem("Last name", lNameValue);
    localStorage.setItem("Phone", phoneValue);
    localStorage.setItem("Email", emailValue);
    localStorage.setItem("Address", addressValue);
    localStorage.setItem("Country", countryValue);
    localStorage.setItem("State", stateValue);
    localStorage.setItem("City", cityValue);

    window.location.href = "successfull.html";
  }
}

function showErrMsg(elemMsg) {
  errMsg.style.visibility = "visible";
  elemMsg.style.display = "block";
}
const countryArr = [];
const getCountryData = function () {
  fetch("https://countriesnow.space/api/v0.1/countries")
    .then((response) => response.json())
    .then((data) => {
      const countries = [...data.data];

      countries.forEach((el) => {
        countryArr.push(el.country);
      });
      countryArr.forEach((el) => {
        renderCountry(el);
      });
    });
};

function renderCountry(country) {
  const optionElement = document.createElement("option");
  optionElement.value = country;
  optionElement.textContent = country;
  countryEl.appendChild(optionElement);
}

const getStateData = function () {
  stateEl.innerHTML = "";
  const countrySelected = countryEl.value;
  fetch("https://countriesnow.space/api/v0.1/countries/states")
    .then((response) => {
      if (!response.ok) throw new Error(`No state found`);
      return response.json();
    })
    .then((data) => {
      const countries = [...data.data];
      const { states } = countries.find((el) => el.name == countrySelected);
      states.forEach((state) => {
        renderState(state.name);
      });
    })
    .catch((err) => console.error("err"));
};

function renderState(state) {
  const optionElement = document.createElement("option");
  optionElement.value = state;
  optionElement.textContent = state;
  stateEl.appendChild(optionElement);
}

const getCityData = function () {
  cityEl.innerHTML = "";
  const countrySelected = countryEl.value;
  fetch("https://countriesnow.space/api/v0.1/countries")
    .then((response) => response.json())
    .then((data) => {
      const countries = [...data.data];
      const { cities } = countries.find((el) => el.country == countrySelected);
      cities.forEach((city) => renderCity(city));
    });
};
function renderCity(city) {
  const optionElement = document.createElement("option");
  optionElement.value = city;
  optionElement.textContent = city;
  cityEl.appendChild(optionElement);
}
getCountryData();
countryEl.addEventListener("change", getCityData);
countryEl.addEventListener("change", getStateData);
