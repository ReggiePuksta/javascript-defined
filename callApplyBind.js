// -------- 8.73
// Passing an array to the Math.max function
console.log("-------Call and Apply--------");

var many = [6, 50, 45, 32, 90, 34];

var biggest = Math.max.apply(Math, many);

console.log(biggest);

// Replace the method named m of the object o with a version
// that logs messages before and after invoking the original 
// method
function trace(o, m) {
	var original = o[m]; // Remember original method in the closure
	o[m] = function() {
		console.log(new Date(), "Entering:", m); // Log message
		var result = original.apply(this, arguments);
		console.log(new Date(), "Exiting:", m); // Log message
		return result;
	};
}

// Create an Object 
traceObject = {
	x: 2,
	y: 2
};
traceObject.modifier = function() {
	return this.x + this.y;
};
console.log(new Date(), "Entering");
var p = trace(traceObject, "modifier");
console.log(p);
console.log(traceObject.modifier());

// --------- 8.74
// The bind() Method
console.log("-------Binding--------");

function f(y) {
	return this.x + y;
}
var o = {
	x: 1
};
var g = f.bind(o);
console.log(g(2));


var shoppingCart = (function() {
	var _calculatePrice = function() {
		return this.price * this.amount;
	};
	return {
		calculatePrice: _calculatePrice
	};
})();

var goods = {
	name: 'hammer',
	amount: 2,
	price: 5
};

var s = shoppingCart.calculatePrice.call(goods);

console.log(s);

// ----- Bind build from smash magazine to apply
function BindTest(scope) {
	var fn = this;
	return function() {
		console.log(fn);
		return fn.apply(scope);

	};

}
// Simple use case 
var foo = {
	x: 3
};
var bar = function() {
	console.log(this.x);
};
bar();
var applyFunc = bar.apply(foo);

var boundFunc = bar.bind(foo);
boundFunc();
// Bind returns a new function while apply just gets a value



// Bind use in ES3 IE8
if (!Function.prototype.bind) {
	Function.prototype.bind = function(oThis) {
		if (typeof this !== "function") {
			// closest thing possible to the ECMAScript 5 internal IsCallable function
			throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
		}

		var aArgs = Array.prototype.slice.call(arguments, 1),
			fToBind = this,
			fNOP = function() {},
			fBound = function() {
				return fToBind.apply(this instanceof fNOP && oThis ? this : oThis,
					aArgs.concat(Array.prototype.slice.call(arguments)));
			};

		fNOP.prototype = this.prototype;
		fBound.prototype = new fNOP();

		return fBound;
	};
}