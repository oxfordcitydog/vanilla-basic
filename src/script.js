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
