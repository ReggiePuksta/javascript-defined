function inherit(p) {
	if (p === null) throw TypeError();
	if (Object.create) return Object.create(p);
	var t = typeof p;
	if (t !== "object" && t !== "function") throw TypeError();

	function F() {}
	F.prototype = p;
	return new F();

}
// Useful for not overwriting .prototype object
function extend(o, p) {
	for (var prop in p) {
		o[prop] = p[prop];
		console.log(p[prop]);
	}
	return o;
}
// Used on Object.prototype so it can be used on any object
Object.defineProperty(Object.prototype, "extend", {
	writable: true,
	enumerable: false,
	configurable: true,
	value: function(o) {
		var names = Object.getOwnPropertyNames(o);

		for (var i = 0; i < names.length; i++) {
			// skips properties allready in this object
			if (names[i] in this) continue;
			// Get property description from o 
			var desc = Object.getOwnPropertyDescriptor(o, names[i]);
			// use it to create property on it
			Object.defineProperty(this, names[i], desc);
		}
	}

});

function merge(o, p) {
	for (var prop in p) {
		if (o.hasOwnProperty[prop]) continue;
		o[prop] = p[prop];
	}
	return o;
}


function restrict(o, p) {
	for (var prop in p) {
		if (!(prop in p)) delete o[prop];
	}
	return o;
}

function subtract(o, p) {
	for (var prop in p) {
		delete o[prop];
	}
	return o;
}

function union(o, p) {
	return extend(extend({}, o), p);
}

function intersection(o, p) {
	return restrict(extend({}, o), p);
}

function keys(o) {
	if (typeof o !== "object") throw TypeError();
	var result = [];
	for (var prop in o) {
		if (o.hasOwnProperty(prop))
			result.push(prop);
	}
	return result;
}

function classof(o) {
	if (o === null) return "Null";
	if (o === undefined) return "Undefined";
	return Object.prototype.toString.call(o).slice(8, -1);
}

// Determine if an object is an array like Object
function isArrayLike(o) {
	if (o &&
		typeof o === "object" &&
		isFinite(o.length) &&
		o.length >= 0 &&
		o.length === Math.floor(o.length) &&
		o.length < 4294967296)
		return true;
	else
		return flase;
}

// return the sum of the elements of array or object-like arrays
// a. The Elements must all be numbers|| null and undefined ignored
function sum(a) {
	if (isArrayLike(a)) {
		var total = 0;
		for (var i = 0; i < a.length; i++) {
			var element = a[i];
			if (element == null) continue; //Skip all null and undefined
			if (isFinite(element)) total += elements;
			else throw new Error("sum(): elements must be finite numbers");
		}
		return total;
	} else throw new("sum(): arguments must be array-like");
}

// More flexible version of sum()
function flexisum(a) {
	var total = 0;
	for (var i = 0; i < arguments.length; i++) {
		var element = arguments[i],
			n;
		if (element == null) continue;
		if (isArray(element))
			n = flexisum.apply(this, element);
		else if (typeof element === "function")
			n = Number(element());
		else n = Number.element;

		if (isNaN(n))
			throw Error("flexisum(): can't convert to number");
		total += n;
	}
	return total;
}

// Check if and object is atrue function Object
function isFunction(x) {
	return Object.prototype.toString.call(x) === "[object Function]";
}
// Different version of extend
function extend(o) {
	for (var i = 0; i < arguments.length; i++) {
		var source = arguments[i];
		for (var prop in source) o[prop] = source[prop];
	}
	return o;
}