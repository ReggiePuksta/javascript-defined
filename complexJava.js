// A complex number class

/*Complex.js
*This file defines a Complex class to represent complex numbers.
* Recall that complex number is the sum of a real number an
* imaginary number and that the imaginary number i is the square root
* of -1
*/

/*
* This constructor function defines the instance fields r and i on 
* every instance it creates. These fields hold the real and imaginary 
* parts of the complex number: they are the state of the object.
* 
 */
function Complex(real, imaginary) {
	if (isNaN(real)||isNaN(imaginary))
		throw new TypeEroor();
	this.r = real;
	this.i = imaginary;
}

/**
 * The instance methods of a class are defined as function-valued
 * properties of the prototype object. The methods defined 
 * here are inherited by all instances and provide the shared 
 * behavior of the class. 
 */

// Add a complex number to this one and return the sum in a new object.
Complex.prototype.add = function(that) {
	return new Complex(this.r + that.r, this.i + that.i);
};

// Multiplay this complex number by another and return the product
Complex.prototype.mul = function(that) {
	return new Complex(this.r*that.r - this.i*this.i,
		this.r*that.i+this.i*that.r);
};

// Return the real magnitude of a complex number. This is defined
// as its distance from the origin (0,0) of the complex plane.
Complex.prototype.mag = function() {
	return Math.sqrt(this.r*this.r+this.i*this.i);
};

// Return a complex numer that is the negative of this one.
Complex.prototype.neg = function() {return new Complex(
	-this.r, -this.i);};

// Convert a Complex object to a string in a useful way.
Complex.prototype.toString = function() {
	return "{"+this.r+","+this.i+"}";
};
// Test whether this Complex object has the same value as another
Complex.prototype.equals = function(that) {
	return that != null && that.constructor === Complex &&
	this.r === that.r && this.i === that.i;
};

/**
 * Class fields (such as constants) and class methods are defined as 
 * properties of the constructor. Note that class method do not
 * generally use th this keyword: they operate only on their arguments 
 */

// Class fields that holds some predifined numnbers
// Their names are uppercase to indicate that they 
// are constants. In ES5 we can make these props read-only
Complex.ZERO = new Complex(0,0);
Complex.ONE = new Complex(1,0);
Complex.I = new Complex(0,1);

// This class method parses a string in the format retuned by the 
// toString instance method and returns a Complex object or throws
// a typeError
Complex.parse = function(s) {
	try {
		var m = Complex._format.exec(s); 
		return new Complex(parseFloat(m[1]), parseFloat(m[2]));
	} catch(x) {
		throw new TypeError("Cant parse '"+s+"' as a complex number.");
	}
};


// A "private" class field used in Complex.parse() above.
Complex._format = /^\{([^,]+),([^}]+)\}$/;
//




