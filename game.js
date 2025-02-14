// game.js

const characterSelect = document.getElementById('characterSelect');
const gameContainer = document.getElementById('game-container');

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

            // Convertir ki a un número
            const { name, ki, image } = currentPlayerCharacter;

            // Mostrar la tarjeta del jugador
            showCharacterCard(name, image);

            // Iniciar el combate y mostrar el enemigo
            startCombat();
        })
        .catch(error => console.error('Error al cargar los personajes:', error));
}

function showCharacterCard(name, image) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h2>${name}</h2>
        <img src="${image}" alt="${name}">
        <p>Power Level: ${currentPlayerCharacter.ki}</p>
    `;
    gameContainer.appendChild(card);
}

function startCombat() {
    const opponentIndex = Math.floor(Math.random() * characters.length);
    const opponent = characters[opponentIndex];

    // Mostrar la tarjeta del enemigo
    showOpponentCard(opponent);

    // Simular el combate
    battle(currentPlayerCharacter, opponent);
}

function showOpponentCard(opponent) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <h2>Enemy</h2>
        <img src="${opponent.image}" alt="Enemy">
        <p>Power Level: ${opponent.ki}</p>
    `;
    gameContainer.appendChild(card);
}

function battle(playerCharacter, opponent) {
    console.log(`${playerCharacter.name} vs ${opponent.name}: Iniciando combate...`);
    // Simular el resultado del combate
    const result = Math.random() < 0.5 ? "Gana" : "Pierde";
    console.log(`El resultado es: ${result}`);
}

const characters = [
    { name: "Goku", ki: 9000, image: "/images/goku.webp" },
    { name: "Vegeta", ki: 8500, image: "/images/vegeta_normal.webp" }
];

// Inicializar el juego
startGame();