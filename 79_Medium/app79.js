let assert = require('chai').assert;

console.log('coding problem 79 [Medium]');

function isCloseToNonDecreasing(numbers) {
	let timesDecreasing = 0;
	for (let i = 0; i < numbers.length - 1; i++) {
		if(numbers[i] > numbers[i+1]) {
			timesDecreasing++;
		}
		if(timesDecreasing > 1) break;
	}
	return timesDecreasing < 2;
}

assert.isOk(isCloseToNonDecreasing([1, 2, 3, 11, 15 ,17]));
assert.isOk(isCloseToNonDecreasing([1, 2, 3, 11, 15 ,17, 1]));
assert.isOk(isCloseToNonDecreasing([3, 3, 3, 3, 3 ,1, 3]));
assert.isOk(isCloseToNonDecreasing([2, 2]));
assert.isOk(isCloseToNonDecreasing([10, 5, 7]));
assert.isNotOk(isCloseToNonDecreasing([1, 2, 3, 11, 15 ,17, 11, 3]));
assert.isNotOk(isCloseToNonDecreasing([1, 2, 3, 11, 15 ,17, 11, 3]));
assert.isNotOk(isCloseToNonDecreasing([10, 5, 1]));

