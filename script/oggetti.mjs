
    var Figura=  {
    init(larghezza = 100,altezza = 100){
    this.sfondo = null
    this.larghezza = larghezza  
    this.altezza = altezza 
    this.w = document.createElement("div")
    this.w.style.width = larghezza + "px"  
    this.w.style.height= altezza + "px"  
    this.w.style.border = "1px solid black"
    this.w.style.display = "inline-block"
    this.w.style.position = "absolute"
    this.x = 0
    this.y = 0
    this.rotazione = 0
    this.id_animazione = 0
    },
    inserisci: function(sfondo = document.body,x = 5,y=5){
     if (this.w) {
    this.sfondo = sfondo
    this.w.style.left = x + "px"
    this.w.style.top = y + "px"
    this.x = x
    this.y = y
    this.sfondo.appendChild(this.w)
     }
     },

clona() {
let c = this.w.cloneNode(false)
this.sfondo.appendChild(c)
},


   set posizione (punto) {
   let x = punto[0]
   let y = punto[1]
   this.x = x
   this.y = y
   this.w.style.left= `${x}px`
   this.w.style.top= `${y}px`
     },
 set colore_bordo(stringa) {
       this.w.style.borderColor = stringa
       },
 set colore_sfondo(stringa) {
         this.w.style.backgroundColor = stringa
         },
  
 set spessore(num) {
           this.w.style.height = num + "px"
     }, 
 set spessore_bordo (num ) {
   this.w.style.borderWidth = num + "px"
 },
  
 set punto_fisso(stringa) {
   this.w.style.transformOrigin = stringa
 
 },
 set z_index (stringa) {
this.w.style.zIndex = stringa;
 
 },
 cancella() {
  this.w.remove()
},
 
 ruota(gradi) {
   gradi = this.rotazione + gradi
   this.w.style.transform = `rotate(${gradi}deg)`
   this.rotazione = gradi
 },

 

vai_a (x,y) {
   
this.w.style.left = x +"px"
this.w.style.top = y + "px"
this.x = x
this.y = y
},
 
animazione(cb,cicli,intervallo) {
this.id_animazione = 1
let count = 0
let binded_loop = loop.bind(this)
let binded_cb = cb.bind(this)
requestAnimationFrame(binded_loop)
  function loop() {
  if (count===cicli || this.id_animazione === 0) { return}  
  binded_cb()
  setTimeout(function() {requestAnimationFrame(binded_loop);},intervallo)
  count++
} 
  
},
ferma_animazione() {
this.id_animazione = 0
},
 

trasla(x, y) {
  let l_contenitore = parseInt(this.sfondo.style.width)
  let a_contenitore = parseInt(this.sfondo.style.height)
  x =  this.x + x
  y = this.y + y
  if ((x >= l_contenitore - this.larghezza || x <= 0)) {
     return
  }
  if ((y >= a_contenitore - this.altezza || y <= 0)) {
    return
  }
  this.vai_a(x, y)
  this.x = x
  this.y = y
},

}




 var Cerchio = Object.create(Figura)
Cerchio.init = function (raggio) {
  this.sfondo = null
    this.raggio = raggio
    this.larghezza = raggio
    this.altezza = raggio
    this.w = document.createElement("div")
    this.w.style.width =  raggio + "px"  
    this.w.style.height= raggio+ "px"  
    this.w.style.border = "1px solid black"
    this.w.style.display = "inline-block"
    this.w.style.position = "absolute"
    this.x = 0
    this.y = 0
    this.w.style.borderRadius =  this.raggio + "px"
}

 var Linea = Object.create(Figura)
Linea.init = function (lunghezza) {
  this.sfondo = null
    this.raggio = raggio
    this.larghezza = raggio
    this.altezza = raggio
    this.w = document.createElement("div")
    this.w.style.width =  lunghezza + "px"  
    this.w.style.height= 1 + "px"  
    this.w.style.border = "1px solid black"
    this.w.style.display = "inline-block"
    this.w.style.position = "absolute"
    this.x = 0
    this.y = 0
    this.w.style.borderRadius =  this.raggio + "px"
}







 var Oggetto = {
init(figura) {
  this.figura= figura
  this.sfondo = this.figura.sfondo
  this.x =  5
  this.y =  5
  this.tempo = 0
},
set incr_tempo(dt){
 this.tempo+=dt
  if (Math.abs(Math.ceil(this.tempo)-this.tempo) <= dt ) {
  this.figura.clona()}
  
},

muovi(vx = "", vy = "", ax = "", ay = "", durata = "", dt = 1/10) {
  let cicli
   this.figura.colore_sfondo = "red"
   this.figura.clona()
   this.figura.colore_sfondo = "white"
  if (vx !== "") {
    this.vx = vx
    this.vy = vy
    this.ax = ax
    this.ay = ay
  }
  if (durata === "") {
    cicli = "sempre"
  } else {
    cicli = Math.floor(durata / dt)
  }
  this.animazione(cb, cicli, 1000 * dt)
  function cb() {
    this.incr_tempo =  dt
    let dsx = this.vx *dt
    let dsy = -this.vy *dt
    this.trasla(dsx, dsy)
    this.vx += this.ax *dt
    this.vy += this.ay *dt
  }
},
animazione(cb,cicli,intervallo) {
  this.id_animazione = 1
  let count = 0
  let binded_loop = loop.bind(this)
  let binded_cb = cb.bind(this)
  requestAnimationFrame(binded_loop)
    function loop() {
    if (count===cicli || this.id_animazione === 0) { return}  
    binded_cb()
    setTimeout(function() {requestAnimationFrame(binded_loop);},intervallo)
    count++
  } 
    
  },
  trasla(x, y) {
   
    let l_contenitore = parseInt(this.sfondo.style.width)
    let a_contenitore = parseInt(this.sfondo.style.height)
    x =  this.x + x
    y = this.y + y
    if ((x >= l_contenitore - this.figura.larghezza || x <= 0)) {
      this.vx = -this.vx
      return
    }
    if ((y >= a_contenitore - this.figura.altezza || y <= 0)) {
      this.vy = -this.vy
      return
    }
    this.figura.vai_a(x, y)
    this.x = x
    this.y = y
  },



  vai_a (x,y) {
   this.figura.vai_a(x,y)
    },
   
}