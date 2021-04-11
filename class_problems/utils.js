class Scene {	
	constructor(listOfShowIds, listOfHideIds) {
		this.shows = listOfShowIds;
		this.hides = listOfHideIds;
	}

	bringUp() {
		for (let i = 0; i < this.hides.length; i=i+1) {
			let obj = document.getElementById(this.hides[i]);
			obj.classList.add("hidden-stage-item");
		}
		for (let j = 0; j < this.shows.length; ++j) {
			let obj = document.getElementById(this.shows[j]);
			obj.classList.remove("hidden-stage-item");	
		}
	}
};


class RedMan {

	constructor() {
		var img = document.createElement("img");
		img.src = "movie1_assets/redman/redman_standing_right.png";
		
		var stage = document.getElementById("stage");
		stage.appendChild(img);

		img.style.position = "absolute";
		img.style.left = "20px";
		img.style.top = "600px";

		img.classList.add("hidden-stage-item");
		this.img = img;

		this.step = 0;

	}

	enter() {
		this.img.classList.remove("hidden-stage-item");
	}

	exit() {
		this.img.classList.add("hidden-stage-item");		
	}

	walk() {
		this.img.src = "movie1_assets/redman/redman_walking_right_" + this.step + ".png";
		this.step = (this.step + 1)%3;
		let x = this.img.offsetLeft;
		x = x + 10;
		this.img.style.left = x + "px";
	}

};

var scene1 = new Scene( ["clouds"], ["trees", "sun"]  );
var scene2 = new Scene( ["trees"], ["clouds", "sun"] );
var scene3 = new Scene( ["clouds", "trees"], ["sun"]);
var scene4 = new Scene( ["clouds", "sun", "trees"], [])


var redman = new RedMan();

var sceneList = [scene1, scene2, scene3, scene4];
var current = 0;

window.addEventListener("keydown", ( ev ) => {

	if (ev.key == "ArrowRight") {
		sceneList[current].bringUp();
		current = (current + 1) % 4;
		console.log("scene ", current);
		if (current % 2 == 0) {
			redman.enter();
		} else {
			redman.exit();
		}
	}

});


setInterval(() => {
	redman.walk();
}, 50);
