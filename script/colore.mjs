class colore {

  nomi() {
    var color, rgb, hsl;
    for (var i = 0; i < nomi.length; i++) {
      color = "#" + nomi[i][0];
      rgb = this.rgb(color);
      hsl = this.hsl(color);
      nomi[i].push("rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")", hsl[0], hsl[1], hsl[2]);
    }
    return nomi
  }

  // restituisce il colore piu' vicino ad un dato colore
  trova_vicino(colore, array_color = null) {

    var colori


    if (array_color === null) {
      colori = ["rosso", "verde", "blu", "nero", "bianco"]
      array_color = [
        [255, 0, 0],
        [0, 255, 0],
        [0, 0, 255],
        [0, 0, 0],
        [255, 255, 255]
      ]
    }

    var distanza
    var lab
    var array_distanze = []
    var lab_colore = this.rgb2lab(colore)
    for (const color of array_color) {
      lab = this.rgb2lab(color);
      distanza = this.deltaE(lab, lab_colore)

      array_distanze.push(distanza)

    }
    let min_dist = Math.min(...array_distanze)
    let index = array_distanze.indexOf(min_dist)
    return [colori[index], min_dist, array_color[index]]
  }
  // trova la distanza tra due colori 
  distanza(rgb1, rgb2) {
    [r1, g1, b1] = rgb1
      [r2, g2, b2] = rgb2
    let dr = (r1 - r2) * (r1 - r2)
    let dg = (g1 - g2) * (g1 - g2)
    let db = (b1 - b2) * (b1 - b2)
    let distanza = Math.pow(dr + dg + db, 0.5)
    return distanza
  }
  RGBToHexs(rgb) {
    // Choose correct separator
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    // Turn "rgb(r,g,b)" into [r,g,b]
    rgb = rgb.substr(4).split(")")[0].split(sep);

    let r = (+rgb[0]).toString(16),
      g = (+rgb[1]).toString(16),
      b = (+rgb[2]).toString(16);

    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;

    return "#" + r + g + b;
  }


  RGBToHex(r, g, b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;

    return "#" + r + g + b;
  }

  RGBAToHexA(r, g, b, a) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);
    a = Math.round(a * 255).toString(16);

    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
    if (a.length == 1)
      a = "0" + a;

    return "#" + r + g + b + a;
  }

  RGBAToHexAs(rgba) {
    let sep = rgba.indexOf(",") > -1 ? "," : " ";
    rgba = rgba.substr(5).split(")")[0].split(sep);

    // Strip the slash if using space-separated syntax
    if (rgba.indexOf("/") > -1)
      rgba.splice(3, 1);

    for (let R in rgba) {
      let r = rgba[R];
      if (r.indexOf("%") > -1) {
        let p = r.substr(0, r.length - 1) / 100;

        if (R < 3) {
          rgba[R] = Math.round(p * 255);
        } else {
          rgba[R] = p;
        }
      }
    }
  }
  RGBAToHexA(rgba) {

    let r = (+rgba[0]).toString(16),
      g = (+rgba[1]).toString(16),
      b = (+rgba[2]).toString(16),
      a = Math.round(+rgba[3] * 255).toString(16);

    if (r.length == 1)
      r = "0" + r;
    if (g.length == 1)
      g = "0" + g;
    if (b.length == 1)
      b = "0" + b;
    if (a.length == 1)
      a = "0" + a;

    return "#" + r + g + b + a;
  }

  hexToRGB(h) {
    let r = 0,
      g = 0,
      b = 0;

    // 3 digits
    if (h.length == 4) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];

      // 6 digits
    } else if (h.length == 7) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }

    return "rgb(" + +r + "," + +g + "," + +b + ")";
  }

  RGBToHSL(r, g, b) {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta == 0)
      h = 0;
    // Red is max
    else if (cmax == r)
      h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
      h = (b - r) / delta + 2;
    // Blue is max
    else
      h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0)
      h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return "hsl(" + h + "," + s + "%," + l + "%)";
  }

  lab2rgb(lab) {
    var y = (lab[0] + 16) / 116,
      x = lab[1] / 500 + y,
      z = y - lab[2] / 200,
      r, g, b;

    x = 0.95047 * ((x * x * x > 0.008856) ? x * x * x : (x - 16 / 116) / 7.787);
    y = 1.00000 * ((y * y * y > 0.008856) ? y * y * y : (y - 16 / 116) / 7.787);
    z = 1.08883 * ((z * z * z > 0.008856) ? z * z * z : (z - 16 / 116) / 7.787);

    r = x * 3.2406 + y * -1.5372 + z * -0.4986;
    g = x * -0.9689 + y * 1.8758 + z * 0.0415;
    b = x * 0.0557 + y * -0.2040 + z * 1.0570;

    r = (r > 0.0031308) ? (1.055 * Math.pow(r, 1 / 2.4) - 0.055) : 12.92 * r;
    g = (g > 0.0031308) ? (1.055 * Math.pow(g, 1 / 2.4) - 0.055) : 12.92 * g;
    b = (b > 0.0031308) ? (1.055 * Math.pow(b, 1 / 2.4) - 0.055) : 12.92 * b;

    return [Math.max(0, Math.min(1, r)) * 255,
      Math.max(0, Math.min(1, g)) * 255,
      Math.max(0, Math.min(1, b)) * 255
    ]
  }

  rgb2lab(rgb) {
    var r = rgb[0] / 255,
      g = rgb[1] / 255,
      b = rgb[2] / 255,
      x, y, z;

    r = (r > 0.04045) ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = (g > 0.04045) ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = (b > 0.04045) ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

    x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
    z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

    x = (x > 0.008856) ? Math.pow(x, 1 / 3) : (7.787 * x) + 16 / 116;
    y = (y > 0.008856) ? Math.pow(y, 1 / 3) : (7.787 * y) + 16 / 116;
    z = (z > 0.008856) ? Math.pow(z, 1 / 3) : (7.787 * z) + 16 / 116;

    return [(116 * y) - 16, 500 * (x - y), 200 * (y - z)]
  }
  deltaE(labA, labB) {
    var deltaL = labA[0] - labB[0];
    var deltaA = labA[1] - labB[1];
    var deltaB = labA[2] - labB[2];
    var c1 = Math.sqrt(labA[1] * labA[1] + labA[2] * labA[2]);
    var c2 = Math.sqrt(labB[1] * labB[1] + labB[2] * labB[2]);
    var deltaC = c1 - c2;
    var deltaH = deltaA * deltaA + deltaB * deltaB - deltaC * deltaC;
    deltaH = deltaH < 0 ? 0 : Math.sqrt(deltaH);
    var sc = 1.0 + 0.045 * c1;
    var sh = 1.0 + 0.015 * c1;
    var deltaLKlsl = deltaL / (1.0);
    var deltaCkcsc = deltaC / (sc);
    var deltaHkhsh = deltaH / (sh);
    var i = deltaLKlsl * deltaLKlsl + deltaCkcsc * deltaCkcsc + deltaHkhsh * deltaHkhsh;
    return i < 0 ? 0 : Math.sqrt(i);
  }

  rgb_to_xyz([sR, sG, sB]) {
    //sR, sG and sB (Standard RGB) input range = 0 ÷ 255
    //X, Y and Z output refer to a D65/2° standard illuminant.
    let var_R, var_G, var_B
    var_R = (sR / 255)
    var_G = (sG / 255)
    var_B = (sB / 255)

    if (var_R > 0.04045) var_R = ((var_R + 0.055) / 1.055) ^ 2.4
    else var_R = var_R / 12.92
    if (var_G > 0.04045) var_G = ((var_G + 0.055) / 1.055) ^ 2.4
    else var_G = var_G / 12.92
    if (var_B > 0.04045) var_B = ((var_B + 0.055) / 1.055) ^ 2.4
    else var_B = var_B / 12.92

    var_R = var_R * 100
    var_G = var_G * 100
    var_B = var_B * 100

    let X = var_R * 0.4124 + var_G * 0.3576 + var_B * 0.1805
    let Y = var_R * 0.2126 + var_G * 0.7152 + var_B * 0.0722
    let Z = var_R * 0.0193 + var_G * 0.1192 + var_B * 0.9505

    return [X, Y, Z]
  }

  elenco_nomi() {
    let nomi = this.elenco()
    let ris = []
    nomi.forEach(v => ris.push(v[1]))
    return ris
  }



  elenco() {


    var nomi = [
      ["F0F8FF", "aliceblue"],
      ["FAEBD7", "antiquewhite"],
      ["00FFFF", "aqua"],
      ["7FFFD4", "aquamarine"],
      ["F0FFFF", "azure"],
      ["F5F5DC", "beige"],
      ["FFE4C4", "bisque"],
      ["000000", "black"],
      ["FFEBCD", "blanchedalmond"],
      ["0000FF", "blue"],
      ["8A2BE2", "blueviolet"],
      ["A52A2A", "brown"],
      ["DEB887", "burlywood"],
      ["5F9EA0", "cadetblue"],
      ["7FFF00", "chartreuse"],
      ["D2691E", "chocolate"],
      ["FF7F50", "coral"],
      ["6495ED", "cornflowerblue"],
      ["FFF8DC", "cornsilk"],
      ["DC143C", "crimson"],
      ["00FFFF", "cyan "],
      ["00008B", "darkblue"],
      ["008B8B", "darkcyan"],
      ["B8860B", "darkgoldenrod"],
      ["A9A9A9", "darkgray"],
      ["006400", "darkgreen"],
      ["BDB76B", "darkkhaki"],
      ["8B008B", "darkmagenta"],
      ["556B2F", "darkolivegreen"],
      ["FF8C00", "darkorange"],
      ["9932CC", "darkorchid"],
      ["8B0000", "darkred"],
      ["E9967A", "darksalmon"],
      ["8FBC8F", "darkseagreen"],
      ["483D8B", "darkslateblue"],
      ["2F4F4F", "darkslategra"],
      ["00CED1", "darkturquoise"],
      ["9400D3", "darkviolet"],
      ["FF1493", "deeppink"],
      ["00BFFF", "deepskyblue"],
      ["696969", "dimgray"],
      ["1E90FF", "dodgerblue"],
      ["B22222", "firebrick"],
      ["FFFAF0", "floralwhite"],
      ["228B22", "forestgreen"],
      ["FF00FF", "fuchsia"],
      ["DCDCDC", "gainsboro"],
      ["F8F8FF", "ghostwhite"],
      ["FFD700", "gold"],
      ["DAA520", "goldenrod"],
      ["808080", "gray"],
      ["008000", "green"],
      ["ADFF2F", "greenyellow"],
      ["F0FFF0", "honeydew"],
      ["FF69B4", "hotpink"],
      ["CD5C5C", "indianred"],
      ["4B0082", "indigo"],
      ["FFFFF0", "ivory"],
      ["F0E68C", "khaki"],
      ["E6E6FA", "lavender"],
      ["FFF0F5", "lavenderblush"],
      ["7CFC00", "lawngreen"],
      ["FFFACD", "lemonchiffon"],
      ["ADD8E6", "lightblue"],
      ["F08080", "lightcoral"],
      ["E0FFFF", "lightcyan"],
      ["FAFAD2", "lightgoldenrodyello"],
      ["90EE90", "lightgreen "],
      ["D3D3D3", "lightgrey "],
      ["FFB6C1", "lightpink "],
      ["FFA07A", "lightsalmon "],
      ["20B2AA", "lightseagreen "],
      ["87CEFA", "lightskyblue "],
      ["778899", "lightslategray "],
      ["B0C4DE", "lightsteelblue "],
      ["FFFFE0", "lightyellow "],
      ["00FF00", "lime "],
      ["32CD32", "limegreen"],
      ["FAF0E6", "linen"],
      ["FF00FF", "magenta"],
      ["800000", "maroon"],
      ["66CDAA", "mediumaquamarine"],
      ["0000CD", "mediumblue"],
      ["BA55D3", "mediumorchid"],
      ["9370DB", "mediumpurple"],
      ["3CB371", "mediumseagreen"],
      ["7B68EE", "mediumslateblue"],
      ["00FA9A", "mediumspringgreen"],
      ["48D1CC", "mediumturquoise"],
      ["C71585", "mediumvioletred"],
      ["191970", "midnightblue"],
      ["F5FFFA", "mintcream"],
      ["FFE4E1", "mistyrose"],
      ["FFE4B5", "moccasin"],
      ["FFDEAD", "navajowhite"],
      ["000080", "navy "],
      ["FDF5E6", "oldlace "],
      ["808000", "olive "],
      ["6B8E23", "olivedrab "],
      ["FFA500", "orange "],
      ["FF4500", "orangered"],
      ["DA70D6", "orchid"],
      ["EEE8AA", "palegoldenrod"],
      ["98FB98", "palegreen"],
      ["AFEEEE", "paleturquoise"],
      ["DB7093", "palevioletred"],
      ["FFEFD5", "papayawhip"],
      ["FFDAB9", "peachpuff"],
      ["CD853F", "peru"],
      ["FFC0CB", "pink"],
      ["DDA0DD", "plum"],
      ["B0E0E6", "powderblue"],
      ["800080", "purple"],
      ["FF0000", "red"],
      ["BC8F8F", "rosybrown"],
      ["4169E1", "royalblue"],
      ["8B4513", "saddlebrown"],
      ["FA8072", "salmon "],
      ["FAA460", "sandybrown"],
      ["2E8B57", "seagreen"],
      ["FFF5EE", "seashell"],
      ["A0522D", "sienna"],
      ["C0C0C0", "silver"],
      ["87CEEB", "skyblue"],
      ["6A5ACD", "slateblue"],
      ["708090", "slategray"],
      ["FFFAFA", "snow"],
      ["00FF7F", "springgree"],
      ["4682B4", "steelblue "],
      ["D2B48C", "tan"],
      ["008080", "teal"],
      ["D8BFD8", "thistle"],
      ["FF6347", "tomato"],
      ["40E0D0", "turquoise"],
      ["EE82EE", "violet"],
      ["F5DEB3", "wheat"],
      ["FFFFFF", "white"],
      ["F5F5F5", "whitesmoke"],
      ["FFFF00", "yellow"],
      ["9ACD32", "yellowgreen"],

    ]
    return nomi


  }


}

//let c = new colore()
//console.log(c.trova_vicino([25,8,29]) )