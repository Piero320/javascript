export var Vettore = {
costruisci: function(n,max = 10){
let v =  []
let el
 for (let index = 0; index < n; index++) {
     el = Math.ceil(Math.random()*max)
     v.push(el)
 }
return v
},
somma: function(v,w) {
let result = []
for (let index = 0; index < v.length; index++) {
    result.push(v[index]+w[index])
}
return result

},
sottrai: function(v,w) {
    let result = []
    for (let index = 0; index < v.length; index++) {
        result.push(v[index]-w[index])
    }
    return result
    
    },
    moltiplica: function(v,num) {
       v.forEach((element,index,array) => {element = element*num;array[index]=element});
        return v
        },


scalare: function(v1,v2) {
let result = 0
 for (let index = 0; index < v1.length; index++) {
     result = result + v1[index]*v2[index]
 }
return result
},
vettoriale : function(v,w) {
let x = v[1]*w[2]- v[2]*w[1]
let y = v[2]*w[0]- v[0]*w[2]
let z = v[0]*w[1]- v[1]*w[0]
return [x,y,z]
},
norma : function(v) {
return Math.pow(this.scalare(v,v),0.5)

},
angolo : function (v,w,u = "gradi") {
p = this.scalare(v,w)
n1 = this.norma(v)
n2 = this.norma(w)
let radianti = Math.acos(p/n1/n2)
if (u!== "gradi") {
    return radianti
}

let gradi = radianti * 180 / Math.PI;
return gradi;
}



}
 
 
 