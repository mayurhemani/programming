var x = 1;
function move(dx, dy) {
	let box = document.getElementById("thebox");
	let xpos = box.offsetLeft;
	let ypos = box.offsetTop;
	xpos = xpos + dx;
	ypos = ypos + dy;
	box.style.left = xpos + "px";
	box.style.top = ypos + "px";

	box.src = "helicopter" + x + ".png";
	x = x + 1;
	if (x > 2) {
		x = 1;
	}
}

var state = "not-pressing";
var ctr = 0;
var speed = 5;
var speedForFirstBox = 5;
var dirForFirstBox = null;
var speedForSecondBox = 5;

function changeSize(dWidth, dHeight) {
	let box = document.getElementById("thebox");
	let w = box.offsetWidth
	let h = box.offsetHeight;
	w = w + dWidth;
	h = h + dHeight;
	box.style.width = w + "px";
	box.style.height = h + "px";
	box.style.borderRadius = (w/2) + "px";
}


function myKeyboardHandler(ev) {
	ctr = ctr + 1;
	if (state == "not-pressing") {
		state = "pressing";
	} else if (state == "pressing" && ctr >= 10) {
		state = "long-pressing";
		speed = speed + 5;
	} else if (state == "long-pressing") {
		speed = speed + 5;
	}

	if (ev.key == "ArrowUp") {
		move(0, -speed);
		dir = "up";
	} else if (ev.key == "ArrowDown") {
		move(0, speed);
		dir = "down";
	} else if (ev.key == "ArrowLeft") {
		move(-speed, 0);
		dir = "left";
	} else if (ev.key == "ArrowRight") {
		move(speed, 0);
		dir = "right";
	}

}
/*
var clk = null;

function braking() {
	if (dir == "right") {
		move(speed, 0);
	} else if (dir == "down") {
		move(0, speed);
	} else if (dir == "up") {
		move(0, -speed);
	} else if (dir == "left") {
		move(-speed, 0);
	}
	if (speed > 0) {
		speed = speed - 0.5;
	} else {
		clearInterval(clk);
	}
}
*/

function myKeyUpHandler(ev) {
	ctr = 0;
	speed = 5;
	state = "not-pressing";
}
window.addEventListener("keydown", myKeyboardHandler);
window.addEventListener("keyup", myKeyUpHandler);

