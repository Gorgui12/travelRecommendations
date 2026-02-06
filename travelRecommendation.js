let apiData = {};

// ============================
// FETCH DATA
// ============================
fetch("travel_Recommendation_api.json")
  .then(response => response.json())
  .then(data => {
    apiData = data;
    console.log("API data loaded:", apiData);
  })
  .catch(error => {
    console.error("Error fetching API data:", error);
  });

// ============================
// ELEMENTS
// ============================
const searchInput = document.getElementById("searchInput");
const submitButton = document.getElementById("submitButton");
const resetButton = document.getElementById("resetButton");

// ============================
// NORMALIZE INPUT
// ============================
function normalize(word) {
  return word.toLowerCase().trim();
}

// ============================
// SEARCH
// ============================
submitButton.addEventListener("click", () => {
  const userInput = normalize(searchInput.value);

  if (!userInput) {
    alert("Please enter a keyword");
    return;
  }

  let results = [];

  // BEACHES
  if (["beach", "beaches", "plage", "plages"].includes(userInput)) {
    results = apiData.beaches;
  }

  // TEMPLES
  else if (["temple", "temples"].includes(userInput)) {
    results = apiData.temples;
  }

  // COUNTRIES
  else if (["country", "countries", "pays"].includes(userInput)) {
    results = apiData.countries;
  }

  else {
    alert("No results found for this keyword");
    return;
  }

  console.log("Results:", results);
  displayResults(results);
});

// ============================
// RESET
// ============================
resetButton.addEventListener("click", () => {
  searchInput.value = "";
  clearResults();
});

// ============================
// DISPLAY RESULTS
// ============================
function displayResults(items) {
  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = "";

  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "result-card";
    card.innerHTML = `
     ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.name}">` : ""}
      <h3>${item.name}</h3>
      <p>${item.description || ""}</p>
      <button class="visit-button">Visit</button>
     
    `;
    resultsContainer.appendChild(card);
  });
}

// ============================
// CLEAR RESULTS
// ============================
function clearResults() {
  document.getElementById("results").innerHTML = "";
}
