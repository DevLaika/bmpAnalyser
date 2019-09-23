import fs from 'fs' // Use fs package
import bmpJs from 'bmp-js' // Use bmp-js package

const bmpBuffer = fs.readFileSync('maskTemplate.bmp') // Import bmp image
const bmpData = bmpJs.decode(bmpBuffer) // Decode bmp image to bmpData


let colorValues = ''; // Create eventual byte variable where color values will be stored
// Insert colors into colorValues by reading bmp data
for (let i = 0; i < bmpData.data.length / 4; i++) { // For every four values (for every pixel in the image)
    for (let j = 0; j < 3; j++) { // Repeat 3 times with i increasing every time
        colorValues += String.fromCharCode(bmpData.data[i*4+j+1]) // Grab only the last 3 RGB values for the pixel (first value is alpha, unnececary for our purposes)
    }
}

fs.writeFileSync('data.txt', colorValues); // Write the byets to data.txt
