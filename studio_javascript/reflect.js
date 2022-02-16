var a = {x:3, y:function() {}}
var b = Object.create(a)
console.log(Reflect.getOwnPropertyDescriptor(a,"x"))
console.log(Reflect.getPrototypeOf(b))
console.log(Reflect.has(b,"x"))
let array= Reflect.ownKeys(a)
array.forEach(v=> console.log(typeof(a[v])))

class a1 {
    constructor(){
    this.x = 3
    }
    }

 
var b1= new a1()
console.log(Reflect.getOwnPropertyDescriptor(b1,"x"))
console.log(Reflect.has(b1,"x"))

function a2(c) {
    this.x = c
}

let b2 = new a2()
console.log(Reflect.getOwnPropertyDescriptor(b2,"x"))
console.log(Reflect.has(b2,"x"))

var b3 = Reflect.construct(a2, [3]);
console.log(b3.x)
 