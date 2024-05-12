let numbers = [];

// Definition af CO2-udslipstærskler
const grøn_tærskel = 1000; // Definér grøn tærskelværdi
const gul_tærskel = 2000; // Definér gul tærskelværdi

// Select the button container
let buttonContainer = document.getElementById("emptyBaskBtnGrid");
// Create a new button element
let newButton = document.createElement("button");
newButton.textContent = "Click me";
// Add a click event listener to the button
newButton.addEventListener("click", function () {
  alert("Button clicked!");
});
// Append the button to the button container
//buttonContainer.appendChild(newButton); der er noget der driller

let calculateButton = document.querySelector("#calculateGrid button");
calculateButton.addEventListener("click", function () {});

// Funktion til at beregne CO2 og oprette cirklen
function calculateCO2() {
  let foodList = document.getElementById("foodListGrid");

  if (!foodList) {
    console.log("Element with id 'foodList' not found");
    return;
  }
  numbers = foodList.innerText.split(" ").map(function (item) {
    let number = Number(item);
    if (isNaN(number)) {
      console.log("Non-numeric character found:", item);
      return 0;
    }
    return number;
  });

  let sum = numbers.reduce(function (a, b) {
    return a + b;
  }, 0);
  console.log("Sum:", sum);

  let number = Number(item);
  if (isNaN(number)) {
    console.log("Non-numeric character found:", item);
    return 0;
  }
  return number;
}

let sum = numbers.reduce(function (a, b) {
  return a + b;
}, 0);
console.log("Sum:", sum);

// Bestem farven baseret på det beregnede CO2-udslip
let color;
if (sum < grøn_tærskel) {
  color = "green";
} else if (sum < gul_tærskel) {
  color = "yellow";
} else {
  color = "red";
}

// Opdater farven på den ydre cirkel
const outerCircle = document.getElementById("outerCircle");
outerCircle.style.display = "block"; // Vis cirklen
outerCircle.style.backgroundColor = color; // Indstil farven på den ydre cirkel

// Tjek om den indre cirkel allerede eksisterer, hvis ikke opret den
let innerCircle = document.querySelector(".innerCircle");
if (!innerCircle) {
  innerCircle = document.createElement("div");
  innerCircle.classList.add("innerCircle");
  outerCircle.appendChild(innerCircle);
}

innerCircle.textContent = sum; // Opdater summen i den indre cirkel

// Funktion til at ændre farven på den indre cirkel
function changeouterCircleColor(color) {
  document.querySelector(".outerCircle").style.backgroundColor = color;
}

// I MÅ HELST IKKE SLETTE DETTE :D
// let stinesPlaceholderBtn = document.createElement("button");
// stinesPlaceholderBtn.textContent = "Stines Knap";
// stinesPlaceholderBtn.setAttribute("id", "stinesKnap");
// stinesPlaceholderBtn.addEventListener("click", function () {
//   console.log("du har klikket på stines knap");
// });
// let buttonContainer = document.getElementById("circlesGrid");
// buttonContainer.appendChild(stinesPlaceholderBtn);

document.addEventListener("DOMContentLoaded", function () {
  let stinesPlaceholderBtn = document.createElement("button");
  stinesPlaceholderBtn.textContent = "Stines Knap";
  stinesPlaceholderBtn.setAttribute("id", "stinesKnap");

  let buttonContainer = document.getElementById("circlesGrid");
  buttonContainer.appendChild(stinesPlaceholderBtn);

  // Add event listener to the button
  stinesPlaceholderBtn.addEventListener("click", function () {});
});

// Append the new item to the shopping basket container
// let shoppingBasket = document.getElementById("foodListGrid");
// shoppingBasket.appendChild(newItem);
