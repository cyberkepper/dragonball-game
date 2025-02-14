// api.js
const axios = require('axios');

async function getCharacters() {
    const response = await axios.get('https://dragonball-api.com/api/characters?limit=1000');
    return response.data;
}

module.exports = { getCharacters };