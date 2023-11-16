// Get the canvas element and its 2D rendering context
const canvas = document.getElementById('animationCanvas');
const ctx = canvas.getContext('2d');

// Define initial positions and colors for the cars
const cars = [
    { x: 10, y: 100, color: "red" },
    { x: 10, y: 400, color: "green" },
    { x: 10, y: 700, color: "blue" }
];

// Initialize animation status and current car index
let animationInProgress = false;
let currentCarIndex = 0;

// Function to draw a car with a gradient
function drawCar(car) {
    // Create a linear gradient for the car's color
    let gradient = ctx.createLinearGradient(car.x, car.y, car.x + 50, car.y + 20);
    gradient.addColorStop(0, car.color);
    gradient.addColorStop(1, 'white');

    ctx.fillStyle = gradient;
    ctx.fillRect(car.x, car.y, 50, 20);
}

// Function to clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Function to move a car based on speed
function moveCar(car) {
    const speed = document.getElementById('speedControl').value;
    if (speed > 0 && car.x < canvas.width - 50) {
        car.x += speed / 10;
    }
    drawCar(car);
}

// Function to animate all cars
function animateCars() {
    clearCanvas();
    let allCarsFinished = true;
    cars.forEach(car => {
        moveCar(car);
        if (car.x < canvas.width - 50) {
            allCarsFinished = false;
        }
    });

    if (!allCarsFinished) {
        requestAnimationFrame(animateCars);
    } else {
        animationInProgress = false;
    }
}

// Function to start all cars simultaneously
function startAllCars() {
    if (!animationInProgress) {
        animationInProgress = true;
        animateCars();
    }
}

// Function to start moving one car at a time
function startOneCar() {
    if (!animationInProgress) {
        animationInProgress = true;
        animateSingleCar(currentCarIndex);
    }
}

// Function to animate a single car
function animateSingleCar(index) {
    if (index >= cars.length) {
        index = 0;
    }
    clearCanvas();
    moveCar(cars[index]);
    drawOtherCars(index);
    if (cars[index].x < canvas.width - 50) {
        requestAnimationFrame(() => animateSingleCar(index));
    } else {
        animationInProgress = false;
        currentCarIndex = (index + 1) % cars.length;
    }
}

// Function to draw all other cars except the one at the specified index
function drawOtherCars(excludeIndex) {
    cars.forEach((car, index) => {
        if (index !== excludeIndex) {
            drawCar(car);
        }
    });
}

// Function to reset the cars to their initial positions
function resetCars() {
    animationInProgress = false;
    currentCarIndex = 0;
    cars.forEach(car => car.x = 10);
    clearCanvas();
    cars.forEach(drawCar);
}

// Draw cars initially
resetCars();
