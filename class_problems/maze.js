function do_these_rectangles_overlap(r1, r2) {
	let x1 = r1.x, y1 = r1.y;
	let x2 = x1 + r1.width,  y2 = y1 + r1.height;

	let h1 = r2.x, k1 = r2.y;
	let h2 = h1 + r2.width,  k2 = k1 + r2.height;

	let toLeft = (x2 <= h1) || (h2 <= x1);
	let toRight = (x1 >= h2) || (h1 >= x2);
	let above = (y2 <= k1) || (k2 <= y1);
	let below = (y1 >= k2) || (k1 >= y2);

	return !(toLeft || toRight || above || below);
}


class Maze {
	constructor(nBlocks) {
		let root = document.querySelector(".maze");
		for (let c = 0; c < nBlocks; ++c) {
			let b = root.appendChild( document.createElement("div") );
			b.classList.add("block");
			let x = Math.floor( 25 + Math.random() * 725 );
			let y = Math.floor( 25 + Math.random() * 725 );
			b.style.left = x + "px";
			b.style.top = y + "px";
		}
		let dest = root.appendChild( document.createElement("div") );
		dest.classList.add("destination");
		dest.style.left = "775px";
		dest.style.top = "775px";

		let bot = root.appendChild( document.createElement("div") );
		bot.classList.add("bot");
		bot.style.left = "0px";
		bot.style.top = "0px";
	}

	willCollide(movingX, movingY) {
		let bot = document.querySelector(".bot");
		var f = false;
		var rect = bot.getBoundingClientRect();
		if (movingX == 1) { rect.x += 25; }
		if (movingX == -1) { rect.x -= 25; }
		if (movingY == 1) { rect.y += 25; }
		if (movingY == -1) { rect.y -= 25; }
		if (rect.x < 0 || rect.x >= 800 || rect.y < 0 || rect.y >= 800) {
			return true;
		}
		document.querySelectorAll(".block").forEach((elem) => {
			f = f || do_these_rectangles_overlap( rect, elem.getBoundingClientRect() );
		});
		return f;
	}

	hasCollided() {
		let bot = document.querySelector(".bot");
		var f = false;
		var rect = bot.getBoundingClientRect();
		if (rect.x < 0 || rect.x >= 800 || rect.y < 0 || rect.y >= 800) {
			return true;
		}
		document.querySelectorAll(".block").forEach((elem) => {
			f = f || do_these_rectangles_overlap( rect, elem.getBoundingClientRect() );
		});
		return f;
	}

	position() {
		let bot = document.querySelector(".bot");
		return {obj: bot, x: bot.offsetLeft, y: bot.offsetTop};
	}

	moveLeft() {
		let bot = this.position();
		if (bot.x >= 25) {
			bot.obj.style.left = (bot.x - 25) + "px";
		}
	}
	moveRight() {
		let bot = this.position();
		if (bot.x <= 775) {
			bot.obj.style.left = (bot.x + 25) + "px";
		}
	}
	moveTop() {
		let bot = this.position();
		if (bot.y >= 25) {
			bot.obj.style.top = (bot.y - 25) + "px";
		}
	}

	moveDown() {
		let bot = this.position();
		if (bot.y <= 775) {
			bot.obj.style.top = (bot.y + 25) + "px";
		}
	}

	reached() {
		let bot = document.querySelector(".bot");
		var f = false;
		var rect = bot.getBoundingClientRect();
		let elem = document.querySelector(".destination");
		return do_these_rectangles_overlap( rect, elem.getBoundingClientRect() );
	}
}


class BotComputer {
	
	constructor(plan) {
		this.maze = new Maze(15);
		this.plan = plan;
	}

	step() {
		this.plan( this.maze );
		if (this.maze.reached()) {
			return "yay";		
		}
		if (this.maze.hasCollided()) {
			return "game-over";
		}
		return "continue";
	}
}


