 function tempo(f) {
    let r = function() {
       var result = f.apply(this, arguments);
       let inizio =  new Date().getTime()
       console.log("Inizio esecuzione: " + inizio);
       console.log (result)
       let fine = new Date().getTime()
       console.log("Fine esecuzione: " + fine);
       let durata = fine-inizio
       console.log("durata: " + durata + " ms")
       return result;
    };
    return r
 }

 
function somma(a,b) {

return a+b

 }
 
module.exports.tempo = tempo