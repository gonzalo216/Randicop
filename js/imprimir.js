import { esperar } from "./funciones.js";
import evento, { apurar, final } from "./situaciones.js";

const d = document,
  $divPadre = d.getElementById("imprimir"),
  $transcurso = [];

let primero = true;
export function crearDiv() {
  if (primero) primero = false;
  else {
    $transcurso.at(-1).className = "cont anterior";
  }
  $transcurso.push(d.createElement("div"));
  $transcurso.at(-1).className = "cont actual";
  $divPadre.appendChild($transcurso.at(-1));
}
const agregarC = (corazones, img, midImg = null) => {
  const text = [];
  for (let i = 0; i < corazones - 1; i += 2)
    text.push(`<img src="./../assets/${img}.png">​`);
  if (corazones % 2 === 1) text.push(`<img src="./../assets/${midImg}.png">​`);
  return text.join("");
};
export function titulo(text, clas = null) {
  const $p = d.createElement("article");
  if (clas) $p.className = clas;
  $p.innerHTML = text;
  $transcurso.at(-1).appendChild($p);
}
export function vidaDefault(vida, bol = false) {
  vidaTotal();
  imprimir(agregarC(vida, "cRojo", "midRojo"), "vida jugador", "div", bol);
}
export function vidaTotal() {
  imprimir(agregarC(20, "cBlanco"), "vida total", "div");
}
export function vidaExtra(extra) {
  imprimir(agregarC(extra, "cAmari"), "vida extra", "div");
}
export function danoInsta(dano, bol = true) {
  imprimir(agregarC(dano, "cVerde", "midVerde"), "vida anterior", "div", bol);
}
export function curar(cura, bol = true) {
  imprimir(
    agregarC(cura, "cRojoOpaco", "midRojoOpaco"),
    "vida anterior",
    "div",
    bol
  );
}
export function texto(text, bol = false) {
  imprimir(text, "texto", "p", bol, true);
}
const $text = d.createElement(`div`);
export function imprimir(text, clas, el, fin = false) {
  const $contenedor = d.createElement("div"),
    $el = d.createElement(el);

  $contenedor.className = "linea";

  $el.className = clas;
  $el.innerHTML = text;
  $text.appendChild($el);

  if (fin) {
    $contenedor.innerHTML = $text.innerHTML;
    $transcurso.at(-1).lastElementChild.appendChild($contenedor);
    $text.innerHTML = "";
  }
}
export async function hayEvent() {
  if ($transcurso.at(-1).lastElementChild.lastElementChild.tagName !== "DIV") {
    imprimir("<h1>...</h1>", "vacio", "p", true, true);
  }
}

const btnSig = d.getElementById("sig"),
  btnAnt = d.getElementById("ant"),
  hayValor = (valor) =>
    $transcurso.findIndex((el) => el.className === valor) !== -1 ? true : false,
  contenido = (valor) =>
    $transcurso.at($transcurso.findIndex((el) => el.className === valor)),
  desHabi = () => {
    hayValor("cont anterior")
      ? (btnAnt.disabled = false)
      : (btnAnt.disabled = true);
  };

let escrito = false;
export function completo(bol = escrito, fin = false) {
  escrito = bol;
  hayValor("cont sig")
    ? (btnSig.textContent = "SIGUIENTE")
    : escrito
    ? fin
      ? (btnSig.textContent = "FINALIZAR")
      : (btnSig.textContent = "SIGUIENTE")
    : (btnSig.textContent = "Completar");
}
export function siguiente() {
  if (hayValor("cont sig")) {
    contenido("cont actual").className = "cont anterior";
    contenido("cont sig").className = "cont actual";
    completo();
    if (contenido("cont sig").id === "fin") btnSig.textContent = "FINALIZAR";
    if (contenido("cont actual").id === "fin") btnSig.disabled = true;
  } else {
    if (btnSig.textContent === "FINALIZAR") {
      final();
      $transcurso.at(-1).id = "fin";
      btnSig.disabled = true;
      return;
    }
    if (btnSig.textContent === "SIGUIENTE") evento();
    else apurar();
    completo(false);
    btnSig.textContent = "Completar";
  }
  desHabi();
}
export function anterior() {
  if (hayValor("cont anterior")) {
    contenido("cont actual").className = "cont sig";
    contenido("cont anterior").className = "cont actual";
    contenido("cont sig").id === "fin"
      ? (btnSig.textContent = "FINALIZAR")
      : (btnSig.textContent = "SIGUIENTE");
  }
  desHabi();
  btnSig.disabled = false;
}
