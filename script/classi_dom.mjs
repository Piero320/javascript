class elemento {
  constructor(nome_elemento) {
    this.nome_elemento = nome_elemento
    this.w = document.createElement(nome_elemento)
    this.w.id = nome_elemento
    this.rotazione = 0
    this.traslazione_x = 0
    this.traslazione_y = 0
    document.body.appendChild(this.w)
    this.punto_cliccato = []
    this.w.onclick = function (e) {
      this.punto_cliccato = [e.offsetX, e.offsetY]

    }

  }
  punto_fisso(stringa) {
    this.aggiorna_style("transform-origin", stringa)

  }

  animazione(cb, cicli, intervallo, param = "") {
    var count = 0

    function vai() {

      cb(param)

      if (cicli === "sempre") {
        setTimeout(function () {
          requestAnimationFrame(vai)
        }, intervallo) // call requestAnimationFrame again to animate next frame
      } else {

        if (count < cicli) {
          setTimeout(function () {
            requestAnimationFrame(vai)
          }, intervallo) // call requestAnimationFrame again to animate next frame
          count++
        }
      }

    }

    requestAnimationFrame(vai) // call requestAnimationFrame and pass into it animation function


  }


  init() {
    return this.w
  }

  get_x() {
    let domRect = this.w.getBoundingClientRect();
    return domRect.x
  }
  get_y() {
    let domRect = this.w.getBoundingClientRect();
    return domRect.y
  }


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
  }
  ruota(gradi) {
    gradi = this.rotazione + gradi
    this.w.style.transform = `rotate(${gradi}deg)`
    this.rotazione = gradi
  }

  vai_a(x, y) {
    this.w.style.position = "relative"
    this.w.style.top = `${y}px`
    this.w.style.left = `${x}px`
  }
  cancella() {
    this.w.remove()
  }

  // vale per gli elementi in block
  centra_o() {

    // per gli elementi in-line
    if (this.nome_elemento === "img") {
      this.w.style.display = "block"
    }

    this.w.style.margin = "auto"

  }




  aggiungi_evento(nome_evento, cb) {
    this.w.addEventListener(nome_evento, cb)
  }

  aggiorna_attributo(nome_attributo, valore) {
    this.w.setAttribute(nome_attributo, valore)
  }

  proprieta_style(nome_proprieta) {
    let str_style = this.w.getAttribute("style")
    let reg = nome_proprieta + ".+?;"
    let regex = new RegExp(reg, "gm")
    let bcc = str_style.match(regex)[0]
    bcc = bcc.replace(nome_proprieta, "")
    bcc = bcc.replace(":", "")
    bcc = bcc.replace(";", "")
    return bcc
  }
  aggiorna_style(proprieta_selezionata, valore, element = "") {
    let elemento = this.w



    let stringa_style_precedente = ""
    if (elemento.getAttribute("style") !== null) {
      stringa_style_precedente = elemento.getAttribute("style")
    }
    if (stringa_style_precedente.search(proprieta_selezionata) > -1) {
      let reg = proprieta_selezionata + ".+?;"
      let regex = new RegExp(reg, "gm")
      stringa_style_precedente = stringa_style_precedente.replace(regex, "")
    }




    if (proprieta_selezionata === "transform") {
      let stringa_style = stringa_style_precedente + proprieta_selezionata + ";"
      elemento.setAttribute("style", stringa_style)
      return
    }
    let stringa_style = stringa_style_precedente + proprieta_selezionata + ":" + valore + ";"
    elemento.setAttribute("style", stringa_style)


  }


  rendi_trascinabile(cb = null) {
    let elemento = this.w
    elemento.setAttribute('draggable', true);
    elemento.ondragstart = function (e) {
      e.dataTransfer.setData("text", e.target.id);
      if (cb !== null) {
        cb()
      }
    }
  }

  rendi_capiente(cb = null) {
    let elemento = this.w
    elemento.style.position = "relative"
    elemento.ondragenter = function (e) {
      e.target.style.border = "3px dotted red";
    };
    elemento.ondragover = function (e) {
      e.preventDefault();
    }
    elemento.ondrop = function (e) {
      var data = e.dataTransfer.getData("text");
      let x = e.clientX
      let y = e.clientY
      document.getElementById(data).style.position = "absolute"
      document.getElementById(data).style.left = x + "px"
      document.getElementById(data).style.top = y + "px"
      e.target.appendChild(document.getElementById(data));

    }
    elemento.ondragleave = function (e) {

      e.target.style.border = "1px solid black";

    }
    if (cb !== null) {
      cb()
    }

  }

}
class pallina extends elemento {

