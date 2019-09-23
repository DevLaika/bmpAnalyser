import fs from 'fs'
import bmpJs from 'bmp-js'

const bmpBuffer = fs.readFileSync('maskTemplate.bmp')
const bmpData = bmpJs.decode(bmpBuffer)

fs.writeFileSync('data.txt', bmpData.data);

// // Create new colorList array with amount of pixels
// let colorList = new Array(bmpData.data.length / 4)
// // Insert colors into colorList by reading bmp data
// for (let i = 0; i < colorList.length; i++) {
//     let newColor = []
//     for (let j = 0; j < 3; j++) { // Grab only the last 3 RGB values for the pixel (first value is alpha, to grab alpha as well back change 3 --> 4 and remove the +1 from the next line)
//         newColor[j] = bmpData.data[i*4+j+1]
//     }
//     colorList[i] = newColor
// }

// // Create new colorMatrix array with image height and width
// let colorMatrix = new Array(bmpData.height)
// for (let i = 0; i < bmpData.height; i++) {
//     colorMatrix[i] = new Array(bmpData.width)
// }
// // Insert colors into colorMatrix from colorList 
// for(let i = 0; i < bmpData.height; i++) {
//     for (let j = 0; j < bmpData.width; j++) {
//         colorMatrix[i][j] = colorList[i * bmpData.width + j]
//     }
// }

// fs.writeFileSync('data.txt', JSON.stringify(colorMatrix), 'utf8')
