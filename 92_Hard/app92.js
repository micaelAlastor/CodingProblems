let assert = require('chai').assert;

console.log('coding problem 92 [Hard]');

let courses = {'CSC300': ['CSC100', 'CSC200'], 'CSC200': ['CSC100'], 'CSC100': []};
let wrong_courses_1 = {'CSC400': ['CSC500'], 'CSC300': ['CSC100', 'CSC200'], 'CSC200': ['CSC100'], 'CSC100': []};
let wrong_courses_2 = {'CSC400': ['CSC300'], 'CSC300': ['CSC100', 'CSC200'], 'CSC200': ['CSC100', 'CSC400'], 'CSC100': []};

function Course(prereqs){

}

function pushCourseWithFulfilledPrereq(coursesWithPrereq, order){
	let fulfilled = 0;
	for(let courseId in coursesWithPrereq) {
		if(!order) break;
		let courseNotAdded = !order.includes(courseId);
		let coursePrereqsFulfilled = coursesWithPrereq[courseId].every((prereqId) => order.includes(prereqId));
		if(courseNotAdded && coursePrereqsFulfilled){
			order.push(courseId);
			fulfilled ++;
			if(Object.keys(coursesWithPrereq).length > order.length){
				order = pushCourseWithFulfilledPrereq(coursesWithPrereq, order);
			}
		}
	}
	if(fulfilled === 0) {
		order = null;
	}
	return order;
}

function courseOrder(coursesWithPrereq) {
	let order = [];
	return pushCourseWithFulfilledPrereq(coursesWithPrereq, order);
}

assert.equal(courseOrder(courses).join(), ['CSC100', 'CSC200', 'CSC300'].join());
assert.equal(courseOrder(wrong_courses_1), null);
assert.equal(courseOrder(wrong_courses_2), null);