  constructor(raggio) {
    super("div")
    this.raggio = raggio
    this.w.style.width = 2 * raggio + "px"
    this.w.style.height = 2 * raggio + "px"
    this.w.style.border = "1px solid black"
    this.w.style.borderRadius = raggio + "px"
    this.colore = ""
    this.vx = 0
    this.vy = 0
    this.ax = 0
    this.ay = 0
  }
  punto() {
    let c = new pallina(1)
    let x = this.w.style.left
    let y = this.w.style.top
    this.w.parentElement.appendChild(c.w)
    c.w.style.position = "absolute"
    c.w.style.marginLeft = parseInt(x) + this.raggio - 1 + "px"
    c.w.style.marginTop = parseInt(y) - this.raggio - 2 + "px"
  }
  muovi(vx = "", vy = "", ax = "", ay = "", durata = "", linea = "") {
    alert("ok")
    let cicli
    if (vx !== "") {
      this.vx = vx
      this.vy = vy
      this.ax = ax
      this.ay = ay
    }

    let dt = 1 / 10 // 1/10 di secondo
    if (durata === "") {
      cicli = "sempre"
    } else {
      cicli = Math.floor(durata / dt)
    }

    this.animazione(cb, cicli, 1000 * dt, this)
    function cb(param) {
      param.punto()
      let dsx = param.vx * dt
      let dsy = -param.vy * dt
      param.trasla(dsx, dsy)
      param.vx += param.ax * dt
      param.vy += param.ay * dt
    }

  }
}

class linea extends elemento {
  constructor() {
    super("hr")
  }
}


class immagine extends elemento {
  constructor(percorso) {
    super("img")
    let num_immagini = document.images.length
    this.w.id = "immagine_" + num_immagini
    this.w.onerror = function (e) {
      let s = "L'elemento: " + this.id + " non può essere caricato"
    }
    this.canvas = null
    this.w.src = percorso
  }
  dimensioni(x, y) {
    this.w.style.width = x
    this.w.style.height = y

  }
  esadecimale(r, g, b) {
    function componentToHex(c) {
      var hex = c.toString(16);
      return hex.length == 1 ? "0" + hex : hex;
    }
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }
  fai_canvas() {
    var canvas = document.createElement("canvas")
    canvas.width = this.w.width
    canvas.height = this.w.height
    canvas.getContext('2d').drawImage(this.w, 0, 0, canvas.width, canvas.height);
    this.canvas = canvas
    return canvas
  }
  filtra(cb) {

    this.fai_canvas()
    let c = new colore()
    let canvas = document.createElement("canvas")
    canvas.width = this.w.width
    canvas.height = this.w.height
    var imgData = this.canvas.getContext("2d").getImageData(0, 0, this.canvas.width, this.canvas.height);
    var i;
    for (i = 0; i < imgData.data.length; i += 4) {
      let r = imgData.data[i + 0]
      let g = imgData.data[i + 1]
      let b = imgData.data[i + 2]
      let t = imgData.data[i + 3]
      let nuovo_pix = cb([r, g, b, t], c)
      imgData.data[i + 0] = nuovo_pix[0]
      imgData.data[i + 1] = nuovo_pix[1]
      imgData.data[i + 2] = nuovo_pix[2]
      imgData.data[i + 3] = nuovo_pix[3]
    }
    canvas.getContext("2d").putImageData(imgData, 0, 0)
    return [imgData, canvas.toDataURL()]
  }
  ottieni_pixels(x0, y0, dx, dy) {
    let canvas = this.fai_canvas()
    var pixelData = canvas.getContext('2d').getImageData(x0, y0, dx, dy)
    return pixelData.data
  }
  ottieni_pixel(x, y, formato = "") {
    let canvas = this.fai_canvas()
    var pixelData = canvas.getContext('2d').getImageData(x, y, 1, 1).data;
    if (formato === "") {
      return pixelData
    }
    if (formato === "rgb") {
      return [pixelData[0], pixelData[1], pixelData[2]]
    }
    if (formato === "r") {
      return pixelData[0]
    }
    if (formato === "g") {
      return pixelData[1]
    }
    if (formato === "b") {
      return pixelData[2]
    }
    if (formato === "trasparenza") {
      return pixelData[4]
    }
    if (formato === "esadecimale") {
      return this.esadecimale(pixelData[0], pixelData[1], pixelData[2])
    }

  }


}

class areatesto extends elemento {

