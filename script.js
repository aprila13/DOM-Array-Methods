//Grab HTML
const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = []; //This will hold the fetched objects

getRandomUser();
getRandomUser();
getRandomUser();

//Fetch random user and add money
// function getRandomUser() {
//   fetch('https://randomuser.me/api')
//     .then(res => res.json())
//     .then(data => {
//       console.log(data);
//     });
// }

//Using async/await to hit endpoint
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0]; //results object saved in variable

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };

  addData(newUser);
}

function addData(obj) {
  data.push(obj);

  updateDOM();
}

//Double money - map()
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

//Sort users by richest - Sort()
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

//Filter for millionaires
function showMillionaires() {
  data = data.filter((item) => {
    return item.money > 1000000;
  });
  updateDOM();
}

//reduce()
function calculateWealth() {
  const wealth = data.reduce((acc, user) => {
    return (acc += user.money);
  }, 0);

  console.log(formatMoney(wealth));
  // updateDOM()
  const wealthElement = document.createElement("div");
  wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(
    wealth
  )}</strong></h3>`;
  main.appendChild(wealthElement);
}

//If no arg is passed, use the data array as a default
function updateDOM(providedData = data) {
  //Clear the main div
  main.innerHTML = "<h2><strong>Person</strong> Wealth</h2>";

  providedData.forEach((person) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${person.name}</strong> ${formatMoney(
      person.money
    )}`;
    main.appendChild(element);
  });
}

//Format number as money
function formatMoney(number) {
  return "$" + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

//Event listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);
