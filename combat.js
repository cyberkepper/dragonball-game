// combat.js


// Función para obtener un personaje por ID
function getCharacterById(id) {
    return characters.find(char => char.id === id);
}

// Función para simular combate
function simulateCombat(character1Id, character2Id) {
    const character1 = getCharacterById(character1Id);
    const character2 = getCharacterById(character2Id);

    if (!character1 || !character2) {
        console.error("One or both characters not found.");
        return;
    }

    // Simular combate basado en el ki
    let winner;

    if (Math.random() < 0.5) {
        winner = character1;
    } else {
        winner = character2;
    }

    console.log(`${winner.name} gana el combate!`);
}

// Ejemplo de uso: Simular un combate entre Goku y Vegeta
simulateCombat(1, 2);