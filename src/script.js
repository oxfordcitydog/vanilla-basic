// try new code 
const fruitsAndVeg = [
    { name: "Apple", emoji: "🍎", vitamins: "Vitamin C, Fiber" },
    { name: "Carrot", emoji: "🥕", vitamins: "Vitamin A, Beta-carotene" },
    { name: "Grape", emoji: "🍇", vitamins: "Vitamin C, Vitamin K" },
    { name: "Banana", emoji: "🍌", vitamins: "Vitamin B6, Potassium" },
    { name: "Broccoli", emoji: "🥦", vitamins: "Vitamin C, Vitamin K" },
    { name: "Strawberry", emoji: "🍓", vitamins: "Vitamin C, Folate" },
    { name: "Tomato", emoji: "🍅", vitamins: "Vitamin C, Lycopene" },
    { name: "Orange", emoji: "🍊", vitamins: "Vitamin C, Fiber" }
];

function getRandomFruitOrVeg() {
    return fruitsAndVeg[Math.floor(Math.random() * fruitsAndVeg.length)];
}

function spinSlots() {
    // Get random fruits/veggies
    const slot1 = getRandomFruitOrVeg();
    const slot2 = getRandomFruitOrVeg();
    const slot3 = getRandomFruitOrVeg();

    // Update the slot elements
    document.getElementById("slot1").textContent = slot1.emoji;
    document.getElementById("slot2").textContent = slot2.emoji;
    document.getElementById("slot3").textContent = slot3.emoji;

    // Display nutritional information for the combination
    const payout = `
        1. ${slot1.name}: ${slot1.vitamins} <br>
        2. ${slot2.name}: ${slot2.vitamins} <br>
        3. ${slot3.name}: ${slot3.vitamins}
    `;
    document.getElementById("payout").innerHTML = payout;
}
// new code for nutrition slots
document.getElementById("nutritionForm").addEventListener("submit", async function (event) {
    event.preventDefault();
  
    const foodInput = document.getElementById("foodInput").value;
    const resultsDiv = document.getElementById("results");
  
    // Clear previous results
    resultsDiv.innerHTML = "Loading...";
  
    // Nutritionix API keys
    const appId = "9e7dbfa0"; // Your application ID
    const appKey = "92ccaca4abf53ccd7cd72e2291afaecc"; // Your application key
  
    try {
      const response = await fetch(
        `https://trackapi.nutritionix.com/v2/natural/nutrients`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-app-id": appId,
            "x-app-key": appKey,
          },
          body: JSON.stringify({ query: foodInput }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Unable to fetch data. Please try again.");
      }
  
      const data = await response.json();
  
      // Display results
      resultsDiv.innerHTML = `
        <h2>Nutrition Facts for ${foodInput}</h2>
        <p><strong>Calories:</strong> ${data.foods[0].nf_calories}</p>
        <p><strong>Protein:</strong> ${data.foods[0].nf_protein} g</p>
        <p><strong>Fat:</strong> ${data.foods[0].nf_total_fat} g</p>
        <p><strong>Carbohydrates:</strong> ${data.foods[0].nf_total_carbohydrate} g</p>
        <p><strong>Serving Size:</strong> ${data.foods[0].serving_weight_grams} g</p>
      `;
    } catch (error) {
      resultsDiv.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    }
  });
  // new code for nutrition slots
  const fetchBtn = document.getElementById('fetchBtn');
const foodInput = document.getElementById('foodInput');
const resultDiv = document.getElementById('result');

// Replace with your Nutritionix API credentials
const appId = 'YOUR_APP_ID'; // Your App ID from Nutritionix
const apiKey = 'YOUR_API_KEY'; // Your API Key from Nutritionix

fetchBtn.addEventListener('click', () => {
  const food = foodInput.value;
  if (!food) {
    resultDiv.innerHTML = '<p>Please enter a food name.</p>';
    return;
  }

  fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-app-id': appId,
      'x-app-key': apiKey,
    },
    body: JSON.stringify({ query: food }),
  })
    .then(response => response.json())
    .then(data => {
      const nutrients = data.foods[0].full_nutrients;
      let output = `<h2>Nutrition Info for ${food}</h2><ul>`;
      nutrients.forEach(nutrient => {
        output += `<li>${nutrient.attr_id}: ${nutrient.value}</li>`;
      });
      output += '</ul>';
      resultDiv.innerHTML = output;
    })
    .catch(err => {
      console.error('Error:', err);
      resultDiv.innerHTML = '<p>Sorry, something went wrong. Please try again.</p>';
    });
});
