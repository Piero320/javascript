export class traiettoria {
  constructor(valori) {
    let [v0, v, a, t, s] = valori;
     
    // v = v0 + a*t
    // v0 = (v - a*t )/t
    // t = v/(v0+a)
    // a = (v - v0) / t
    if (v0!== "?" && t!== "?" && a!== "?") {v = v0 + a*t ; s = v0*t + a*t^2 /2 ;  this.valori = [v0, v, a, t, s]  ; return}
    if (v!== "?" && a!== "?" && t!== "?") { v0 = (v - a*t ) ; s = v0*t + a*t^2 /2 ;  this.valori = [v0, v, a, t, s]  ; return}
    if (v!== "?" && v0!== "?" && a!== "?") {   s = (v*v - v0*v0)/ (2 * a) ;   t = (v-v0)/a;  this.valori = [v0, v, a, t, s]  ; return}
    if (v!== "?" && v0!== "?" && t!== "?") {  a = (v - v0) / t; s = v0*t + a*t*t/2 ;   this.valori = [v0, v, a, t, s] ; return}
    // s = v0*t + a*t^2 /2
    // v0 = (s - a*t^2 /2)/t
    // a/2*t^2 + v0t- s = 0
    // a = (s-v0*t) * 2 / t^2
    if (s!== "?" && a!== "?" && t!== "?") {  v0 = (s - a*t^2 /2)/t ; v = v0 + a*t ;   this.valori = [v0, v, a, t, s]  ; return}
    if (a!== "?" && v0!== "?" && s!== "?") {   
     let a1 = a/2
     let b1 = v0
     let c1 = -s
     let radici = this.equazione2(a1,b1,c1)
     t = Math.max(...radici)
     v = v0 + a*t
    this.valori = [v0, v, a, t, s]  ; return}
    if (s!== "?" && v0!== "?" && t!== "?") { a = (s-v0*t) * 2 /(t*t) ; v = v0 + a*t ;   this.valori = [v0, v, a, t, s]  ; return}
   // s = (v^2 - v0^2)/ (2 * a)
   // v = radice ( s*(a*2 ) + v0^2)
   // v0 =  - radice ( s*(a*2 ) - v^2)
   // a =   (v^2 - v0^2)/s/2
   if (s!== "?" && a!== "?" && t!== "?") {  v0 = (s - a*t^2 /2)/t ; v = v0 + a*t ;   this.valori = [v0, v, a, t, s]  ; return}
   if (s!== "?" && a!== "?" && v!== "?") {  v0 = Math.pow( s*(a*2 ) + v0*v0,0.5) ; v = v0 + a*t ;   this.valori = [v0, v, a, t, s]  ; return}
   if (v!== "?" && v0!== "?" && s!== "?") {  a =   (v*v - v0*v0)/s/2 ; t = (v-v0)/a  ;   this.valori = [v0, v, a, t, s]  ; return}

}
export equazione2(a, b, c) {
  let delta = (Math.pow(b, 2) - 4 * a * c) / 2 * a
  if (delta < 0) {
    return null
  }
  let x1 = (-b - delta) / 2 * a
  let x2 = (-b + delta) / 2 * a
  return [x1, x2]
}
}



export class file {
  constructor(file = "") {
    this.file = file;
  }
  ottieni_file(nome_file) {
    fetch(nome_file).then(response => response.text());
  }

  costruisci_file(tipo, dati) {
    if (tipo === "testo") {
      tipo = "text/plain";
    }

    this.file = new File([dati], {
      type: tipo,
    });
    return this.file;
  }

  leggi_testo(cb) {
    var testo;
    var reader = new FileReader();
    reader.onload = function (event) {
      var testo = event.target.result;
    };
    //restituisce stringa
    reader.readAsText(this.file);
  }

  leggi_img(cb) {
    var reader = new FileReader();
    var dataURL;
    reader.onload = function (event) {
      dataURL = event.target.result;
      alert(dataURL);
    };
    reader.readAsDataURL(this.file);
  }
  leggi_bin(uint, cb) {
    var reader = new FileReader();
    var arraybuffer;
    var v;
    reader.onload = function (event) {
      arraybuffer = event.target.result;

      switch (uint) {
        case 8:
          v = new Uint8Array(arraybuffer);
          break;
        case 16:
          v = new Uint16Array(arraybuffer);
          break;
        case 32:
          v = new Uint32Array(arraybuffer);
          break;
        default:
          break;
      }
      cb(v);
    };
    reader.readAsArrayBuffer(this.file);
  }

  ottieni_header() {
    var fileReader = new FileReader();
    fileReader.onloadend = function (e) {
      var arr = new Uint8Array(e.target.result).subarray(0, 4);
      var header = "";
      for (var i = 0; i < arr.length; i++) {
        header += pad(arr[i].toString(16), 2);
      }
      alert(header);
    };
    fileReader.readAsArrayBuffer(this.file);

    function pad(num, size) {
      var s = "0000" + num;
      return s.substr(s.length - size);
    }
  }