  constructor(linee = 5, caratteririga = 50) {
    let area = document.createElement("textarea")
    area.rows = linee
    area.cols = caratteririga
    document.body.appendChild(area)
    this.w = area

  }

  testo() {
    return this.w.value
  }

  scrivi(stringa) {
    this.w.value = this.w.value + stringa

  }

}




class tabella extends elemento {
  constructor(righe, colonne, larghezzacella = 100, altezzacella = 100) {
    super("table")
    let tbl = this.w
    tbl.style.width = colonne * larghezzacella
    tbl.style.height = righe * altezzacella
    tbl.style.borderCollapse = "collapse"

    tbl.id = "tabella"
    this.righe = righe
    this.colonne = colonne


    for (let index = 0; index < righe; index++) {
      let riga = tbl.insertRow()
      for (let index1 = 0; index1 < colonne; index1++) {
        //let cella = riga.insertCell()
        let cella = document.createElement("td")
        cella.style.margin = "0px"
        cella.style.width = String(larghezzacella) + "px"
        cella.style.height = String(altezzacella) + "px"
        cella.style.border = "0.1px solid black"
        riga.appendChild(cella)

      }
    }

    document.body.appendChild(tbl)

  }
  fai_matrice(cb) {

    var mat = new Array(this.righe);

    for (var i = 0; i < mat.length; i++) {
      mat[i] = new Array(this.colonne);
    }


    for (let riga = 0; riga < this.righe; riga++) {
      for (let colonna = 0; colonna < this.colonne; colonna++) {
        mat[riga][colonna] = this.applica_a_cella(cb, riga, colonna)
      }
    }

    return mat
  }
  cella(x, y) {
    return this.w.rows[x].cells[y]
  }
  scrivi(stringa, riga, colonna) {
    this.w.rows[riga].cells[colonna].innerHTML = stringa

  }
  applica_a_cella(cb, x, y, param = "") {

    let cella = this.w.rows[x].cells[y]
    return cb(cella, x, y, param)

  }
  per_ogni_cella(cb, param = "") {
    Array.prototype.forEach.call(this.w.rows, (riga, num_riga) => {
      Array.prototype.forEach.call(riga.cells, (cella, num_colonna) =>
        cb(cella, num_riga, num_colonna, param))

    });



  }



  inseriscielemento(riga, colonna, elemento) {
    elemento.style.display = "block"
    this.w.rows[riga].cells[colonna].appendChild(elemento)

  }
  inseriscilista(riga, colonna, lista) {
    let x = riga
    let y = colonna
    for (let index = 0; index < lista.length; index++) {
      this.inseriscielemento(x, y, lista[index])

      y++

      if (y === this.colonne) {
        x++
        y = colonna
      }


    }
  }
  centra() {
    this.w.style.marginLeft = "auto"
    this.w.style.marginRight = "auto"
  }
}






class tela extends elemento {
  constructor(larghezza = 100, altezza = 100) {
    super("canvas")
    let tela = this.w
    tela.id = "tela"
    tela.width = larghezza
    tela.height = altezza
    tela.style.border = "1px solid black"
    this.ctx = this.w.getContext("2d");
  }

  linea(x0, y0, x1, y1) {

    this.ctx.moveTo(x0, y0);
    this.ctx.lineTo(x1, y1);
    this.ctx.stroke();
  }

  cerchio(x, y, raggio) {

    this.ctx.beginPath();
    this.ctx.arc(x, y, raggio, 0, 2 * Math.PI);
    this.ctx.stroke();
  }
  immagine(img, x, y, larghezza, altezza) {
    this.ctx.drawImage(img, x, y, larghezza, altezza);
  }
  ruota(gradi) {
    let radianti = gradi * Math.PI / 180

    this.ctx.rotate(radianti)

  }

  rettangolopieno(x, y, larghezza, altezza, colore = 'yellow') {

    this.ctx.fillStyle = colore
    this.ctx.fillRect(x, y, larghezza, altezza, )
    this.ctx.rect

  }
  rettangolo(x, y, larghezza, altezza, colore = "black", spessore = 1) {

    this.ctx.strokeStyle = colore
    this.ctx.lineWidth = spessore
    this.ctx.strokeRect(x, y, larghezza, altezza)

  }
  tagliarettangolo(x, y, larghezza, altezza) {

    this.ctx.clearRect(x, y, larghezza, altezza)

  }
  animazione(img, x, y, larghezza, altezza) {

    var pos = 0;
    var id = setInterval(frame, 5);

    function frame() {
      if (pos == 350) {
        clearInterval(id);
      } else {
        pos++;
        this.ctx.drawImage(img, x + pos, y, larghezza, altezza);
      }
    }
  }

