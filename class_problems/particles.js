class Particle {
	constructor(x, y, color) {
		this.div = document.createElement("div");
		document.body.appendChild( this.div );
		this.div.style.left = x + "px";
		this.div.style.top = y + "px";
		this.div.style.backgroundColor = color;
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

function handleParticle(particle) {
	// step 2. remove any particles that have reached their end
	let x = particle.offsetLeft;
	if (x <= particleSys.left) {
		particleSys.destroyParticle( particle );
	} else {
		// step 3. move all the particles to the left
		particle.style.left = (x - 20) + "px";
	}
}


function runParticleSys() {
	
	// step 1. add any new particles
	if (Math.random() < 0.2) {
		particleSys.addParticle();	
	}

	// step 2. remove any particles that have reached their end
	// step 3. move all the particles to the left
	document.querySelectorAll(".particle").forEach(handleParticle);
}

clock = setInterval( runParticleSys, 50 );




