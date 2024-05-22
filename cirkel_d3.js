const myDiv = d3.select("#circlesGrid");

let mainData;
let shoppingBasketData = [];

const rectData = [
  { width: 40, height: 40, category: "Grøntsager og grøntsagsprodukter" },
  { width: 40, height: 40, category: "Kød og fjerkræ" },
  { width: 40, height: 40, category: "Vin. øl og spiritus" },
  { width: 40, height: 40, category: "Brød og bageartikler" },
  { width: 40, height: 40, category: "Korn og kornprodukter" },
  { width: 40, height: 40, category: "Færdigretter" },
  { width: 40, height: 40, category: "Svampe og svampeprodukter" },
  { width: 40, height: 40, category: "Nødder og frø" },
  { width: 40, height: 40, category: "Slik og sukkervarer" },
  { width: 40, height: 40, category: "Frugt og frugtprodukter" },
  { width: 40, height: 40, category: "Planteprodukter og -drikke" },
  { width: 40, height: 40, category: "Fisk og skaldyr" },
  { width: 40, height: 40, category: "Smagsgivere og krydderier" },
  { width: 40, height: 40, category: "Mælk. mejeriprodukter og æg" },
  { width: 40, height: 40, category: "Bælgfrugter og bælgfrugtprodukter" },
  { width: 40, height: 40, category: "Drikkevarer" },
];

// Function to sanitize category names
function sanitizeCategoryName(category) {
  return category.replace(/[^a-zA-Z0-9]/g, "_");
}

// Append an SVG element to the selected div
const svg = myDiv.append("svg").attr("width", 1500).attr("height", 900);

// Position rectangles in a grid with 4 rows
const cols = 4;
const spacing = 30;
const rectWidth = 200;
const rectHeight = 100;
const cellWidth = rectWidth + spacing;
const cellHeight = rectHeight + spacing;

// Append rectangles and text within the same SVG element
const rectsAndText = svg
  .selectAll(".rectAndText")
  .data(rectData)
  .enter()
  .append("g") // Append a group for each data point
  .attr("class", "rectAndText")
  .attr(
    "transform",
    (d, i) => `translate(${(i % cols) * cellWidth + spacing}, ${Math.floor(i / cols) * cellHeight + spacing})`
  );

// Append rectangles to each group
const rects = rectsAndText
  .append("rect")
  .attr("width", rectWidth)
  .attr("height", rectHeight)
  .attr("rx", 10)
  .attr("ry", 10)
  .attr("fill", "#E1ECC8")
  .attr("stroke", "#475646")
  .attr("stroke-width", 1)
  .attr("data-category", (d) => d.category)
  .classed("rectClass", true);

// Append text within each group
rectsAndText
  .append("text")
  .attr("x", rectWidth / 2)
  .attr("y", rectHeight / 2)
  .attr("text-anchor", "middle")
  .attr("dominant-baseline", "middle")
  .attr("font-size", "16px")
  .attr("font-family", "Prompt, sans-serif")
  .attr("fill", "#333")
  .text((d) => d.category);

// Attach click event listener to rectangles
rects.on("click", function (event, d) {
  const sanitizedCategory = sanitizeCategoryName(d.category);
  handleCategoryClick(d.category);
});
// Function to handle category rectangle click
function handleCategoryClick(category) {
  fetch(`http://localhost:4000/category/${category}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((categoryData) => {
      console.log("Fetched category data:", categoryData);
      mainData = categoryData;
      showPopup(category, categoryData);
    })
    .catch((error) => {
      console.error("Error fetching category data:", error);
    });
}

function showPopup(category, foodItems) {
  // We sort alphabetically
  foodItems.sort((a, b) => {
    const productA = a.produkt.toLowerCase();
    const productB = b.produkt.toLowerCase();

    if (productA < productB) {
      return -1;
    }
    if (productA > productB) {
      return 1;
    }
    return 0;
  });

  const popup = d3
    .select("#circlesGrid")
    .append("div")
    .attr("class", "popup")
    .style("position", "fixed")
    .style("left", "38%")
    .style("top", "55%")
    .style("transform", "translate(-50%, -50%)")
    .style("background", "#F7FFE5")
    .style("padding", "20px")
    .style("width", "65vw")
    .style("height", "40vw")
    .style("font-family", "Prompt, sans-serif")
    .style("color", "#475646")
    .style("border", "2px solid #475646")
    .style("border-radius", "10px")
    .style("box-shadow", "0 0 10px rgba(0,0,0,0.5)")
    .style("overflow-y", "auto");
  // .style("display", "flex")
  // .style("flex-direction", "column");

  popup.append("h2").text(category);
  const foodItemContainer = popup.append("div").style("display", "flex").style("flex-wrap", "wrap");

  foodItemContainer
    .selectAll(".foodItem")
    .data(foodItems)
    .enter()
    .append("div")
    .attr("class", "foodItem")
    .style("margin", "5px 0")
    .style("width", "12%")
    .style("padding", "10px")
    .style("border-top", "2px solid black")
    .style("cursor", "pointer")
    .text((d) => d.produkt)
    .on("click", function (event, d) {
      addToShoppingBasket(d);
    })

    .on("mouseover", function () {
      d3.select(this).style("color", "#2a332a").style("border-radius", "10px");
    })
    .on("mouseout", function () {
      d3.select(this)
        .style("color", "#475646") // Revert to original text color
        .style("border-radius", "0"); // Revert to original border radius
    });

  // Close popup when clicking outside
  d3.select(document).on("click.popup", function (event) {
    const isClickedOutside = !popup.node().contains(event.target);
    if (isClickedOutside) {
      popup.remove();
      d3.select(document).on("click.popup", null); // Remove the click event listener
    }
  });
}

// Function to add item to the shopping basket
function addToShoppingBasket(foodItem) {
  shoppingBasketData.push(foodItem);
  console.log("Shopping basket data:", shoppingBasketData);

  const foodListGrid = document.getElementById("foodListGrid");

  const foodItemDiv = document.createElement("div");
  foodItemDiv.innerText = foodItem.produkt;

  foodListGrid.appendChild(foodItemDiv);
}

// Select the "Tøm kurv" button
const emptyBasketBtn = document.getElementById("emptyBaskBtn");

// Attach click event listener to the button
emptyBasketBtn.addEventListener("click", emptyBasket);

// Function to empty the shopping basket
function emptyBasket() {
  const shopBasket = document.getElementById("foodListGrid");
  while (shopBasket.firstChild) {
    shopBasket.removeChild(shopBasket.firstChild);
  }
  shoppingBasketData = [];
}

// Function to remove food item rectangles and text
function removeFoodItemRects(category) {
  const sanitizedCategory = sanitizeCategoryName(category);
  svg
    .selectAll(`.foodItemGroup-${sanitizedCategory}`)
    .transition()
    .duration(500)
    .attr("opacity", 0)
    .on("end", function () {
      d3.select(this).remove();
    });
}