  fai_url() {
    let url = window.URL.createObjectURL(this.file);
    return url;
  }
  salva(nome_file = this.file) {
    var link = document.createElement("a");
    link.setAttribute("download", nome_file);
    link.href = this.fai_url();
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
}

export class matrice {
  constructor(righe, colonne, valore = 0) {
    this.righe = righe;
    this.colonne = colonne;
    this.tabella = new Array(righe);

    for (let index = 0; index < righe; index++) {
      this.tabella[index] = new Array(colonne).fill(valore);
    }
  }

  adiacente(x, y, x1, y1) {
    if (
      (x === x1 && Math.abs(y - y1) === 1) ||
      (y === y1 && Math.abs(x - x1) === 1)
    ) {
      return true;
    } else {
      return false;
    }
  }

  trova_elemento(elemento) {
    let risultato = [];
    this.tabella.forEach((row, y) => {
      row.forEach((v, x) => {
        if (this.tabella[y][x] === elemento) {
          risultato.push([y, x]);
        }
      });
    });

    return risultato;
  }

  perognuno(cb) {
    this.tabella.forEach((row, y) => {
      row.forEach((v, x) => {
        cb(v, x, y);
      });
    });
  }

  // inserisce la matrice m2 alla riga iesima e colonna jesima della matrice m1
  immergi(m1, m2, i, j) {
    m2.forEach((row, y) => {
      row.forEach((v, x) => {
        m1[y + i][x + j] = v;
      });
    });

    return m1;
  }
  trasponi(matrix) {
    for (let row = 0; row < matrix.length; row++) {
      for (let column = 0; column < row; column++) {
        let temp = matrix[row][column];
        matrix[row][column] = matrix[column][row];
        matrix[column][row] = temp;
      }
    }
    return matrix;
  }

  // ruota la matrice di 90 gradi
  ruota(matrix) {
    return this.trasponi(matrix.reverse());
  }
  fai_labirinto(righe, colonne) {
    let m = new matrice(righe, colonne).tabella;
    let colonne_occupate = [];
    let righe_occupate = [];
    let i = 0;
    let muro = new Array(colonne).fill(1);
    let num_casuale = casuale(2, righe - 3);
    muro[num_casuale] = 0;
    m[0] = muro;

    muro = new Array(colonne).fill(1);
    num_casuale = casuale(2, righe - 3);
    muro[num_casuale] = 0;
    m[righe - 1] = muro;

    muro = new Array(colonne).fill(1);
    num_casuale = casuale(2, righe - 3);
    muro[num_casuale] = 0;
    m.forEach((v, x) => {
      m[x][0] = muro[x];
    });

    muro = new Array(colonne).fill(1);
    num_casuale = casuale(2, righe - 2);
    muro[num_casuale] = 0;
    m.forEach((v, x) => {
      m[x][colonne - 1] = muro[x];
    });

    return m;
  }

  popola(array) {
    let riga = 0;
    let colonna = 0;
    for (let i = 0; i < array.length; i++) {
      this.tabella[riga][colonna] = array[i];
      colonna++;
      if (colonna === this.colonne) {
        colonna = 0;
        riga++;
      }
    }
    return this.tabella;
  }
}

export class tetra {
  constructor(tipo = "casuale", ctx, lq) {
    this.matrice = new matrice(4, 4).tabella;
    this.ctx = ctx;
    this.lq = lq;

    this.tipi = {
      t: [
        [0, 1, 0, 0],
        [1, 1, 1, 0], "violet"
      ],
      i: [
        [1, 1, 1, 1],
        [0, 0, 0, 0], "red"
      ],
      l: [
        [1, 1, 1, 0],
        [1, 0, 0, 0], "orange"
      ],
      z: [
        [1, 1, 0, 0],
        [0, 1, 1, 0], "red"
      ],
      o: [
        [1, 1, 0, 0],
        [1, 1, 0, 0], "yellow"
      ],
      s: [
        [0, 1, 1, 0],
        [1, 1, 0, 0], "green"
      ],
      j: [
        [1, 1, 1, 0],
        [0, 0, 1, 0], "blue"
      ],
    };

    if (tipo === "casuale") {
      let arraytipi = ["t", "i", "l", "z", "o", "s", "j"];
      tipo = arraytipi[Math.floor(Math.random() * arraytipi.length)];
    }
    this.posx = 0;
    this.posy = 0;
    this.matrice[0] = this.tipi[tipo][0];
    this.matrice[1] = this.tipi[tipo][1];
    this.colore = this.tipi[tipo][2];
  }

  disegna() {
    ctx.fillStyle = this.colore;
    this.matrice.forEach((row, x) => {
      row.forEach((v, y) => {
        if (v != 0) {
          this.ctx.fillRect(y + this.posx, x + this.posy, this.lq, this.lq);
        }
      });
    });
    segnaposizione(this.matrice, board, this.posx + 1, this.posy + 1);
  }

  ruota() {
    this.matrice = new matrice().ruota(this.matrice);
  }
}

 