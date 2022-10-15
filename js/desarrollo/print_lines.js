import { $transcurso, copySize } from "./print_blocks.js";

const d = document;
export function titulo(text, clas = null) {
  const $p = d.createElement("section");
  if (clas) $p.className = clas;
  $p.innerHTML = text;
  $transcurso.at(-1).appendChild($p);
}
function imprimir(text, clas, fin = false, addClass = null) {
  const $template = d.querySelector("template").content,
    $fragment = d.createDocumentFragment();

  $template.querySelector(clas).innerHTML = text;
  if (addClass) $template.querySelector(clas).className += addClass;
  if (fin) {
    let $clone = d.importNode($template, true);
    $fragment.appendChild($clone);
    $transcurso.at(-1).lastElementChild.appendChild($fragment);
    copySize();
    $template.querySelectorAll(".vida").forEach((el) => (el.innerHTML = ""));
    $template.querySelector(".texto").className = "texto";
  }
}
const agregarC = (corazones, img, midImg = null) => {
  const text = [];
  for (let i = 0; i < corazones - 1; i += 2)
    text.push(`<img src="./../assets/${img}.png">​`);
  if (corazones % 2 === 1) text.push(`<img src="./../assets/${midImg}.png">​`);
  return text.join("");
};
export function vidaDefault(vida, bol = false) {
  vidaTotal();
  imprimir(agregarC(vida, "cRojo", "midRojo"), ".vida.jugador", bol);
}
export function vidaTotal() {
  imprimir(agregarC(20, "cBlanco"), ".vida.total");
}
export function vidaExtra(extra) {
  imprimir(agregarC(extra, "cAmari"), ".vida.extra");
}
export function danoInsta(dano, bol = true) {
  imprimir(agregarC(dano, "cVerde", "midVerde"), ".vida.anterior", bol);
}
export function curar(cura, bol = true) {
  imprimir(agregarC(cura, "cRojoOpaco", "midRojoOpaco"), ".vida.anterior", bol);
}
export function texto(text, bol = false) {
  imprimir(text, ".texto", bol);
}
export async function haySit() {
  if ($transcurso.at(-1).lastElementChild.lastElementChild.tagName !== "DIV") {
    imprimir("&middot;&middot;&middot;", ".texto", true, " vacio");
  }
}
