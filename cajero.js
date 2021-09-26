function entregarDinero() {
  var t = document.getElementById("dinero");
  var dinero = parseInt(t.value);

  for (var bi of caja) {
    if (dinero > 0) {
      div = Math.floor(dinero/bi.valor);
      if (div > bi.cantidad){
        papeles = bi.cantidad;
      }
      else {
        papeles = div;
      }
      entregado.push(new Billete(bi.valor, papeles));
      dinero = dinero - (bi.valor*papeles);
    }
  }

  for (var p = 0; p < entregado.length; p++){
    caja[p].cantidad = caja[p].cantidad - entregado[p].cantidad;
  }

  dineroDisponible(caja);

  if (dinero > 0) {
    resultado.innerHTML = "No tengo el dinero suficiente para entregarte";
  }
  else {
      for (var e of entregado) {
        if (e.cantidad > 0) {
          resultado.innerHTML = resultado.innerHTML + "<strong>" + e.valor + "</strong><br/> Cantidad:" + e.cantidad + "<br/>";
          e.mostrar();
          resultado.innerHTML = resultado.innerHTML + "<br />";
          // tambien se puede escribir:
          // resultado.innerHTML += e.cantidad + " billetes de $" + e.valor + "<br/>";
        }
      }
  }
  transacciones = transacciones + 1;
  trans.innerHTML = "<strong>Numero de transacciones hechas: </strong>" + transacciones;
}

function dineroDisponible(dinsaldo){
  dinerocaja = 0;
  for (var z = 0; z < dinsaldo.length; z++){
    dinerocaja = dinerocaja + parseInt(dinsaldo[z].valor)*dinsaldo[z].cantidad;
  }
  saldo.innerHTML = "<strong>Disponible en cajero = </strong>" + dinerocaja;
}

function limpiarDinero() {
  resultado.innerHTML = ' ';
  entregado = [];
}

var caja = [];
var entregado = [];
var imagenes = [];
var transacciones = 0;
var dinerocaja = 0;

imagenes["100000"] = "images/100000.png";
imagenes["50000"] = "images/50000.png";
imagenes["20000"] = "images/20000.png";
imagenes["10000"] = "images/10000.png";

caja.push(new Billete("100000", 50));
caja.push(new Billete("50000", 20));
caja.push(new Billete("20000", 40));
caja.push(new Billete("10000", 40));

var div = 0;
var papeles = 0;

var trans = document.getElementById("transacciones");
var saldo = document.getElementById("saldo");
var resultado = document.getElementById("resultado");
var b = document.getElementById("extraer");
var c = document.getElementById("limpiar");
b.addEventListener("click", entregarDinero);
c.addEventListener("click", limpiarDinero);

dineroDisponible(caja);
