// call on the canvas
var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
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
    labels[0].innerHTML = this.value;
    position = positionSlider.value;
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

const rectangle = (posX, posY) => {
    c.save();
    c.beginPath();
    c.fillStyle = "#668cff";
    c.fillRect(posX, posY, 80, 50);
    c.fillStyle = "white";
    c.font = "15pt sans-serif";
    c.textAlign="center";
    c.textBaseline = "middle";
    c.fillText(massMsg, posX+(80/2),posY+(50/2));
    c.stroke();
    c.restore();
}

const drawTube = (posX, posY, width, height) => {
    c.save();
    c.beginPath();
    c.fillStyle = "#668cff";
    c.fillRect(posX, posY, width, height);
    c.restore();
}

const drawOutline = (posX, posY, width, height) => {
    c.save();
    c.beginPath();
    c.strokeStyle = "#668cff";
    c.rect(posX, posY, width, height);
    c.stroke();
    c.restore();
}

const connectingCircle = (posX, posY, radius) => {
    c.arc(posX, posY, radius, 0, Math.PI, false);
    c.lineWidth = 5;
    c.strokeStyle = '#668cff';
    c.stroke();
}

const startPos = () => {
    //drawTube(100, 150, 50, 400);
    drawOutline(100, 150, 50, 300);
    drawTube(175, 150, 20, 400); //The stand for the tube
    drawTube(150, 300, 40, 10); //The connecting pillar for the tube

    //drawTube(275, 350, 50, 50);
    drawTube(350, 150, 20, 400); //The stand for the box
    connectingCircle(210, 450, 87.5);
}

startPos();

function animateBox () {
    c.clearRect(0, 0, 700, 700);
    const currPos = position;
    console.log(currPos);
    drawImage();
    startPos();


    //Increase the y pos by the same amount you decrease the height
    drawTube(100, 50 + (400 - currPos), 50, currPos); //Draw the increase water tube
    drawTube(275, 500 - (400 - currPos), 50, 50); //Draw the increasing box for the water

    drawTube(295, 500 - (400 - currPos), 5, 350 - currPos); //Draw the connecting tube for the box
    drawTube(320, 520 - (400 - currPos), 40, 10);
    requestAnimationFrame(animateBox);
}
animateBox();