public class Main {
    
}
// Nutritionix API credentials
const appId = '9e7dbfa0';
const apiKey = '92ccaca4abf53ccd7cd72e2291afaecc';

// Function to fetch data from the API
async function getNutritionData(foodItem) {
    const url = `https://trackapi.nutritionix.com/v2/natural/nutrients`;

    const headers = {
        "Content-Type": "application/json",
        "x-app-id": appId,
        "x-app-key": apiKey,
    };

    const body = {
        query: foodItem,
    };

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(body),
        });

        if (response.ok) {
            const data = await response.json();
            console.log("Nutrition Data:", data);
            // Process and display the data as needed
        } else {
            console.error("Error:", response.status, response.statusText);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Example usage
getNutritionData("apple"); // Replace "apple" with any food item
