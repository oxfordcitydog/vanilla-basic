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
  