let assert = require('chai').assert;

console.log('coding problem 88 [Medium]');

function pointlessDivision(dividend, devisor) {
	let remainder = dividend;
	let quotient = 0;
	while(remainder - devisor >= 0) {
		remainder -= devisor;
		quotient++;
	}
	return quotient;
}

assert.equal(pointlessDivision(7, 5), 1);
assert.equal(pointlessDivision(11, 3), 3);
assert.equal(pointlessDivision(4, 4), 1);
assert.equal(pointlessDivision(117, 5), 23);

