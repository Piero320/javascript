import {Vettore } from "./vettori.mjs"
 
var Ordinamento = {
bubble_sort :  bubble_sort
}

function bubble_sort (array) {
let array_da_ordinare = [...array]
let confronti = 0
let scambi_totali = 0
let cicli = 0
let limite = array_da_ordinare.length -1
let inizio = new Date().getTime()
let sorted_array = scorri(array_da_ordinare)
function scorri(arr) {
let lim = 0
cicli++
let scambi = 0
for (let index = 0; index < limite; index++) {
confronti++
if (arr[index]>arr[index+1]) {arr = swap(arr,index,index+1);scambi++;scambi_totali++; lim=index-1 } 
}
 
if (scambi >0) {
  limite = lim
 scorri (arr)
  }   
  return arr
}

function swap(array,i,j) {
  let temp = array[i];
  array[i] = array[j];
  array[j]=temp
  return array
}
let fine = new Date().getTime()
let durata = fine-inizio
return [sorted_array,"cicli: "+ cicli ,"confronti: " + confronti, "scambi: "+ scambi_totali,"durata: "+ durata]
}

function insertion_sort (array) {
  let scambi_totali = 0
  let cicli = 0
  let confronti = 0
  let array_da_ordinare = [...array]
   let inizio = new Date().getTime()
  let sorted_array = scorri(array_da_ordinare)
  
  function scorri(array) {
  cicli++
  let scambi = 0
  for (let index = 1; index < array.length; index++) {
  
  for (let i = index; i >0 ; i--) {
  confronti++
  if (array[i]<array[i-1]) {array = swap(array,i,i-1);scambi++;scambi_totali++} else {break}
    } 

}
    return array
  }
  
  function swap(array,i,j) {
    let temp = array[i];
    array[i] = array[j];
    array[j]=temp
    return array
  }
  
  let fine = new Date().getTime()
  let durata = fine-inizio
  return [sorted_array,"cicli: "+ cicli ,"confronti: " + confronti, "scambi: "+ scambi_totali,"durata: "+ durata]
  }
  
  
function prova(array) {
  array[0] = 5
  return array
}







let array = Vettore.costruisci(10,20)
//console.log(array)
//console.log(bubble_sort(array))
console.log("10:20" + 10)

 
 