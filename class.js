///////////////////////////////
// Simple JavaScript classes //
///////////////////////////////


// From Sections 9.1 and 9.2 - difference between prototypical and classical 
// inheritance. Class is considered as group of objects that inherits from
// the same constructor.


// This is a Class and prototypes representing range values 

// Factory function that returns a new range object 
function range(from, to) {
	// prototype object is stored as a property of this function
	// Defines shared methods (behavior) for all range objects 
	var r = inherit(range.methods);

	// Store the start and end point of this new range object
	// These are noninherited objects that are unique to this obj
	r.from = from;
	r.to = to;

	// Return the new objec
	return r;
}

// This prototype object defines methods inherited by all range objects
range.methods = {
	// REturn true if x is in the range, false otherwise
 // This method works for textual and Date ranges as well as numeric.
includes: function(x) { return this.from <= x && x <= this.to; },
// Invoke f once for each integer in the range.
// This method works only for numeric ranges.
foreach: function(fs) {
for(var x = Math.ceil(this.from); x <= this.to; x++) fs(x);
},
// Return a string representation of the range
toString: function() { return "(" + this.from + "..." + this.to + ")"; }
	
};

// Example uses of a range object
var r = range(1,3);
r.includes(2);
r.foreach(console.log);
console.log(r);

// Classes and Constructor 9.2
// this is a constructor function that initializes new range objects

function Range(from,to) {
	// THese are noninherited properties that are uniwue  to this object
	this.from = from;
	this.to = to;
}

// ALl range Objects inherit from this object
// Note that property name must be prototype for this to work

// Pass multiple methods
Range.prototype = {
	includes: function(x) { return this.from <= x && x <= this.to; },
// Invoke f once for each integer in the range.
// This method works only for numeric ranges.
foreach: function(fs) {
for(var x = Math.ceil(this.from); x <= this.to; x++) fs(x);
},
// Return a string representation of the range
toString: function() { return "(" + this.from + "..." + this.to + ")"; }
};

// Example uses of a range object with new
 var R = new Range(1,3);
 R.includes(2);
 R.foreach(console.log);
 console.log(R);


// A simple function for defining simple classes
function defineClass(constructor, //A fnction that sets instance properties
	methods, // Instance methods: copied to prototype
	statics) // Class properties: copied to constructor
{
	if (methods) extend(constructor.prototype, methods);
	if (statics) extend(constructor, statics);
	return constructor;
}

// This is a simple variant of a Range Class
var  SimpleRange = 
defineClass(function(f,t) {
	this.f = f; 
	this.t = t;
},
	{
		includes: function(x) {return this.f <=x && x <= this.t;},
		toString: function() {return this.f + "..." + this.t;}
	},
	{ upto: function(t) {return new SimpleRange(o,t);} });


