// Game state variables
let hunger = 50;
let happiness = 50;
let energy = 50;
let factHistory = [];
let isDead = false;

// DOM elements
const tamagotchi = document.getElementById("tamagotchi");
const deadImage = document.getElementById("dead-image");
const factHistoryList = document.getElementById("fact-history");
const actionButtons = document.querySelectorAll(".actions button:not([onclick*='Game'])");
const gameButtons = document.querySelectorAll(".actions button[onclick*='Game']");

function updateStats() {
    document.getElementById("hunger").textContent = hunger;
    document.getElementById("happiness").textContent = happiness;
    document.getElementById("energy").textContent = energy;

    if (hunger <= 0 || happiness <= 0 || energy <= 0) {
        if (!isDead) {
            triggerDeath();
        }
    }
}

function resetAnimations() {
    tamagotchi.className = "";
}

function feedPet() {
    if (isDead) return;
    hunger = Math.min(hunger + 10, 100);
    energy = Math.max(energy - 5, 0);
    tamagotchi.classList.add("eat");
    setTimeout(resetAnimations, 1000);
    updateStats();
}

function playWithPet() {
    if (isDead) return;
    happiness = Math.min(happiness + 10, 100);
    energy = Math.max(energy - 10, 0);
    hunger = Math.max(hunger - 10, 0);
    tamagotchi.classList.add("play");
    setTimeout(resetAnimations, 1500);
    updateStats();
}

function putToSleep() {
    if (isDead) return;
    energy = Math.min(energy + 20, 100);
    happiness = Math.max(happiness - 5, 0);
    tamagotchi.classList.add("sleep");
    setTimeout(resetAnimations, 2000);
    updateStats();
}

function tellFact() {
    if (isDead) return;
    // Using the Cat Facts API instead of random facts
    fetch("https://catfact.ninja/fact")
        .then((response) => response.json())
        .then((data) => {
            const currentFact = data.fact; // Cat Facts API returns fact in 'fact' property
            document.getElementById("current-fact").textContent = currentFact;

            factHistory.push(currentFact);
            const listItem = document.createElement("li");
            listItem.textContent = currentFact;
            factHistoryList.appendChild(listItem);

            if (factHistory.length > 5) {
                factHistory.shift();
                factHistoryList.removeChild(factHistoryList.firstChild);
            }
        })
        .catch(() => alert("Failed to load cat fact. Try again!"));
}

function triggerDeath() {
    isDead = true;
    tamagotchi.classList.add("dead");
    
    actionButtons.forEach(button => button.disabled = true);

    setTimeout(() => {
        deadImage.style.display = "block";
    }, 2000);
}

function saveGame() {
    const gameState = {
        hunger,
        happiness,
        energy,
        factHistory,
        isDead
    };
    localStorage.setItem("tamagotchiGame", JSON.stringify(gameState));
}

function loadGame() {
    const savedGame = localStorage.getItem("tamagotchiGame");
    if (savedGame) {
        const gameState = JSON.parse(savedGame);
        hunger = gameState.hunger;
        happiness = gameState.happiness;
        energy = gameState.energy;
        factHistory = gameState.factHistory;
        isDead = gameState.isDead;

        updateStats();
        document.getElementById("current-fact").textContent = factHistory[factHistory.length - 1] || "No cat fact yet!";
        factHistoryList.innerHTML = factHistory.map(fact => `<li>${fact}</li>`).join("");

        if (isDead) {
            deadImage.style.display = "block";
            actionButtons.forEach(button => button.disabled = true);
        } else {
            deadImage.style.display = "none";
            actionButtons.forEach(button => button.disabled = false);
        }
    } else {
        alert("No saved game found.");
    }
}

function resetGame() {
    hunger = 50;
    happiness = 50;
    energy = 50;
    factHistory = [];
    isDead = false;
    deadImage.style.display = "none";
    tamagotchi.className = "";
    updateStats();
    document.getElementById("current-fact").textContent = "No cat fact yet!";
    factHistoryList.innerHTML = "";
    
    actionButtons.forEach(button => button.disabled = false);
}

function saveGame() {
    const gameState = {
        hunger,
        happiness,
        energy,
        factHistory,
        isDead
    };
    localStorage.setItem("tamagotchiGame", JSON.stringify(gameState));
    alert("Game saved locally!");
}

function loadGame() {
    const savedGame = localStorage.getItem("tamagotchiGame");
    if (savedGame) {
        const gameState = JSON.parse(savedGame);
        hunger = gameState.hunger;
        happiness = gameState.happiness;
        energy = gameState.energy;
        factHistory = gameState.factHistory;
        isDead = gameState.isDead;

        updateStats();
        alert("Game loaded successfully!");
    } else {
        alert("No saved game found.");
    }
}


// Initialize game
updateStats();