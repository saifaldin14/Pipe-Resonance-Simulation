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
});

audio.addEventListener('ended', function() {
    this.currentTime = 0;
    this.play();
}, false);
//audio.play();
audio.volume = 0.5;

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

const drawLine = (x1, y1, x2, y2) => {
    c.save();
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineWidth = 4;
    c.lineTo(x2, y2);
    c.strokeStyle = '#000000';
    c.stroke();
    c.restore();
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

const drawCircle = (x, y, r, colour) => {
    c.beginPath();
    c.arc(x, y, r, 0, 2 * Math.PI);
    c.fillStyle = colour;
    c.fill();
    //c.restore();
}

const connectingCircle = (posX, posY, radius) => {
    c.arc(posX, posY, radius, 0, Math.PI, false);
    c.lineWidth = 5;
    c.strokeStyle = '#000000';
    c.stroke();
}

const startPos = () => {
    //drawTube(100, 150, 50, 400);
    drawTube(250, 150, 20, 400, "#666666"); //The stand for the tube

    //Draw tick marks for the meter stick
    for (var i = 160; i <= 450; i+= 15) {
        console.log(i);
        drawLine(250, i, 260, i);
    }
    drawTube(225, 300, 40, 10, "#000000"); //The connecting pillar for the tube

    //drawTube(275, 350, 50, 50);
    drawTube(425, 150, 20, 400, "#666666"); //The stand for the box
    connectingCircle(285, 450, 87.5);

    drawTube(50, 400, 75, 150, "#000000"); //Draw base for speaker

    drawCircle(87.5, 510, 25, "#666666");
    drawCircle(87.5, 445, 25, "#666666");

    drawTube(87.5, 100, 5, 300, "#000000"); //First speaker wire
    drawTube(87.5, 100, 100, 5, "#000000"); //Second speaker wire
    drawTube(167.5, 80, 50, 40, "#000000"); //Draw microphone at the top of the tube
}

startPos();

function animateBox () {
    c.clearRect(0, 0, 700, 700);
    const currPos = position;
    drawImage();
    startPos();


    //Increase the y pos by the same amount you decrease the height
    drawTube(175, 50 + (400 - currPos), 50, currPos, "#668cff"); //Draw the increase water tube
    drawTube(350, 500 - (400 - currPos), 50, 50, "#000000"); //Draw the increasing box for the water

    drawTube(370, 500 - (400 - currPos), 5, 350 - currPos, "#000000"); //Draw the connecting tube for the box
    drawTube(385, 520 - (400 - currPos), 40, 10, "#000000"); //The connecting pillar for the box

    drawOutline(175, 150, 50, 300);
    requestAnimationFrame(animateBox);
}
animateBox();

function updateAudio(pos) {
    console.log(pos);
    switch (true) {
        case (pos == 180):
            audio.volume = 0.6;
            break;
        case (pos == 195):
            audio.volume = 0.65;
            break;
        case (pos == 210):
            audio.volume = 0.7;
            break;
        case (pos == 225):
            audio.volume = 0.75;
            break;
        case (pos == 240):
            audio.volume = 0.8;
            break;
        case (pos == 255):
            audio.volume = 0.85;
            break;
        case (pos == 270):
            audio.volume = 0.9;
            break;
        case (pos == 285):
            audio.volume = 0.95;
            break;
        case (pos == 300):
            audio.volume = 0.5;
            break;
        default:
            audio.volume = 0.5;
    }
    audio.play();
    // if (pos >= 180) {
    //     audio.play();
    //     console.log("Audio!");
    // }
}
