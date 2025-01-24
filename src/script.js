Great! Here is the JavaScript code for the `combined.js` file:

### JavaScript (combined.js)
```javascript
const fruitsAndVeg = [
    { name: "Apple", emoji: "🍎" },
    { name: "Carrot", emoji: "🥕" },
    { name: "Grape", emoji: "🍇" },
    { name: "Banana", emoji: "🍌" },
    { name: "Broccoli", emoji: "🥦" },
    { name: "Strawberry", emoji: "🍓" },
    { name: "Tomato", emoji: "🍅" },
    { name: "Orange", emoji: "🍊" },
    { name: "Pineapple", emoji: "🍍" },
    { name: "Watermelon", emoji: "🍉" },
    { name: "Lemon", emoji: "🍋" },
    { name: "Cherry", emoji: "🍒" },
    { name: "Peach", emoji: "🍑" },
    { name: "Pear", emoji: "🍐" },
    { name: "Mango", emoji: "🥭" },
    { name: "Blueberry", emoji: "🫐" },
    { name: "Avocado", emoji: "🥑" },
    { name: "Cucumber", emoji: "🥒" },
    { name: "Eggplant", emoji: "🍆" },
    { name: "Bell Pepper", emoji: "🫑" },
    { name: "Corn", emoji: "🌽" },
    { name: "Pumpkin", emoji: "🎃" },
    { name: "Coconut", emoji: "🥥" },
    { name: "Kiwi", emoji: "🥝" },
    { name: "Grapefruit", emoji: "🍊" },
    { name: "Lime", emoji: "🍋" },
    { name: "Raspberry", emoji: "🍓" }, // Correct emoji: 🍓
    { name: "Blackberry", emoji: "🍇" }, // Correct emoji: 🍇
    { name: "Plum", emoji: "🍑" }, // Correct emoji: 🍑
    { name: "Apricot", emoji: "🍑" } // Correct emoji: 🍑
];

function getRandomFruitOrVeg() {
    return fruitsAndVeg[Math.floor(Math.random() * fruitsAndVeg.length)];
}

async function fetchNutritionInfo(foodName) {
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
                body: JSON.stringify({ query: foodName }),
            }
        );

        if (!response.ok) {
            throw new Error("Unable to fetch data. Please try again.");
        }

        const data = await response.json();
        return data.foods[0];
    } catch (error) {
        console.error("Error fetching nutrition info:", error);
        return null;
    }
}

async function spinSlots() {
    // Get random fruits/veggies
    const slot1 = getRandomFruitOrVeg();
    const slot2 = getRandomFruitOrVeg();
    const slot3 = getRandomFruitOrVeg();

    // Update the slot elements
    document.getElementById("slot1").textContent = slot1.emoji;
    document.getElementById("slot2").textContent = slot2.emoji;
    document.getElementById("slot3").textContent = slot3.emoji;

    // Fetch and display nutritional information for the combination
    const nutritionInfo1 = await fetchNutritionInfo(slot1.name);
    const nutritionInfo2 = await fetchNutritionInfo(slot2.name);
    const nutritionInfo3 = await fetchNutritionInfo(slot3.name);

    const payout = `
        <h2>Nutrition Facts</h2>
        <p><strong>${slot1.name}:</strong> Calories: ${nutritionInfo1.nf_calories}, Protein: ${nutritionInfo1.nf_protein}g, Fat: ${nutritionInfo1.nf_total_fat}g, Carbs: ${nutritionInfo1.nf_total_carbohydrate}g</p>
        <p><strong>${slot2.name}:</strong> Calories: ${nutritionInfo2.nf_calories}, Protein: ${nutritionInfo2.nf_protein}g, Fat: ${nutritionInfo2.nf_total_fat}g, Carbs: ${nutritionInfo2.nf_total_carbohydrate}g</p>
        <p><strong>${slot3.name}:</strong> Calories: ${nutritionInfo3.nf_calories}, Protein: ${nutritionInfo3.nf_protein}g, Fat: ${nutritionInfo3.nf_total_fat}g, Carbs: ${nutritionInfo3.nf_total_carbohydrate}g</p>
    `;
    document.getElementById("payout").innerHTML = payout;
}
