let assert = require('chai').assert;

console.log('coding problem 92 [Hard]');

let courses = {'CSC300': ['CSC100', 'CSC200'], 'CSC200': ['CSC100'], 'CSC100': []};

function Course(prereqs){

}

function courseOrder(coursesPrereq) {


	return [];
}

assert.equal(courseOrder(courses), ['CSC100', 'CSC200', 'CSCS300']);
