class Gioco_15 {
constructor(larghezza,altezza){
this.cornice = document.createElement("div")
let stile_cornice = { border : "1px solid black", }
this.cornice.style = stile_cornice
}

visualizza () {
document.appendChild(this.cornice)
}
}
 