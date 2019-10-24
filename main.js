import fs from 'fs' // Use fs package
import imageDecode from 'image-decode'

const images = fs.readdirSync('image');
const exclude = [57,75,76,93,94,95,96,111,112,113,114,115,116,129,130,131,132,133,134,135,136,137,146,147,148,149,150,151,152,153,154,155,156,165,166,167,168,169,170,171,172,173,186,187,188,189,190,191,206,207,208,209,226,227,228,246];
let charList = '';

images.forEach(image => {
    console.log(image);
})

images.forEach(image =>  {

    let bmpData = imageDecode(fs.readFileSync(`image/${image}`)); // TODO: GET THIS TO A DIR

    let colorList = new Array(bmpData.data.length / 4)
    
    // Insert colors into colorValues by reading bmp data
    for (let i = 0; i < colorList.length; i++) {
        let newColor = []
        for (let j = 0; j < 3; j++) { // Grab only the last 3 RGB values for the pixel (first value is alpha, to grab alpha as well back change 3 --> 4 and remove the +1 from the next line)
            newColor[j] = bmpData.data[i*4+j]
        }
        colorList[i] = newColor
    }

    let colorMatrix = new Array(bmpData.height)
    for (let i = 0; i < bmpData.height; i++) {
        colorMatrix[i] = new Array(bmpData.width)
    }
    // Insert colors into colorMatrix from colorList 
    for(let i = 0; i < bmpData.height; i++) {
        for (let j = 0; j < bmpData.width; j++) {
            colorMatrix[i][j] = colorList[i * bmpData.width + j]
        }
    }
    
    let colorValues = []; // Create eventual byte variable where color values will be stored
    let inv = false;
    let b = 7;
    for (let i = 0; i < 15; i++) {
        for (let j=0; j<19;j++) {
            // for(let n=0; n<3; n++) {
                if (inv) {
                    colorValues.push(colorMatrix[18-j][b]);
                }
                if (!inv) {
                    colorValues.push(colorMatrix[j][b]);
                }
            // }
        }
        inv = !inv;
        b = (b + 1)%15;
    }
    
    for(let i=0;i<exclude.length;i++) {
        colorValues.splice(exclude[i]-i,1)
    }
    
    for(let i = 0; i<colorValues.length; i++) {
        for (let j=0; j<3; j++) {
            charList += String.fromCharCode(colorValues[i][j])
        }
    }
});
console.log(charList.length)
fs.writeFileSync('data.txt', charList, 'ascii'); // Write the byets to data.txt