  scrivi_tessera(stringa, l_tessera, a_tessera, carattere = "Arial") {
    let screen = document.createElement("canvas")
    screen.width = l_tessera
    screen.height = a_tessera
    let ctx = screen.getContext("2d")
    let dim_carattere = 30
    ctx.font = dim_carattere.toString() + "px " + carattere
    let misure = ctx.measureText(stringa)
    let l_stringa = misure.width
    let a_stringa = misure.actualBoundingBoxAscent + misure.actualBoundingBoxDescent
    let x = (l_tessera - l_stringa) / 2
    let y = (a_tessera - a_stringa) / 2 + a_stringa
    ctx.strokeText(stringa, x, y)
    return screen
  }

  disegna_tessera(img, l_tessera, a_tessera, carattere = "Arial") {
    let screen = document.createElement("canvas")
    screen.width = l_tessera
    screen.height = a_tessera
    let ctx = screen.getContext("2d")
    ctx.drawImage(img, 0, 0, l_tessera, a_tessera)
    return screen
  }
}






class tartaruga {
  constructor(canvas) {
    this.canvas = canvas
    let ctx = canvas.getContext("2d");
    this.sfondo = ctx
    this.base = 10
    this.altezza = 15
    this.posx = 0
    this.posy = 0
    this.rotazione = 0
    this.comandi = []
    this.traslazionex = 0
    this.traslazioney = 0


    let x = canvas.width / 2
    let y = canvas.height / 2

    // disegna centro
    ctx.translate(x, y)
    ctx.beginPath();
    ctx.arc(0, 0, 1, 0, 2 * Math.PI)
    ctx.stroke();

    // disegna tartaruga
    ctx.beginPath()
    ctx.moveTo(0, 0);
    ctx.lineTo(-this.base / 2, 0);
    ctx.lineTo(0, -this.altezza);
    ctx.lineTo(this.base / 2, 0)
    ctx.lineTo(0, 0)
    ctx.stroke()

  }
  linea(x0, y0, x1, y1) {
    this.sfondo.moveTo(x0, y0);
    this.sfondo.lineTo(x1, y1);
    this.sfondo.stroke();
  }

  triangolo(base, altezza) {
    this.sfondo.beginPath()
    this.sfondo.moveTo(0, 0);
    this.sfondo.lineTo(-this.base / 2, 0);
    this.sfondo.lineTo(0, -this.altezza);
    this.sfondo.lineTo(this.base / 2, 0)
    this.sfondo.lineTo(0, 0)
    this.sfondo.stroke();

  }

  ruota(gradi) {
    let radianti = gradi * Math.PI / 180
    this.sfondo.rotate(radianti)
    this.rotazione += radianti
    let azione = ["r", gradi]
    this.comandi.push(azione)
  }
  avanti(dist, t = 0) {
    let x0 = this.posx
    let y0 = this.posy
    this.linea(x0, y0, x0, y0 - dist)
    this.sfondo.translate(x0, y0 - dist)
    this.traslazioney += y0 - dist
    if (t === 0) {
      this.triangolo(10, 15)
    }

    let azione = ["a", dist]
    this.comandi.push(azione)
  }


  indietro(dist, t = 0) {
    let x0 = this.posx
    let y0 = this.posy
    this.linea(x0, y0, x0, y0 + dist)
    this.sfondo.translate(x0, y0 + dist)
    this.traslazioney += y0 + dist
    if (t === 0) {
      this.triangolo(10, 15)
    }

    let azione = ["i", dist]
    this.comandi.push(azione)
  }

  azioni(array) {
    for (let index = 0; index < array.length; index++) {
      let azione = array[index][0]
      let parametro = array[index][1]
      if (azione === "a") {
        this.avanti(parametro, 1)
      }
      if (azione === "i") {
        this.indietro(parametro, 1)
      }
      if (azione === "r") {
        this.ruota(parametro, 1)
      }
    }
    this.triangolo(this.base, this.altezza)


  }

  cancella() {
    this.sfondo.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.sfondo.clearRect(0, 0, -this.canvas.width, this.canvas.height);
    this.sfondo.clearRect(0, 0, this.canvas.width, -this.canvas.height);
    this.sfondo.clearRect(0, 0, -this.canvas.width, -this.canvas.height);


  }

  home() {

    this.sfondo.rotate(-this.rotazione)
    this.sfondo.translate(0, -this.traslazioney)
    this.triangolo()
  }
}