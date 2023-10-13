// export function getCurrentDate() {
//   return new Date().toLocaleDateString();
// }

const fName = localStorage.getItem("First name");
const lName = localStorage.getItem("Last name");
const phone = localStorage.getItem("Phone");
const email = localStorage.getItem("Email");
const address = localStorage.getItem("Address");
const country = localStorage.getItem("Country");
const state = localStorage.getItem("State");
const city = localStorage.getItem("City");

const element = document.querySelector("#subInfo");
const info = `<br> First name: ${fName} <br>
              Last name: ${lName} <br>
              Phone number: ${phone} <br>
              Email: ${email}<br>
              Address: ${address}<br>
              Country: ${country}<br>
              State: ${state}<br>
              City: ${city}`;
element.innerHTML = info;
