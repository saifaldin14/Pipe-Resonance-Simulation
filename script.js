// call on the canvas
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var audio = document.getElementById("audio");
var wood = document.getElementById("wood");
var pat = c.createPattern(wood, "repeat");
let img = new Image();
img.src = './assets/bg.jpg';

function setup() {
    canvas.height = 625;
    canvas.width = 625;
}
setup();

img.addEventListener("load", () => {
    c.save()
    c.globalCompositeOperation='destination-over'
    c.drawImage(img, 0, 0, 600, 600);
    c.restore();
})

const drawImage = () => {
    c.save()
    c.globalCompositeOperation='destination-over'
    c.drawImage(img, 0, 0, 600, 600);
    c.restore();
}
drawImage();

var positionSlider = document.getElementById("position");
var position = positionSlider.value;
var sliders = [positionSlider]

// labels for the inputs
var positionLabel = document.getElementById("positionLabel");
var labels = [positionLabel]

// changing the values of the sliders in real time
sliders[0].oninput = function () {
    let num = (this.value / 3).toFixed(2);
    let labelVal = num + "cm";
    labels[0].innerHTML = labelVal;
    //labels[0].innerHTML = this.value + "cm";
    position = positionSlider.value;
    updateAudio(this.value);
}

const drawRamp = (angle) => {
    angle = (angle + 1) % 360;

    c.save();
    c.translate(570, 570);
    c.rotate(angle * Math.PI / 180);
    c.translate(-570, -570);

    c.beginPath();
    //c.moveTo(-750, 0);
    c.moveTo(570, 570);
    c.lineWidth = 20;
    //c.lineTo(0, 0);
    c.lineTo(50, 570);
    c.translate(0, 570);
    c.strokeStyle=pat;
    c.stroke();
    c.restore();
}

function drawBase() {
    c.save()
    c.beginPath();
    c.rotate(0 * Math.PI / 180);
    c.moveTo(570, 570);
    c.lineWidth = 30;
    c.lineTo(50, 570);
    c.strokeStyle=pat;
    c.stroke();
    c.restore();
}

const drawLine = (x1, y1, x2, y2) => {
    c.save();
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineWidth = 5;
    c.lineTo(x2, y2);
    c.stroke();
    c.restore();
}

function genRand(min, max, decimalPlaces) {
    var rand = Math.random()*(max-min) + min;
    var power = Math.pow(100, decimalPlaces);
    return Math.floor(rand*power) / power;
}

const rectangle = (posX, posY, colour) => {
    c.save();
    c.beginPath();
    c.fillStyle = colour;
    c.fillRect(posX, posY, 80, 50);
    c.fillStyle = "white";
    c.font = "15pt sans-serif";
    c.textAlign="center";
    c.textBaseline = "middle";
    c.fillText(massMsg, posX+(80/2),posY+(50/2));
    c.stroke();
    c.restore();
}

const drawTube = (posX, posY, width, height, colour) => {
    c.save();
    c.beginPath();
    c.fillStyle = colour;
    c.fillRect(posX, posY, width, height);
    c.restore();
}

const drawOutline = (posX, posY, width, height) => {
    c.save();
    c.beginPath();
    c.strokeStyle = "#000000";
    c.rect(posX, posY, width, height);
    c.stroke();
    c.restore();
}

const connectingCircle = (posX, posY, radius) => {
    c.arc(posX, posY, radius, 0, Math.PI, false);
    c.lineWidth = 5;
    c.strokeStyle = '#000000';
    c.stroke();
}

const startPos = () => {
    //drawTube(100, 150, 50, 400);
    drawTube(175, 150, 20, 400, "#666666"); //The stand for the tube
    drawTube(150, 300, 40, 10, "#000000"); //The connecting pillar for the tube

    //drawTube(275, 350, 50, 50);
    drawTube(350, 150, 20, 400, "#666666"); //The stand for the box
    connectingCircle(210, 450, 87.5);
}

startPos();

function animateBox () {
    c.clearRect(0, 0, 700, 700);
    const currPos = position;
    drawImage();
    startPos();


    //Increase the y pos by the same amount you decrease the height
    drawTube(100, 50 + (400 - currPos), 50, currPos, "#668cff"); //Draw the increase water tube
    drawTube(275, 500 - (400 - currPos), 50, 50, "#000000"); //Draw the increasing box for the water

    drawTube(295, 500 - (400 - currPos), 5, 350 - currPos, "#000000"); //Draw the connecting tube for the box
    drawTube(320, 520 - (400 - currPos), 40, 10, "#000000"); //The connecting pillar for the box

    drawOutline(100, 150, 50, 300);
    requestAnimationFrame(animateBox);
}
animateBox();

function updateAudio(pos) {
    console.log(pos);
    switch (true) {
        case (pos >= 180 && pos < 195):
            audio.volume = 0.2;
            break;
        case (pos >= 195 && pos < 210):
            audio.volume = 0.3;
            break;
        case (pos >= 210 && pos < 225):
            audio.volume = 0.4;
            break;
        case (pos >= 225 && pos < 240):
            audio.volume = 0.5;
            break;
        case (pos >= 240 && pos < 255):
            audio.volume = 0.6;
            break;
        case (pos >= 255 && pos < 270):
            audio.volume = 0.7;
            break;
        case (pos >= 270 && pos < 285):
            audio.volume = 0.8;
            break;
        case (pos >= 285 && pos < 300):
            audio.volume = 0.9;
            break;
        case (pos >= 300):
            audio.volume = 0;
            break;
        default:
            audio.volume = 0;
    }
    if (pos >= 180) {
        audio.play();
        console.log("Audio!");
    }
}
function playAudio() {
    const pos = position;
    console.log(pos);
    // switch (pos) {
    //     case 180:
    //         audio.volume = 0.2;
    //         break;
    //     case 195:
    //         audio.volume = 0.3;
    //         break;
    //     case 210:
    //         audio.volume = 0.4;
    //         break;
    //     case 225:
    //         audio.volume = 0.5;
    //         break;
    //     case 240:
    //         audio.volume = 0.6;
    //         break;
    //     case 255:
    //         audio.volume = 0.7;
    //         break;
    //     case 270:
    //         audio.volume = 0.8;
    //         break;
    //     case 285:
    //         audio.volume = 0.9;
    //         break;
    //     case 300:
    //         audio.volume = 0;
    //         break;
    //     default:
    //         audio.volume = 0;
    // }
    if (pos >= 180) {
        audio.play();
        console.log("Audio!");
    }
}
