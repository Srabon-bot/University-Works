
let hunger = 50;
let happiness = 50;
let energy = 50;
let factHistory = [];
let isDead = false;

const tamagotchi = document.getElementById("tamagotchi");
const deadImage = document.getElementById("dead-image");
const factHistoryList = document.getElementById("fact-history");
const actionButtons = document.querySelectorAll(".actions button:not([onclick*='Game'])");
const gameButtons = document.querySelectorAll(".actions button[onclick*='Game']");

const username = localStorage.getItem('username');
if (!username) {
    window.location.href = 'login.html';
}

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
    fetch("https://catfact.ninja/fact")
        .then((response) => response.json())
        .then((data) => {
            const currentFact = data.fact;
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

function saveGame() {
    const username = localStorage.getItem('username');
    if (!username) {
        alert('Please log in first!');
        return;
    }

    const gameData = {
        username: username,
        hunger: hunger,
        happiness: happiness,
        energy: energy
    };

    fetch('saveGame.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: Object.keys(gameData)
            .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(gameData[key])}`)
            .join('&')
    })
    .then(response => response.text())
    .then(data => {
        alert('Game saved successfully!');
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Failed to save game!');
    });
}

function loadGame() {
    const username = localStorage.getItem('username');
    if (!username) {
        alert('Please log in first!');
        return;
    }

    fetch(`loadGame.php?username=${encodeURIComponent(username)}`)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error);
                return;
            }
            
            
            hunger = parseInt(data.hunger) || 50;
            happiness = parseInt(data.happiness) || 50;
            energy = parseInt(data.energy) || 50;
            
        
            isDead = false;
            deadImage.style.display = "none";
            tamagotchi.className = "";
            
            
            actionButtons.forEach(button => button.disabled = false);
            
            
            updateStats();
            alert('Game loaded successfully!');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to load game!');
        });
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

function triggerDeath() {
    isDead = true;
    tamagotchi.classList.add("dead");
    
    actionButtons.forEach(button => button.disabled = true);

    setTimeout(() => {
        deadImage.style.display = "block";
    }, 2000);
}

updateStats();


document.querySelectorAll('.actions button').forEach(button => {
    const action = button.textContent.toLowerCase();
    switch(action) {
        case 'feed':
            button.onclick = feedPet;
            break;
        case 'play':
            button.onclick = playWithPet;
            break;
        case 'sleep':
            button.onclick = putToSleep;
            break;
        case 'tell a fact':
            button.onclick = tellFact;
            break;
        case 'save game':
            button.onclick = saveGame;
            break;
        case 'load game':
            button.onclick = loadGame;
            break;
        case 'new game':
            button.onclick = resetGame;
            break;
    }
});
