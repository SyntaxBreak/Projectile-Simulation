// HTML Objects
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const startButton = document.getElementById("start-button");
const resetButton = document.getElementById("reset-button");

const maxHeightLabel = document.getElementById("max-height");
const travelTimeLabel = document.getElementById("travel-time");
const travelDistanceLabel = document.getElementById("travel-distance");

const initialAngleInput = document.getElementById("angle-slider");
const initialAngleLabel = document.getElementById("angle-text");

const initialVelocityInput = document.getElementById("velocity-slider");
const initialVelocityLabel = document.getElementById("velocity-text");

// Config Variables
const gravity = 9.81;

const startingX = 50;
const startingY = canvas.height - 50;

const steps = 40;

const maxPreviousTrajectories = 2;

// Internal Variables
var previousTrajectories = [];
var travelTime, maxHeight, travelDistance;
var xVelocity, yVelocity;

// Initialisation
initialAngleLabel.innerHTML = initialAngleInput.value + "°";
initialVelocityLabel.innerHTML = initialVelocityInput.value + "m/s";
calculateTrajectory();

// Main Functions
function calculateTrajectory() {
	const launchAngle = parseInt(initialAngleInput.value) * Math.PI / 180;
	const launchVelocity = parseInt(initialVelocityInput.value);

	xVelocity = launchVelocity * Math.cos(launchAngle);
	yVelocity = launchVelocity * Math.sin(launchAngle);

	travelTime = 2 * yVelocity / gravity;
	maxHeight = yVelocity**2 / (gravity * 2);
	travelDistance = xVelocity * travelTime;

	maxHeightLabel.textContent = "Maximum Height: " + roundTo(maxHeight, 2) + " metres";
	travelTimeLabel.textContent = "Travel Duration: " + roundTo(travelTime, 2) + " seconds";
	travelDistanceLabel.textContent = "Travel Distance: " + roundTo(travelDistance, 2) + " metres";
}

function drawTrajectory(xVelocity, yVelocity, travelTime, color, drawGroundLine) {
	const timePerStep = travelTime / steps;

	if (drawGroundLine) {
		ctx.beginPath();
		ctx.moveTo(startingX, startingY);
		ctx.lineTo(startingX + xVelocity * travelTime, startingY);
		ctx.strokeStyle = "gray"; ctx.lineWidth = 2;
		ctx.setLineDash([15, 6]);
		ctx.stroke();
	}

	ctx.beginPath();
	ctx.moveTo(startingX, startingY);
	for (i = 0; i <= steps; i++) {
		var currentTime = timePerStep * i;
		var currentX = startingX + xVelocity * currentTime;
		var currentY = startingY - (yVelocity * currentTime - 0.5 * gravity * currentTime**2);

		//console.log(currentX, currentY);
		ctx.lineTo(currentX, currentY);
	}
	ctx.strokeStyle = color; ctx.lineWidth = 5;
	ctx.lineCap = "round";
	ctx.setLineDash([]);
	ctx.stroke();
}

// Misc Functions
function roundTo(number, precision) {
	return Math.round(number * 10**precision) / 10**precision;
}

// Input Bindings
initialAngleInput.oninput = function() {
	initialAngleLabel.innerHTML = initialAngleInput.value + "°";
	calculateTrajectory();
};

initialVelocityInput.oninput = function() {
	initialVelocityLabel.innerHTML = initialVelocityInput.value + "m/s";
	calculateTrajectory();
};

startButton.addEventListener("click", function() {
	console.log(previousTrajectories.length);
	if (previousTrajectories.length > maxPreviousTrajectories) {
		console.log("shifted");
		previousTrajectories.shift();
	}
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (var trajectoryData of previousTrajectories) {
		drawTrajectory(trajectoryData.xVelocity, trajectoryData.yVelocity, trajectoryData.travelTime, "gray", false);
	}

	

	drawTrajectory(xVelocity, yVelocity, travelTime, "white", true);
	previousTrajectories.push({xVelocity, yVelocity, travelTime});

	

});

resetButton.addEventListener("click", function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
});