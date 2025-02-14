// app.js (modificado)
const express = require('express');
const readlineSync = require('readline-sync');
const fs = require('fs');
const { getCharacters } = require('./api');

const app = express();
const PORT = 3000;

app.use(express.json());

async function fetchCharacters() {
    const characters = await getCharacters();
    fs.writeFileSync('characters.json', JSON.stringify(characters, null, 2));
    return characters;
}

app.get('/characters', async (req, res) => {
    try {
        const characters = await fetchCharacters();
        res.send(characters);
    } catch (error) {
        res.status(500).send('Error fetching characters');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});