export function gradi(radianti) {
  let gradi = radianti * 180 / Math.PI;
  return gradi;
}

export function radianti(gradi) {
  let radianti = gradi * Math.PI / 180;
  return radianti;
}

export function int_casuale(k) {
  return Math.floor(Math.random() * k);
}

function mischialista(lista) {
  for (let k = 0; k < lista.length; k++) {
   let posizioneCasuale = Math.floor(Math.random() * k);
   let tmp = lista[k];
    lista[k] = lista[posizioneCasuale];
    lista[posizioneCasuale] = tmp;
  }
  return lista;
}

function casuale(m, n) {
  let num_casuale = Math.round(Math.random() * (n - m) + m);
  return num_casuale;
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  var data = ev.dataTransfer.getData("text");
  ev.target.appendChild(document.getElementById(data));
}

function animazione(idelemento) {
  var elem = document.getElementById(idelemento);
  var pos = 0;
  var id = setInterval(frame, 5);

  function frame() {
    if (pos == 350) {
      clearInterval(id);
    } else {
      pos++;
      elem.style.top = pos + "px";
      elem.style.left = pos + "px";
    }
  }
}

function distanza(x0, y0, x1, y1) {
  return Math.sqrt((x1 - x0) * (x1 - x0) + (y1 - y0) * (y1 - y0));
}

function contiene(array, elemento) {
  return JSON.stringify(array).includes(JSON.stringify(elemento));
}

function minimizza(cb, array) {
  let array_ris = [];
  for (let index = 0; index < array.length; index++) {
    array_ris.push(cb(array[index]));
  }
  let min = Math.min(...array_ris);
  let indice = array_ris.indexOf(min);
  return [array[indice], indice];
}

function esegui_su_array(cb, array, millsec_ritardo) {
  for (var i = 0; i < array.length; i++) {
    (function (ind) {
      setTimeout(function () {
        cb(array[ind]);
      }, millsec_ritardo * ind);
    })(i);
  }
}

function esadecimale(r, g, b) {
  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function leggi_file(nome_file) {
  fetch(nome_file).then(response => response.text()).then(text => alert(text));
}

function ripetuti(array) {
  let n_a = [];
  let ris = [];
  for (let elemento of array) {
    n_a.push([elemento, 1]);
  }
  for (let index = 0; index < array.length - 1; index++) {
    if (array[index] === array[index + 1]) {
      array.splice(index + 1, 1);
      n_a.splice(index + 1, 1);
      n_a[index][1] = n_a[index][1] + 1;
      index--;
    }
  }
  for (let elemento of n_a) {
    if (elemento[1] === 1) {
      ris.push(elemento[0]);
    } else {
      ris.push(elemento[0] + " " + elemento[1]);
    }
  }
  return ris;
}

function popola_casella(casella_id, array, array_value = null) {
  // elimina le opzioni presenti
  let opzioni_presenti = document.getElementById(casella_id).length;
  if (opzioni_presenti > 0) {
    for (let index = 0; index < opzioni_presenti; index++) {
      let opzioni_restanti = document.getElementById(casella_id).length;
      document.getElementById(casella_id).remove(opzioni_restanti - 1);
    }
  }
  // aggiunge le nuove opzioni
  for (let element of array) {
    let op = document.createElement("option");
    if (array_value === null) {
      op.value = element;
    } else {
      op.value = array_value[array.indexOf(element)];
    }
    op.innerHTML = element;
    document.getElementById(casella_id).add(op);
  }
}

function equazione2(a, b, c) {
  let delta = (Math.pow(b, 2) - 4 * a * c) / 2 * a
  //console.log(Math.pow(b,2))
  if (delta < 0) {
    return null
  }
  let x1 = (-b - delta) / 2 * a
  let x2 = (-b + delta) / 2 * a
  return [x1, x2]
}
  
//module.exports.equazione2 =  equazione2