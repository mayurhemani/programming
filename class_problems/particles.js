class Particle {
	constructor(x, y, color) {
		this.div = document.createElement("img");
		document.body.appendChild( this.div );
		this.div.src = "boulder.png";
		this.div.style.left = x + "px";
		this.div.style.top = y + "px";
		//this.div.style.backgroundColor = color;
		this.div.classList.add("particle");
	}
};

class ParticleSystem {
	constructor(leftX, rightX) {
		this.left = leftX;
		this.right = rightX;
	}
	addParticle() {
		let xPosition = this.right;
		let yPosition = parseInt( Math.random() * 500 );
		(new Particle(xPosition, yPosition, "red"));
	}
	destroyParticle( particleObj ) {
		particleObj.remove();
	}
};


var particleSys = new ParticleSystem(100, 1000);
var clock = null;

function isColliding(x,y,w,h, bx,by,bw,bh) {
	return !(
		(bx > (x+w)) || 
		(by > (y+h)) ||
		((by+bh) < y) ||
		((bx+bw) < x)
	);
}


function handleParticle(particle) {
	// step 4. Check if this particle is hitting the helicopter
	var helicopterImage = document.getElementById("thebox");
	let hx = helicopterImage.offsetLeft;
	let hy = helicopterImage.offsetTop;
	let hw = helicopterImage.offsetWidth;
	let hh = helicopterImage.offsetHeight;

	let px = particle.offsetLeft;
	let py = particle.offsetTop;
	let pw = particle.offsetWidth;
	let ph = particle.offsetHeight;

	if (isColliding(hx, hy, hw, hh, px, py, pw, ph)) {
		alert("collision");
		clearInterval(clock);
	}

	// step 2. remove any particles that have reached their end
	let x = particle.offsetLeft;
	if (x <= particleSys.left) {
		particleSys.destroyParticle( particle );
	} else {
		// step 3. move all the particles to the left
		particle.style.left = (x - 10) + "px";
	}
}


function runParticleSys() {
	
	// step 1. add any new particles
	if (Math.random() < 0.05) {
		particleSys.addParticle();	
	}

	// step 2. remove any particles that have reached their end
	// step 3. move all the particles to the left
	document.querySelectorAll(".particle").forEach(handleParticle);
}



clock = setInterval( runParticleSys, 50 );




