function factorial(n) {
	if (n == 0) {
		return 1;
	} else {
		return n * factorial(n-1);
	}
}



console.log( (1 * 2 * 3 * 4 * 5 * 6) );
console.log( factorial(6) );