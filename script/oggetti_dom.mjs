var Elemento = {
    init: function(width,height){
    this.width = width || 50;
    this.height = height || 50;
    this.elem = null;
    },
    insert: function(parent){
    if (this.elem) {
    this.elem.style.width = this.width + "px"
    this.elem.style.height = this.height + "px"
    parent.appendChild(this.elem)
    }
    },
    trasla(x, y) {
      let l_contenitore = parseInt(this.w.parentElement.style.width)
      let a_contenitore = parseInt(this.w.parentElement.style.height)
      let pos_x = this.w.style.left
      let pos_y = this.w.style.top
      let l_figura = parseInt(this.w.style.width)
      let a_figura = parseInt(this.w.style.height)
      x = parseInt(pos_x) + x
      y = parseInt(pos_y) + y
  
      if ((x >= l_contenitore - l_figura || x <= 0)) {
        this.vx = -this.vx
      }
      if ((y >= a_contenitore - l_figura || y <= 0)) {
        this.vy = -this.vy
      }
      this.vai_a(x, y)
    },
    ruota(gradi) {
      gradi = this.rotazione + gradi
      this.w.style.transform = `rotate(${gradi}deg)`
      this.rotazione = gradi
    },
  
    vai_a(x, y) {
      this.w.style.position = "relative"
      this.w.style.top = `${y}px`
      this.w.style.left = `${x}px`
    }


   };
   
   var Button = Object.create(Elemento );
   Button.setup = function(width,height,label){
    // delegated call
    this.init( width, height );
    this.label = label || "Default";
    this.elem =  document.createElement("button")
   };
   Button.visualizza = function(parent) {
    // delegated call
  this.insert(parent);
  this.elem.addEventListener("click",this.onClick.bind(this));
   };
   Button.onClick = function(evt) {
    console.log( "Button '" + this.label + "' clicked!" );
   };
   var Linea =  {
    init(lunghezza){
    this.lunghezza = lunghezza || "Default"
    this.w = document.createElement("hr")
    this.w.style.width = lunghezza + "px" || "Default"
    this.rotazione = 0
    },
    visualizza: function(parent){
     if (this.w) {
     parent = parent || document.body
     parent.appendChild(this.w)
     }
     },
 set posizione (punto) {
   let x = punto[0]
   let y = punto[1]
    
   this.w.style.position = "relative"
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
 set stile(stringa) {
   this.w.style.borderStyle = stringa
 },
 set punto_fisso(stringa) {
   this.w.style.transformOrigin = stringa
 
 },
 
 
 ruota(gradi) {
   gradi = this.rotazione + gradi
   this.w.style.transform = `rotate(${gradi}deg)`
   this.rotazione = gradi
 }
      
   }
  