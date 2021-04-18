
function say( stage, message, x, y, leftOrRight, forThisTime ) {
	let d = document.createElement("div");
	d = stage.appendChild( d );
	d.classList.add( leftOrRight + "-dialog" );
	d.innerText = message;
	d.style.left = x + "px";
	d.style.top = y + "px";
	setTimeout( () => { d.remove(); }, forThisTime );
}


class Camel {
	constructor(x, y, stage) {
		let elem = document.createElement("img");
		elem.classList.add("sprite");
		elem.src = "assets/camel1.png";
		elem.style.left = x + "px";
		elem.style.top = y + "px";
		elem.style.width = "300px";
		elem.style.height = "200px";
		this.elem = stage.appendChild(elem);
		this.c = 0;
		this.stage = stage;
	}

	walkStep() {
		this.c = (this.c + 1) % 2;
		this.elem.src = "assets/camel" + (this.c + 1) + ".png";
		let x = this.elem.offsetLeft;
		x += 5;
		this.elem.style.left = x + "px";
	}

	walkBack() {
		this.c = (this.c + 1) % 2;
		this.elem.src = "assets/camel" + (this.c + 1) + ".png";
		let x = this.elem.offsetLeft;
		x -= 5;
		this.elem.style.left = x + "px";
	}
	
	say(message, forTime) {
		let time = forTime || 2000;
		let x = this.elem.offsetLeft + parseInt(this.elem.offsetWidth * 0.75);
		let y = this.elem.offsetTop - 50;
		say( this.stage, message, x, y, "left", time);
	}

	hide() {
		this.elem.classList.add("hidden");
	}

	show() {
		this.elem.classList.remove("hidden");
	}

};


class Ghost {
	constructor(x, y, stage) {
		let elem = document.createElement("img");
		elem.classList.add("sprite");
		elem.src = "assets/ghost1.png";
		elem.style.left = x + "px";
		elem.style.top = y + "px";
		elem.style.width = "110px";
		elem.style.height = "230px";
		this.elem = stage.appendChild(elem);
		this.c = 0;
		this.stage = stage;
	}

	walkStep() {
		this.c = (this.c + 1) % 2;
		this.elem.src = "assets/ghost" + (this.c + 1) + ".png";
		let x = this.elem.offsetLeft;
		x -= 5;
		this.elem.style.left = x + "px";
	}
	
	say(message, forTime) {
		let time = forTime || 2000;
		let x = this.elem.offsetLeft - 150;
		let y = this.elem.offsetTop - 50;
		say( this.stage, message, x, y, "right", time);
	}

	hide() {
		this.elem.classList.add("hidden");
	}

	show() {
		this.elem.classList.remove("hidden");
	}
};

class Action {
	constructor(obj, fn, params, startTime, endTime) {
		this.obj = obj || window;
		this.fn = fn;
		this.params = params;
		this.startTime = startTime;
		this.endTime = endTime;
	}
};

class SimpleAction {
	constructor(fn, startTime, endTime) {
		this.fn = fn;
		this.startTime = startTime;
		this.endTime = endTime;
	}
};


class ActionList {
	constructor() {
		this.list = [];
	}
	add(action) {
		this.list.push( action );
	}
	play(currentTime) {
		for (let i = 0, ie = this.list.length; i < ie; ++i) {
			// two cases - it may be a one-time thing if endTime is null
			// or it maybe a duration-wala thing
			let entry = this.list[i];
			if (entry.endTime) {
				// this is a case with some duration
				if (currentTime >= entry.startTime && currentTime < entry.endTime) {
					entry.fn();
				}
			} else if (currentTime == entry.startTime) {
				entry.fn();
			}
		}
	}
};


var camel1 = null;
var ghost1 = null;
var stage = document.getElementById("stage");

// actions
function setBG1() {
	document.querySelector("#bg1").classList.remove("hidden");
	document.querySelector("#bg2").classList.add("hidden");
}

function setBG2() {
	document.querySelector("#bg2").classList.remove("hidden");
	document.querySelector("#bg1").classList.add("hidden");
}


let script = new ActionList();

script.add( new SimpleAction(setBG1, 0) );
script.add( new SimpleAction(() => { camel1 = new Camel(10, 300, stage); }, 1) );
script.add( new SimpleAction(() => { camel1.walkStep() }, 2, 25) );
script.add( new SimpleAction(() => { camel1.say("Hello. I'm a camel") }, 25) );
script.add( new SimpleAction(() => { ghost1 = new Ghost(900, 200, stage); }, 5) );
script.add( new SimpleAction(() => { ghost1.walkStep() }, 5, 22) );
script.add( new SimpleAction(() => { ghost1.say("Arrh! I'm a ghost") },  39) );
script.add( new SimpleAction(() => { camel1.say("What brings you here") }, 100) );
script.add( new SimpleAction(() => { ghost1.say("I like to eat camels") }, 200) );
script.add( new SimpleAction(() => { camel1.say("Bye") }, 250) );
script.add( new SimpleAction(() => { camel1.walkBack(); }, 300, 400) );
script.add( new SimpleAction(setBG2, 500) );
script.add( new SimpleAction(() => { ghost1.hide(); }, 500));
script.add( new SimpleAction(() => { camel1.walkStep(); }, 550, 620) );


var clock = null;
var tick = 0;
var endTime = 10000;

function step( ) {
	script.play( tick );
	tick = tick + 1;
	if (tick >= endTime) {
		clearInterval( clock );
	}
}

clock = setInterval( step, 100 );
