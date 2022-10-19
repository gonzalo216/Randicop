import { $transcurso, copySize } from "./print_blocks.js";

const d = document;
export function titulo(text, clas = null) {
  const $p = d.createElement("section");
  if (clas) $p.className = clas;
  $p.innerHTML = text;
  $transcurso.at(-1).appendChild($p);
}
export async function decidir(si, no) {
  const eleccion = new Promise((resolve, reject) => {
    d.addEventListener("click", (e) => {
      if (e.target.matches("#btn-si")) {
        console.log("toco");
        resolve(true);
      }
      if (e.target.matches("#btn-no")) {
        console.log("toco2");
        resolve(false);
      }
    });
  });
  const $template = d.getElementById("tem-decidir").content,
    $fragment = d.createDocumentFragment();
  $template.getElementById("btn-si").innerHTML = si;
  $template.getElementById("btn-no").innerHTML = no;
  let $clone = d.importNode($template, true);
  $fragment.appendChild($clone);
  $transcurso.at(-1).lastElementChild.appendChild($fragment);
  copySize();
  let result = await eleccion;
  $transcurso.at(-1).lastElementChild.lastElementChild.remove();
  $transcurso.at(-1).lastElementChild.lastElementChild.remove();
  //if (result)
  $transcurso
    .at(-1)
    .lastElementChild.lastElementChild.lastElementChild.remove();

  return result;
}
function imprimir(text, clas, fin = false, addClass = null) {
  const $template = d.getElementById("tem-linea").content,
    $fragment = d.createDocumentFragment();
  $template.querySelector(clas).innerHTML = text;
  if (addClass) $template.querySelector(clas).className += addClass;
  if (fin) {
    let $clone = d.importNode($template, true);
    $fragment.appendChild($clone);
    $transcurso.at(-1).lastElementChild.appendChild($fragment);
    copySize();
    $template.querySelectorAll(".icon").forEach((el) => (el.innerHTML = ""));
    $template.querySelector(".texto").className = "texto";
  }
}
const printIcons = (corazones, img, midImg = null) => {
  const text = [];
  for (let i = 0; i < corazones - 1; i += 2)
    text.push(`<img src="./../assets/bar/${img}.png">​`);
  if (corazones % 2 === 1)
    text.push(`<img src="./../assets/bar/${midImg}.png">​`);
  return text.join("");
};
function armar(armadura) {
  let escudo = Object.values(armadura).reduce(
    (total, actual) => total + actual,
    0
  );
  imprimir(printIcons(escudo, "armorOne", "armorHalf"), ".armadura");
}
function armarTotal() {
  imprimir(printIcons(20, "armorNo"), ".arm-total");
}
function vidaTotal() {
  imprimir(printIcons(20, "heartNo"), ".vida.total");
}
export function vidaDefault(jug, bol = false) {
  vidaTotal();
  armarTotal();
  armar(jug.armadura);
  imprimir(printIcons(jug.vida, "heartOne", "heartHalf"), ".vida.jugador", bol);
}
export function vidaExtra(extra) {
  imprimir(printIcons(extra, "goldOne", "goldHalf"), ".vida.extra");
}
export function danoInsta(dano, bol = true) {
  imprimir(printIcons(dano, "damagOne", "damagHalf"), ".vida.anterior", bol);
}
export function curar(cura, bol = true) {
  imprimir(printIcons(cura, "addOne", "addHalf"), ".vida.anterior", bol);
}
export function texto(text, bol = false) {
  imprimir(text, ".texto", bol);
}
export async function haySit() {
  if ($transcurso.at(-1).lastElementChild.lastElementChild.tagName !== "DIV") {
    imprimir("&middot;&middot;&middot;", ".texto", true, " vacio");
  }
}
