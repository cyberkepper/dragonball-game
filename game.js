// game.js

const characterSelect = document.getElementById('characterSelect');
const playerCard = document.getElementById('playerCard');
const enemyCard = document.getElementById('enemyCard');

let currentPlayerCharacter;

fetch('characters.json')
    .then(response => response.json())
    .then(characters => {
        characters.forEach(character => {
            const option = document.createElement('option');
            option.value = character.name;
            option.textContent = character.name;
            characterSelect.appendChild(option);
        });

        // Select the first character by default
        if (characters.length > 0) {
            startGame();
        }
    })
    .catch(error => console.error('Error al cargar el archivo JSON:', error));

function startGame() {
    const playerCharacter = document.getElementById('characterSelect').value;

    fetch('characters.json')
        .then(response => response.json())
        .then(characters => {
            currentPlayerCharacter = characters.find(character => character.name === playerCharacter);

            if (!currentPlayerCharacter) {
                console.error(`El personaje ${playerCharacter} no se encontró.`);
                return;
            }

            // Update the player card
            updatePlayerCard(currentPlayerCharacter);

            // Start a new combat with a random enemy
            startCombat();
        })
        .catch(error => console.error('Error al cargar los personajes:', error));
}

function updatePlayerCard(character) {
    const { name, ki, image } = character;
    playerCard.innerHTML = `
        <img src="${image}" alt="${name}">
        <p>Name: ${name}</p>
        <p>Power Level: ${ki}</p>
    `;
}

function startCombat() {
    // Clear the enemy card
    enemyCard.innerHTML = '';

    fetch('characters.json')
        .then(response => response.json())
        .then(characters => {
            // Generate a random enemy and update the enemy card
            const randomEnemy = characters[Math.floor(Math.random() * characters.length)];
            updateEnemyCard(randomEnemy);

            // Simulate a combat
            simulateCombat();
        })
}

function updateEnemyCard(enemy) {
    const { name, ki, image } = enemy;
    enemyCard.innerHTML = `
        <img src="${image}" alt="${name}">
        <p>Name: ${name}</p>
        <p>Power Level: ${ki}</p>
    `;
}

function simulateCombat() {
    // Simulate a combat
    const result = Math.random() < 0.5 ? "Gana" : "Pierde";
    console.log(`El resultado es: ${result}`);

    if (result === "Gana") {
        playerCard.classList.add('player-win');
        enemyCard.classList.add('enemy-lose');
    } else {
        playerCard.classList.add('enemy-lose');
        enemyCard.classList.add('player-win');
    }

    // Reset the player and enemy cards after 2 seconds
    setTimeout(() => {
        playerCard.classList.remove('player-win', 'enemy-lose');
        enemyCard.classList.remove('player-win', 'enemy-lose');
    }, 3000);
}

// Initialize the game with the first character selected
startGame();

// Update the player card when the character selection changes
characterSelect.addEventListener('change', startGame);