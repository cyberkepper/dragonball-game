const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Ruta donde se guardaran las imagenes
const downloadDir = 'images';
if (!fs.existsSync(downloadDir)) {
    fs.mkdirSync(downloadDir);
}

// importar characters.json
const characters = require('./characters.json');

// Función para descargar y guardar la imagen
async function downloadImage(imageUrl, directory) {
    try {
        const response = await axios.get(imageUrl, { responseType: 'stream' });
        
        // Nombre del archivo
        const fileName = path.basename(new URL(imageUrl).href);
        const filePath = path.join(directory, fileName);

        // Guardar la imagen en el directorio especificado
        return new Promise((resolve, reject) => {
            response.data.pipe(fs.createWriteStream(filePath))
                .on('finish', () => resolve(`Imagen guardada: ${filePath}`))
                .on('error', reject);
        });
    } catch (error) {
        console.error(`Error al descargar la imagen de ${imageUrl}:`, error.message);
        return null;
    }
}

// Descargar las imágenes
characters.items.forEach(char => {
    const imageUrl = char.image;
    downloadImage(imageUrl, downloadDir)
        .then(result => {
            if (result) {
                console.log(result);
            }
        })
        .catch(err => {
            console.error(`Error al descargar la imagen de ${char.name}:`, err);
        });
});