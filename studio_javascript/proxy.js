var handle = {
    get: function (target, prop, receiver) {
        if (prop === "x") {
          return "world";
        }
        return Reflect.get(...arguments);
      },

}
var a = {x:0,y:5}

let p = new Proxy(a,handle)
console.log(p.x)
console.log(p.y)
console.log(a.#z)