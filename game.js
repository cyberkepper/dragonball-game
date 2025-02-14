// Obtenemos los datos de los personajes del fichero characters.json
(async () => {
    try {
        const response = await fetch('./characters.json');
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        
        const characters = await response.json();
        
        console.log('Characters loaded successfully:', characters);

        function loadCharacters() {
            const charactersContainer = document.getElementById('characters-container');
            
            for (const character of characters) {
                const card = document.createElement('div');
                card.className = 'player-card';
                card.innerHTML = `
                    <h3>${character.name} (${character.race})</h3>
                    <img src="${character.image}" alt="${character.name}">
                `;
                
                charactersContainer.appendChild(card);
            }
        }
        
        function startBattle() {
            const player1Index = Math.floor(Math.random() * characters.length);
            const player2Index = (player1Index + 1) % characters.length;
        
            const player1 = characters[player1Index];
            const player2 = characters[player2Index];
        
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
            for (let i = 0; i < 3; i++) {
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
            }
        
            determineWinner(player1, player2);
        }
        
        function determineWinner(player1, player2) {
            const winner = player1.Ki > player2.Ki ? player1 : player2;
            console.log(`El ganador es ${winner.name}!`);
            alert(`¡El ganador es ${winner.name}!`);
        
            // Reset the game
            resetGame();
        }
        
        function resetGame() {
            currentTurn = 0;
            battleRounds = 3;
            document.body.innerHTML = ''; // Clear the DOM
            loadCharacters(); // Reload characters
        }
        startBattle()

    } catch (error) {
        console.error('Error loading characters:', error.message);
    }
})();

