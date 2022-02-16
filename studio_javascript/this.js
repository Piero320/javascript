
/*
Is the function called with new (new binding)? If so, this is the newly constructed object.
var bar = new foo()
Is the function called with call or apply (explicit binding), even hidden inside a bind hard binding? If so, this is the explicitly specified object.
var bar = foo.call( obj2 )
Is the function called with a context (implicit binding), otherwise known as an owning or containing object? If so, this is that context object.
var bar = obj1.foo()
Otherwise, default the this (default binding). If in strict mode, pick undefined, otherwise pick the global object.
var bar = foo()
That's it. That's all it takes to understand the rules of this binding for normal function calls. Well... almost.
*/

 

 

 