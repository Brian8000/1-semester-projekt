  

// Select the button container
var buttonContainer = document.getElementById("emptyBaskBtnGrid");
// Create a new button element
var newButton = document.createElement("button");
newButton.textContent = "Click me";
// Add a click event listener to the button
newButton.addEventListener("click", function () {
  alert("Button clicked!");
});
// Append the button to the button container
//buttonContainer.appendChild(newButton); der er noget der driller


var calculateButton = document.querySelector("#calculateGrid button");
calculateButton.addEventListener("click", function() {
  var foodList = document.getElementById("foodListGrid");
  
  if (!foodList) {
    console.log("Element with id 'foodList' not found");
    return;
  }
  var numbers = foodList.innerText.split(" ").map(function(item) {
    var number = Number(item);
    if (isNaN(number)) {
      console.log("Non-numeric character found:", item);
      return 0;
    }
    return number;
  });
  var sum = numbers.reduce(function(a, b) {
    return a + b;
  }, 0);
  console.log("Sum:", sum);
});