import fs from 'fs'
import bmpJs from 'bmp-js'

const bmpBuffer = fs.readFileSync('maskTemplate.bmp')
const bmpData = bmpJs.decode(bmpBuffer)


// Create new colorValues array with amount of pixels
let colorValues = '';
// Insert colors into colorValues by reading bmp data
for (let i = 0; i < bmpData.data.length / 4; i++) {
    for (let j = 0; j < 3; j++) { // Grab only the last 3 RGB values for the pixel (first value is alpha, to grab alpha as well back change 3 --> 4 and remove the +1 from the next line)
        colorValues += String.fromCharCode(bmpData.data[i*4+j+1])
    }
}

fs.writeFileSync('data.txt', colorValues);
