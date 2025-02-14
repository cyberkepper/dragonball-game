# Descripción del Proyecto: Lucha de Personajes

## Propósito y Funcionalidades

El proyecto "Lucha de Personajes" es una aplicación simple que permite seleccionar dos personajes para luchar entre sí en una batalla con rondas predefinidas. Los personajes tienen diferentes ataques con daño randomizado, y el objetivo es determinar quién gana basado en la cantidad de Ki (energía) restante.

### Características Principales

1. **Selección de Personajes**:
   - Permite cargar una lista de personajes desde un archivo JSON o `localStorage`.
   - Muestra las tarjetas de los personajes con su imagen, nombre y estadísticas en el DOM.

2. **Iniciar Batalla**:
   - Selecciona al azar dos personajes para la batalla.
   - Inicia una serie de rondas (por defecto 3).

3. **Batalla**:
   - Cada personaje tiene ataques con daño randomizado.
   - Al finalizar cada ronda, se actualiza el Ki del atacante y se evalúa el estado de ambos personajes.

4. **Determinación del Ganador**:
   - El personaje que tenga más Ki al final de las rondas es declarado ganador.
   - Si ninguno tiene Ki restante, se considera un empate.

5. **Reseteo y Nuevas Batallas**:
   - Después de cada batalla, el juego puede ser reseteado para iniciar una nueva lucha.

### Estructura del Código

- **HTML (`index.html`)**: 
  - Contiene los elementos HTML básicos necesarios para la interfaz.
  
- **CSS**: 
  - Estilos simples para las tarjetas de personajes y botones de ataques.
  
- **JavaScript (`game.js`)**:
  - Lógica del juego, incluyendo el manejo de personajes, batallas, ataques y resultados.

### Ejecución

1. **Cargar Personajes**:
   - Los personajes pueden ser cargados desde un archivo JSON o `localStorage`.

2. **Iniciar Batalla**:
   - Seleccionar dos personajes para la batalla.
   - Iniciar las rondas de batalla y evaluar el resultado.

3. **Resultado**:
   - Mostrar al ganador o declarar empate.

### Ejemplo de Código

```javascript
// game.js

const characters = JSON.parse(localStorage.getItem('characters')) || [];

let currentTurn = 0;
let battleRounds = 3;

function loadCharacters() {
    const charactersContainer = document.getElementById('characters');
    characters.forEach(char => {
        const card = document.createElement('div');
        card.className = 'character-card';
        
        const characterImage = document.createElement('img');
        characterImage.src = char.image;
        
        const description = document.createElement('p');
        description.textContent = `${char.name} (${char.race})`;
        
        card.appendChild(characterImage);
        card.appendChild(description);
        
        charactersContainer.appendChild(card);
    });
}

function startBattle() {
    if (!characters.length) {
        alert("¡Primero selecciona los personajes!");
        return;
    }
    
    const selectedCharacters = characters.slice(0, 2).map(char => char.name);
    console.log(`Luchando entre ${selectedCharacters[0]} y ${selectedCharacters[1]}`);
    
    let player1 = characters.find(char => char.name === selectedCharacters[0]);
    let player2 = characters.find(char => char.name === selectedCharacters[1]);

    displayBattle(player1, player2);
}

function displayBattle(player1, player2) {
    const battleContainer = document.createElement('div');
    battleContainer.className = 'battle-container';
    
    // Display player 1
    const player1Card = document.createElement('div');
    player1Card.className = 'player-card';
    player1Card.innerHTML = `
        <h3>${player1.name} (${player1.race})</h3>
        <img src="${player1.image}" alt="${player1.name}">
    `;
    
    // Display player 2
    const player2Card = document.createElement('div');
    player2Card.className = 'player-card';
    player2Card.innerHTML = `
        <h3>${player2.name} (${player2.race})</h3>
        <img src="${player2.image}" alt="${player2.name}">
    `;
    
    // Add players to battle container
    battleContainer.appendChild(player1Card);
    battleContainer.appendChild(player2Card);

    document.body.appendChild(battleContainer);

    startRounds(player1, player2);
}

function startRounds(player1, player2) {
    for (let i = 0; i < battleRounds; i++) {
        const attack = Math.floor(Math.random() * 10) + 1;
        
        if (Math.random() > 0.5) {
            // Player 1 attacks
            player2.Ki -= attack;
            console.log(`${player1.name} ataca a ${player2.name} por ${attack} de daño. ${player2.name} tiene ahora ${player2.Ki} Ki.`);
        } else {
            // Player 2 attacks
            player1.Ki -= attack;
            console.log(`${player2.name} ataca a ${player1.name} por ${attack} de daño. ${player1.name} tiene ahora ${player1.Ki} Ki.`);
        }

        if (currentTurn % 2 === 0) {
            currentTurn++;
        }
    }
    
    determineWinner(player1, player2);
}

function determineWinner(player1, player2) {
    const winner = player1.Ki > player2.Ki ? player1.name : player2.name;
    console.log(`El ganador es ${winner}!`);
    alert(`¡El ganador es ${winner}!`);
    
    // Reset the game
    resetGame();
}

function resetGame() {
    currentTurn = 0;
    battleRounds = 3;
    document.body.innerHTML = ''; // Clear the DOM
    loadCharacters(); // Reload characters
}
```