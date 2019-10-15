let assert = require('chai').assert;

console.log('coding problem 92 [Hard]');

let courses = {'CSC300': ['CSC100', 'CSC200'], 'CSC200': ['CSC100'], 'CSC100': []};

function Course(prereqs){

}

function pushCourseWithFulfilledPrereq(coursesWithPrereq, order){
	let fulfilled = 0;
	for(let courseId in coursesWithPrereq) {
		let courseNotAdded = !order.includes(courseId);
		let coursePrereqsFulfilled = coursesWithPrereq[courseId].every((prereqId) => order.includes(prereqId));
		if(courseNotAdded && coursePrereqsFulfilled){
			order.push(courseId);
			fulfilled ++;
			if(Object.keys(coursesWithPrereq).length > order.length){
				pushCourseWithFulfilledPrereq(coursesWithPrereq, order);
			}
		}
	}
	if(fulfilled > 0) return order;
	 else return null;
}

function courseOrder(coursesWithPrereq) {
	let order = [];
	return pushCourseWithFulfilledPrereq(coursesWithPrereq, order);
}

assert.equal(courseOrder(courses).join(), ['CSC100', 'CSC200', 'CSC300'].join());
