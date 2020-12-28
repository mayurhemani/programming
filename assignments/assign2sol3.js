
function extractLastDigit(number) {
	return number % 10;
}

function reverse( number ) {
	let lastDigit = extractLastDigit( number ); // will be 9
	number = (number - lastDigit) / 10; // (5129 - 9)/10 => 512
	let lastButOne = extractLastDigit( number ); // 2
	number = (number - lastButOne) / 10; // (512 - 2)/10 => 51
	let lastButTwo = extractLastDigit( number ); // 1
	number = (number - lastButTwo)/10; // (51 - 1) / 10 => 5
	return lastDigit * 1000 + lastButOne * 100 + lastButTwo * 10 + number;
}


console.log( reverse(1024) );
