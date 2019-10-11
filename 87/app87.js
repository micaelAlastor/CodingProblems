let assert = require('chai').assert;

console.log('my bare node app');

const wrong1 = ['A N B', 'B NE C', 'C N A'];
const wrong2 = ['A N B', 'B NE C', 'A S C'];
const wrong3 = ['A S B', 'B S C', 'C S D', 'D S E', 'E S C', 'E S F'];
const right1 = ['A NW B', 'A N B'];
const right2 = ['A NW B', 'C N A', "C NW B"];

function opposite(direction) {
	if(direction === "N") return "S";
	if(direction === "S") return "N";
	if(direction === "E") return "W";
	if(direction === "W") return "E";
	return "NOWHERE";
}


function Point(label) {
	this.label = label;
	this.failedDir = "";

	this.neighbors = {N:[], S:[], E:[], W:[]};
	this.path = {N:[], S:[], E:[], W:[]};

	this.addNeighbor = function(neighbor, direction) {
		let known = this.neighbors[direction].find((knownNeighbor) => knownNeighbor.label === neighbor.label);
		if(!known) {
			this.neighbors[direction].push(neighbor);
			neighbor.neighbors[opposite(direction)].push(this);
		}
	};

	this.goTo = function(direction){
		this.path[direction].push(this.label);
		this.goToFrom(direction, this, [this.label]);
	};

	this.goToFrom = function(direction, startPoint, branchPath){
		//save root for current branch
		let branchPathRoot = branchPath.slice();
		this.neighbors[direction].forEach((neighbor)=>{
			//restore current branch to root
			branchPath = branchPathRoot.slice();
			//path can contain start of the loop to clearly indicate invalid ruleset
			startPoint.path[direction].push(neighbor.label);
			//checking if current branch has no loops
			if(!(branchPath.includes(neighbor.label))) {
				branchPath.push(neighbor.label);
				console.log(branchPath.join());
				neighbor.goToFrom(direction, startPoint, branchPath);
			}
			else {
				//so if we see loop we know that something is wrong
				startPoint.failedDir = direction;
			}
		});
	};
}

function Rule(ruleString, points) {
	let ruleArr = ruleString.split(" ");
	if(ruleArr.length !== 3) {
		this.valid = false;
		this.error = 'Rule string is not OK';
		return this;
	}

	let p1_label = ruleArr[0];
	this.p1 = points.find(point=>point.label === p1_label);
	if(!this.p1) points.push(this.p1 = new Point(p1_label));


	let p2_label = ruleArr[2];
	this.p2 = points.find(point=>point.label === p2_label);
	if(!this.p2) points.push(this.p2 = new Point(p2_label));

	this.rel = ruleArr[1];

	if(this.p1 === this.p2) {
		this.valid = false;
		this.error = 'Relation with the same point detected';
		return this;
	}

	for(let eachChar of this.rel) {
		this.p2.addNeighbor(this.p1, eachChar);
	}

	this.valid = true;
}

function parse(rules) {
	let points = [];
	for(let eachRule of rules){
		new Rule(eachRule, points);
	}
	return points;
}


function validate(textRuleArr) {
	let points = parse(textRuleArr);
	let result = true;

	for(let i = 0; i< points.length; i++) {
		let point = points[i];
		point.goTo("N");
		point.goTo("S");
		point.goTo("E");
		point.goTo("W");

		if(point.failedDir) {
			result = false;
			break;
		}
	}

	return result;
}


//testing
let a, b, c;
//
console.log('rules are: ' + wrong1.join());
let w1Points = parse(wrong1);
assert.equal(w1Points.length, 3);
a = w1Points.find((point) => point.label === "A");
a.goTo('N');
assert.equal(a.path.N.length, 4);
assert.equal(a.path.N.join(), "A,C,B,A");
assert.equal(a.failedDir, "N");
//
console.log('rules are: ' + wrong2.join());
let w2Points = parse(wrong2);
assert.equal(w2Points.length, 3);
c = w2Points.find((point) => point.label === "C");
c.goTo('N');
c.goTo('S');
c.goTo('W');
c.goTo('E');
assert.equal(c.path.N.length, 4);
assert.equal(c.path.N.join(), "C,B,A,C");
assert.equal(c.path.S.length, 4);
assert.equal(c.path.S.join(), "C,A,B,C");
assert.equal(c.failedDir, "S");
//
console.log('rules are: ' + wrong3.join());
let w3Points = parse(wrong3);
assert.equal(w3Points.length, 6);
f = w3Points.find((point) => point.label === "F");
f.goTo('S');
assert.equal(f.path.S.length, 7);
assert.equal(f.failedDir, "S");
//
console.log('rules are: ' + right2.join());
let r2Points = parse(right2);
assert.equal(r2Points.length, 3);
a = r2Points.find((point) => point.label === "A");
b = r2Points.find((point) => point.label === "B");
c = r2Points.find((point) => point.label === "C");
a.goTo('N');
assert.equal(a.path.N.length, 2);
assert.equal(a.path.N.join(), "A,C");
assert.equal(a.failedDir, "");

b.goTo('N');
assert.equal(b.path.N.length, 4);
assert.equal(b.path.N.join(), "B,A,C,C");
assert.equal(b.failedDir, "");

c.goTo('N');
assert.equal(c.path.N.length, 1);
assert.equal(c.path.N.join(), "C");
assert.equal(c.failedDir, "");
//
console.log('rules are: ' + right1.join());
assert.equal(parse(right1).length, 2);


assert.isNotOk(validate(wrong1));
assert.isNotOk(validate(wrong2));
assert.isOk(validate(right1));
assert.isOk(validate(right2));