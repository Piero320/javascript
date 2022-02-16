/*Iterable objects are objects that can be iterated over with for..of.
array, string, map, set
keyes, values,entries
*/

//Technically, iterables must implement the Symbol.iterator method.


const map1 = new Map();

map1.set('a', 1);
map1.set('b', 2);
map1.set('c', 3);

let b = [0,1]
 
  
for (let i of map1.keys()) {
     console.log(i)
}

var o = {x:0,y:1,
[Symbol.iterator]: function(){
 let n = 0;
done = false;
return {
  next() {
    n += 10;
    if (n == 100) {done = true}
    return {value:n, done:done};
  }
};
}
}
var o1 = {x:0,y:1,
     [Symbol.iterator]: function *(){
      yield this.x
      yield 2
     }
}
console.log(...o1)