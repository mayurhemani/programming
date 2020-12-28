function simpleInterest(p, r, t) {
	return p * r * t / 100.;
}

function totalAmount(p, r, t) {
	return p + simpleInterest(p, r, t);
}

console.log( totalAmount(100, 5, 2) );
