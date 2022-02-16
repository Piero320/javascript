//Default Binding
//"use strict";
var a = 2;
function foo() {
	console.log( this.a );
}

foo(); // 2
//Implicit Binding
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2,
	foo: foo
};

obj.foo(); // 2
//Explicit Binding
function foo() {
  //  let s = new String(this)
	console.log( this.a);
}

var obj = {
	a: 2
};

foo.call("obj"); // 2
//Hard Binding
function foo() {
	console.log( this.a );
}

var obj = {
	a: 2
};

var bar = function() {
	foo.call( obj );
};

bar(); // 2
setTimeout(bar, 100 ); // 2

// `bar` hard binds `foo`'s `this` to `obj`
// so that it cannot be overriden
//new Binding
function foo(a) {
	this.a = a;
}

var bar = new foo( 2 );
console.log( bar.a ); // 2
let o = Object.create(null)
console.log(o)

