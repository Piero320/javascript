
//Every
let array = [0,1,2,3]
function sono_uguali(param) {
  return new Set(param).size === 1;
}
 
console.log(array.every(function (currentValue,index,array){return currentValue === array[0]}));

// some
const even = (element) => element % 2 === 0;
console.log(array.some(even));

// find
const array1 = [5, 12, 8, 130, 44];
console.log(array1.find(element => element > 10));